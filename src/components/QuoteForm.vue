<script setup>
import { ref, onMounted, computed } from "vue";
import { useCountries } from "../composables/useCountries";
import { useQuotes } from "../composables/useQuotes";

const emit = defineEmits(["quoted"]);

const {
  countries,
  loading: loadingCountries,
  error: countriesError,
  fetchCountries,
} = useCountries();
const {
  loading: submitting,
  error: submitError,
  validationErrors,
  conflictQuote,
  createQuote,
} = useQuotes();

const form = ref({
  first_name: "",
  last_name: "",
  identification_number: "",
  email: "",
  birth_date: "",
  destination_country_code: "",
  departure_date: "",
  return_date: "",
});

const today = new Date().toISOString().split("T")[0];

// Validación básica en frontend (rápida, de UX); la validación real y
// autoritativa vive en el backend (StoreQuoteRequest) — esto solo evita
// que el usuario dispare un request con campos obviamente vacíos.
const clientErrors = computed(() => {
  const errors = {};
  if (
    form.value.return_date &&
    form.value.departure_date &&
    form.value.return_date <= form.value.departure_date
  ) {
    errors.return_date = [
      "La fecha de regreso debe ser posterior a la fecha de salida.",
    ];
  }
  return errors;
});

const errors = computed(() => ({
  ...validationErrors.value,
  ...clientErrors.value,
}));

function errorFor(field) {
  return errors.value[field]?.[0] || null;
}

async function handleSubmit() {
  if (Object.keys(clientErrors.value).length > 0) return;

  const quote = await createQuote(form.value);
  if (quote) {
    emit("quoted", quote);
  }
}

onMounted(fetchCountries);
</script>

<template>
  <form class="card" @submit.prevent="handleSubmit">
    <h2>Cotizar seguro de viaje</h2>
    <p class="subtitle">
      Completa tus datos y los del viaje para obtener una cotización al
      instante.
    </p>

    <div v-if="submitError" class="alert alert-error">
      {{ submitError }}
      <RouterLink
        v-if="conflictQuote"
        :to="`/cotizaciones/${conflictQuote.id}`"
        class="conflict-link"
      >
        Ver cotización activa #{{ conflictQuote.id }} &rarr;
      </RouterLink>
    </div>
    <h3 class="section-title">Datos del asegurado</h3>
    <div class="form-grid">
      <div class="field">
        <label for="first_name">Nombres</label>
        <input
          id="first_name"
          v-model="form.first_name"
          type="text"
          :class="{ 'has-error': errorFor('first_name') }"
          required
        />
        <p v-if="errorFor('first_name')" class="field-error">
          {{ errorFor("first_name") }}
        </p>
      </div>
      <div class="field">
        <label for="last_name">Apellidos</label>
        <input
          id="last_name"
          v-model="form.last_name"
          type="text"
          :class="{ 'has-error': errorFor('last_name') }"
          required
        />
        <p v-if="errorFor('last_name')" class="field-error">
          {{ errorFor("last_name") }}
        </p>
      </div>
      <div class="field">
        <label for="identification_number">Número de identificación</label>
        <input
          id="identification_number"
          v-model="form.identification_number"
          type="text"
          :class="{ 'has-error': errorFor('identification_number') }"
          required
        />
        <p v-if="errorFor('identification_number')" class="field-error">
          {{ errorFor("identification_number") }}
        </p>
      </div>
      <div class="field">
        <label for="email">Correo electrónico</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          :class="{ 'has-error': errorFor('email') }"
          required
        />
        <p v-if="errorFor('email')" class="field-error">
          {{ errorFor("email") }}
        </p>
      </div>
      <div class="field full-width">
        <label for="birth_date">Fecha de nacimiento</label>
        <input
          id="birth_date"
          v-model="form.birth_date"
          type="date"
          :max="today"
          :class="{ 'has-error': errorFor('birth_date') }"
          required
        />
        <p v-if="errorFor('birth_date')" class="field-error">
          {{ errorFor("birth_date") }}
        </p>
      </div>
    </div>

    <h3 class="section-title">Datos del viaje</h3>
    <div class="form-grid">
      <div class="field full-width">
        <label for="destination_country_code">País de destino</label>
        <select
          id="destination_country_code"
          v-model="form.destination_country_code"
          :class="{ 'has-error': errorFor('destination_country_code') }"
          required
        >
          <option value="" disabled>Selecciona un país</option>
          <option
            v-for="country in countries"
            :key="country.code"
            :value="country.code"
          >
            {{ country.name }}
          </option>
        </select>
        <p v-if="loadingCountries" class="field-hint">Cargando países...</p>
        <p v-if="countriesError" class="field-error">{{ countriesError }}</p>
        <p v-if="errorFor('destination_country_code')" class="field-error">
          {{ errorFor("destination_country_code") }}
        </p>
      </div>
      <div class="field">
        <label for="departure_date">Fecha de salida</label>
        <input
          id="departure_date"
          v-model="form.departure_date"
          type="date"
          :min="today"
          :class="{ 'has-error': errorFor('departure_date') }"
          required
        />
        <p v-if="errorFor('departure_date')" class="field-error">
          {{ errorFor("departure_date") }}
        </p>
      </div>
      <div class="field">
        <label for="return_date">Fecha de regreso</label>
        <input
          id="return_date"
          v-model="form.return_date"
          type="date"
          :min="form.departure_date || today"
          :class="{ 'has-error': errorFor('return_date') }"
          required
        />
        <p v-if="errorFor('return_date')" class="field-error">
          {{ errorFor("return_date") }}
        </p>
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-primary btn-block"
      :disabled="submitting"
    >
      {{ submitting ? "Calculando..." : "Cotizar ahora" }}
    </button>
  </form>
</template>

<style scoped>
.subtitle {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 24px;
}
.conflict-link {
  display: block;
  margin-top: 6px;
  font-weight: 700;
  color: inherit;
  text-decoration: underline;
}
.section-title {
  font-size: 14px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 24px 0 12px;
}
.section-title:first-of-type {
  margin-top: 0;
}
.field-hint {
  color: var(--color-text-muted);
  font-size: 12px;
  margin-top: 4px;
}
</style>

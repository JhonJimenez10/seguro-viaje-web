<script setup>
import { ref } from "vue";
import { API_BASE_URL } from "../services/api";
import { useQuotes } from "../composables/useQuotes";

const props = defineProps({
  quote: { type: Object, required: true },
});
const emit = defineEmits(["hired", "reset"]);

const { loading, error, hireQuote } = useQuotes();
const localQuote = ref(props.quote);

async function handleHire() {
  const updated = await hireQuote(localQuote.value.id);
  if (updated) {
    localQuote.value = updated;
    emit("hired", updated);
  }
}

const pdfUrl = () => `${API_BASE_URL}/quotes/${localQuote.value.id}/pdf`;
</script>

<template>
  <div class="card">
    <div class="result-header">
      <div>
        <h2>Cotización #{{ localQuote.id }}</h2>
        <p class="subtitle">
          {{ localQuote.insured.full_name }} &middot;
          {{ localQuote.insured.email }}
        </p>
      </div>
      <span
        class="badge"
        :class="localQuote.status === 'hired' ? 'badge-hired' : 'badge-quoted'"
      >
        {{ localQuote.status_label }}
      </span>
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div class="summary-grid">
      <div>
        <p class="label">Destino</p>
        <p class="value">
          {{ localQuote.destination.country_name }} ({{
            localQuote.destination.region
          }})
        </p>
      </div>
      <div>
        <p class="label">Duración</p>
        <p class="value">{{ localQuote.days }} día(s)</p>
      </div>
      <div>
        <p class="label">Salida</p>
        <p class="value">{{ localQuote.departure_date }}</p>
      </div>
      <div>
        <p class="label">Regreso</p>
        <p class="value">{{ localQuote.return_date }}</p>
      </div>
    </div>

    <div class="pricing-box">
      <div class="pricing-row">
        <span
          >Tarifa base ({{ localQuote.days }} &times; ${{
            localQuote.pricing.base_rate_per_day
          }})</span
        >
        <span
          >${{
            (localQuote.days * localQuote.pricing.base_rate_per_day).toFixed(2)
          }}</span
        >
      </div>
      <div class="pricing-row">
        <span
          >Recargo por región ({{
            (localQuote.pricing.surcharge_percentage * 100).toFixed(0)
          }}%)</span
        >
        <span
          >${{
            (
              localQuote.pricing.total_amount -
              localQuote.days * localQuote.pricing.base_rate_per_day
            ).toFixed(2)
          }}</span
        >
      </div>
      <div class="pricing-row total">
        <span>Total</span>
        <span>${{ localQuote.pricing.total_amount.toFixed(2) }}</span>
      </div>
    </div>

    <div class="actions">
      <button
        v-if="localQuote.status === 'quoted'"
        class="btn btn-primary"
        :disabled="loading"
        @click="handleHire"
      >
        {{ loading ? "Contratando..." : "Contratar seguro" }}
      </button>
      <a
        :href="pdfUrl()"
        class="btn btn-secondary"
        target="_blank"
        rel="noopener"
      >
        Descargar PDF
      </a>
      <button class="btn btn-secondary" @click="emit('reset')">
        Nueva cotización
      </button>
    </div>
  </div>
</template>

<style scoped>
.result-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.subtitle {
  color: var(--color-text-muted);
  font-size: 14px;
  margin: 4px 0 0;
}
.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.label {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0 0 2px;
}
.value {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}
.pricing-box {
  background: var(--color-bg);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 20px;
}
.pricing-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--color-text-muted);
  padding: 6px 0;
}
.pricing-row.total {
  border-top: 2px solid var(--color-primary);
  margin-top: 6px;
  padding-top: 12px;
  font-weight: 700;
  font-size: 16px;
  color: var(--color-primary);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

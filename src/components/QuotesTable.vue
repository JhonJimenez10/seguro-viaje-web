<script setup>
import { useRouter } from "vue-router";

defineProps({
  quotes: { type: Array, required: true },
});

const router = useRouter();

function openDetail(id) {
  router.push({ name: "quote-detail", params: { id } });
}
</script>

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Identificación</th>
          <th>Destino</th>
          <th>Salida</th>
          <th>Regreso</th>
          <th>Valor</th>
          <th>Estado</th>
          <th>Creado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="quote in quotes"
          :key="quote.id"
          class="row-clickable"
          @dblclick="openDetail(quote.id)"
        >
          <td>{{ quote.insured.full_name }}</td>
          <td>{{ quote.insured.identification_number }}</td>
          <td>{{ quote.destination.country_name }}</td>
          <td>{{ quote.departure_date }}</td>
          <td>{{ quote.return_date }}</td>
          <td>${{ quote.pricing.total_amount.toFixed(2) }}</td>
          <td>
            <span
              class="badge"
              :class="quote.status === 'hired' ? 'badge-hired' : 'badge-quoted'"
            >
              {{ quote.status_label }}
            </span>
          </td>
          <td>{{ quote.created_at }}</td>
          <td>
            <RouterLink
              :to="`/cotizaciones/${quote.id}`"
              class="link"
              @click.stop
              >Ver</RouterLink
            >
          </td>
        </tr>
        <tr v-if="quotes.length === 0">
          <td colspan="9" class="empty">
            No se encontraron cotizaciones con esos filtros.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.row-clickable {
  cursor: pointer;
}
.row-clickable:hover {
  background: var(--color-bg);
}
.link {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 13px;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 32px !important;
}
</style>

<script setup>
import { API_BASE_URL } from "../services/api";

defineProps({
  quotes: { type: Array, required: true },
});

function pdfUrl(id) {
  return `${API_BASE_URL}/quotes/${id}/pdf`;
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
        <tr v-for="quote in quotes" :key="quote.id">
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
            <a
              :href="pdfUrl(quote.id)"
              target="_blank"
              rel="noopener"
              class="link"
              >PDF</a
            >
          </td>
        </tr>
        <tr v-if="quotes.length === 0">
          <td colspan="9" class="empty">
            Todavía no hay cotizaciones registradas.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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

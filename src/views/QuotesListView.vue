<script setup>
import { onMounted } from "vue";
import { useQuotes } from "../composables/useQuotes";
import QuotesTable from "../components/QuotesTable.vue";

const { quotes, meta, loading, error, fetchQuotes } = useQuotes();

function goToPage(page) {
  fetchQuotes(page);
}

onMounted(() => fetchQuotes());
</script>

<template>
  <div>
    <h2>Cotizaciones y pólizas</h2>
    <p class="subtitle">
      Consulta todas las cotizaciones generadas y su estado.
    </p>

    <div v-if="error" class="alert alert-error">{{ error }}</div>
    <p v-if="loading" class="loading-text">Cargando...</p>

    <QuotesTable v-if="!loading" :quotes="quotes" />

    <div v-if="meta && meta.last_page > 1" class="pagination">
      <button
        class="btn btn-secondary"
        :disabled="meta.current_page === 1"
        @click="goToPage(meta.current_page - 1)"
      >
        Anterior
      </button>
      <span class="page-info"
        >Página {{ meta.current_page }} de {{ meta.last_page }}</span
      >
      <button
        class="btn btn-secondary"
        :disabled="meta.current_page === meta.last_page"
        @click="goToPage(meta.current_page + 1)"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 20px;
}
.loading-text {
  color: var(--color-text-muted);
  font-size: 14px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}
.page-info {
  font-size: 14px;
  color: var(--color-text-muted);
}
</style>

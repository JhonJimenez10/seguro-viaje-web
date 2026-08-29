<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useQuotes } from "../composables/useQuotes";
import QuotesTable from "../components/QuotesTable.vue";

const { quotes, meta, loading, error, fetchQuotes } = useQuotes();

const statusFilter = ref("");
const searchTerm = ref("");
let debounceTimer = null;

function currentFilters() {
  const filters = {};
  if (statusFilter.value) filters.status = statusFilter.value;
  if (searchTerm.value) filters.search = searchTerm.value;
  return filters;
}

function goToPage(page) {
  fetchQuotes(page, currentFilters());
}

function applyFilters() {
  fetchQuotes(1, currentFilters());
}

watch(searchTerm, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(applyFilters, 400);
});

onBeforeUnmount(() => clearTimeout(debounceTimer));
onMounted(() => fetchQuotes(1, currentFilters()));
</script>

<template>
  <div>
    <h2>Cotizaciones y pólizas</h2>
    <p class="subtitle">
      Consulta todas las cotizaciones generadas y su estado.
    </p>

    <div class="filters">
      <div class="field filter-field">
        <label for="status">Estado</label>
        <select id="status" v-model="statusFilter" @change="applyFilters">
          <option value="">Todos</option>
          <option value="quoted">Cotizado</option>
          <option value="hired">Contratado</option>
        </select>
      </div>
      <div class="field filter-field grow">
        <label for="search">Buscar por nombre o identificación</label>
        <input
          id="search"
          v-model="searchTerm"
          type="text"
          placeholder="Ej: Juan o 0102030405"
        />
      </div>
    </div>

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
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.filter-field {
  margin-bottom: 0;
  min-width: 180px;
}
.filter-field.grow {
  flex: 1;
  min-width: 220px;
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

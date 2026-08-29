<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuotes } from "../composables/useQuotes";
import QuoteResult from "../components/QuoteResult.vue";

const route = useRoute();
const router = useRouter();
const { loading, error, fetchQuote } = useQuotes();
const quote = ref(null);

async function load() {
  quote.value = await fetchQuote(route.params.id);
}

function goBackToList() {
  router.push({ name: "quotes-list" });
}

onMounted(load);
</script>

<template>
  <div>
    <RouterLink to="/cotizaciones" class="back-link"
      >&larr; Volver al listado</RouterLink
    >

    <p v-if="loading" class="loading-text">Cargando...</p>
    <div v-else-if="error" class="alert alert-error">{{ error }}</div>
    <QuoteResult
      v-else-if="quote"
      :quote="quote"
      @hired="quote = $event"
      @deleted="goBackToList"
      @reset="goBackToList"
    />
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: var(--color-text-muted);
  font-size: 14px;
  text-decoration: none;
}
.back-link:hover {
  color: var(--color-primary);
}
.loading-text {
  color: var(--color-text-muted);
  font-size: 14px;
}
</style>

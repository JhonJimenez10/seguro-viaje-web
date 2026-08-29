import { ref } from "vue";
import api from "../services/api";

export function useQuotes() {
  const quotes = ref([]);
  const meta = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const validationErrors = ref({});
  const conflictQuote = ref(null);

  async function fetchQuotes(page = 1, filters = {}) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get("/quotes", {
        params: { page, ...filters },
      });
      quotes.value = response.data.data;
      meta.value = response.data.meta;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        "No se pudieron cargar las cotizaciones.";
    } finally {
      loading.value = false;
    }
  }

  async function fetchQuote(id) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get(`/quotes/${id}`);
      return response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "No se pudo cargar la cotización.";
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function createQuote(payload) {
    loading.value = true;
    error.value = null;
    validationErrors.value = {};
    conflictQuote.value = null;

    try {
      const response = await api.post("/quotes", payload);
      return response.data.data;
    } catch (err) {
      if (err.response?.status === 422) {
        validationErrors.value = err.response.data.errors || {};
      } else if (err.response?.status === 409) {
        conflictQuote.value = err.response.data.existing_quote;
        error.value = err.response.data.message;
      } else {
        error.value =
          err.response?.data?.message || "No se pudo generar la cotización.";
      }
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function hireQuote(id) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post(`/quotes/${id}/hire`);
      return response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "No se pudo contratar el seguro.";
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function deleteQuote(id) {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/quotes/${id}`);
      return true;
    } catch (err) {
      error.value =
        err.response?.data?.message || "No se pudo eliminar la cotización.";
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    quotes,
    meta,
    loading,
    error,
    validationErrors,
    conflictQuote,
    fetchQuotes,
    fetchQuote,
    createQuote,
    hireQuote,
    deleteQuote,
  };
}

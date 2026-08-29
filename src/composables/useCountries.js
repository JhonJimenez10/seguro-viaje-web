import { ref } from "vue";
import api from "../services/api";

export function useCountries() {
  const countries = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchCountries() {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get("/countries");
      countries.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        "No se pudo cargar la lista de países. Intenta nuevamente.";
    } finally {
      loading.value = false;
    }
  }

  return { countries, loading, error, fetchCountries };
}

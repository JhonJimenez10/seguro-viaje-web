<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import QuoteForm from "../components/QuoteForm.vue";
import QuoteResult from "../components/QuoteResult.vue";

const router = useRouter();
const currentQuote = ref(null);

function handleQuoted(quote) {
  currentQuote.value = quote;
}

function reset() {
  currentQuote.value = null;
}

function goToList() {
  router.push({ name: "quotes-list" });
}
</script>

<template>
  <QuoteResult
    v-if="currentQuote"
    :quote="currentQuote"
    @hired="currentQuote = $event"
    @reset="reset"
    @deleted="goToList"
  />
  <QuoteForm v-else @quoted="handleQuoted" />
</template>

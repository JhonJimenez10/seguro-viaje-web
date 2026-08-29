<script setup>
import { ref } from "vue";
import QuoteForm from "../components/QuoteForm.vue";
import QuoteResult from "../components/QuoteResult.vue";

const currentQuote = ref(null);

function handleQuoted(quote) {
  currentQuote.value = quote;
}

function reset() {
  currentQuote.value = null;
}
</script>

<template>
  <QuoteResult
    v-if="currentQuote"
    :quote="currentQuote"
    @hired="currentQuote = $event"
    @reset="reset"
  />
  <QuoteForm v-else @quoted="handleQuoted" />
</template>

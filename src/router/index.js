import { createRouter, createWebHistory } from "vue-router";
import QuoteView from "../views/QuoteView.vue";
import QuotesListView from "../views/QuotesListView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "quote",
      component: QuoteView,
    },
    {
      path: "/cotizaciones",
      name: "quotes-list",
      component: QuotesListView,
    },
  ],
});

export default router;

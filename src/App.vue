<script setup></script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <RouterLink to="/" class="brand">🧳 Seguro Viaje</RouterLink>
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Cotizar</RouterLink>
        <RouterLink to="/cotizaciones" class="nav-link"
          >Mis cotizaciones</RouterLink
        >
      </nav>
    </div>
  </header>

  <main class="container page">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
}
.brand {
  font-weight: 700;
  font-size: 16px;
  color: var(--color-text);
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 8px;
}
.nav-link {
  padding: 8px 14px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: none;
}
.nav-link:hover {
  background: var(--color-bg);
}
.nav-link.router-link-exact-active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
.page {
  padding: 32px 16px 60px;
  flex: 1;
}
</style>

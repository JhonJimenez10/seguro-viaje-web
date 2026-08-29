# Seguro Viaje - Web (Frontend)

Interfaz web para cotizar y contratar seguros de viaje, consumiendo la [API de Seguro Viaje](https://github.com/JhonJimenez10/seguro-viaje-api).

Construida con **Vue 3** (Composition API) y **Vite**.

---

## Instalación

### Requisitos previos

- Node.js 18+
- El [backend](https://github.com/JhonJimenez10/seguro-viaje-api) corriendo (por defecto en `http://127.0.0.1:8000`)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/JhonJimenez10/seguro-viaje-web.git
cd seguro-viaje-web

# 2. Instalar dependencias
npm install

# 3. Configurar el entorno
cp .env.example .env
# Verifica que VITE_API_BASE_URL apunte a tu backend

# 4. Levantar el servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

---

## 🏗️ Arquitectura

Arquitectura basada en componentes con una **capa de servicios** que separa la comunicación HTTP de la UI, siguiendo el mismo principio del backend: la lógica no vive dentro de los componentes visuales.

### Pantallas

| Ruta                | Vista             | Descripción                                  |
| ------------------- | ----------------- | -------------------------------------------- |
| `/`                 | `QuoteView`       | Formulario de cotización y resultado         |
| `/cotizaciones`     | `QuotesListView`  | Listado con filtros                          |
| `/cotizaciones/:id` | `QuoteDetailView` | Permite contratar/eliminar si está pendiente |

### Validaciones

Se implementó validación básica en el frontend (campos requeridos, formato, fecha de regreso posterior a la de salida) solo para dar feedback inmediato al usuario — la validación real y autoritativa vive en el backend (`StoreQuoteRequest`), nunca se confía únicamente en el frontend.

---

## Responsive

La interfaz se probó en escritorio y en dispositivo móvil real (no solo emulador), usando CSS Grid con columnas que colapsan a una sola en pantallas angostas.

---

## Mejoras futuras

- Manejo de estado global si la app creciera a más pantallas con estado compartido complejo.
- Componente de notificaciones en vez de banners de alerta inline.
- Tests de componentes con Vitest + Vue Testing Library.

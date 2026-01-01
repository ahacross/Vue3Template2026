# Vue 3 + Vite Template

This template helps you get started developing with Vue 3 in Vite.

## Technology Stack

- **Framework**: Vue 3
- **Build Tool**: Vite
- **State Management**: Pinia + `pinia-plugin-persistedstate`
- **Routing**: Vue Router (`unplugin-vue-router` for file-based routing)
- **Data Fetching**: TanStack Query (Vue Query) + Axios
- **UI Components**: Vue Final Modal, `@vuepic/vue-datepicker`
- **Utilities**:
  - `date-fns` (Date manipulation)
  - `es-toolkit` (General utility)
  - `@vueuse/core`
- **Linting & Formatting**:
  - Oxlint (Fast linting)
  - ESLint (Vue specific rules)
  - Prettier (Formatting)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Lint and Format

```sh
pnpm run lint
pnpm run format
```

### Compile and Minify for Production

```sh
pnpm run build
```

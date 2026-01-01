import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
console.log(routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    if (to.path !== from.path) {
      return { top: 0, left: 0 }
    }
  },
})

export default router

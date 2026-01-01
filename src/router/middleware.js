import router from '@/router'
// import { useUserStore } from '@/stores/user'

// let userStore
// function getUserStore() {
//   if (!userStore) {
//     userStore = useUserStore()
//   }
//   return userStore
// }

router.beforeEach((to, from, next) => {
  // getUserStore()

  if (to.path !== from.path) {
    next()
  }
})

import { createRouter, createWebHistory } from 'vue-router'

const AuthenticationView = () => import('@/iam/ui/views/authentication-view.vue')
const NotFound = () => import('@/shared/ui/views/not-found-view.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/authentication',
      name: 'authentication-view',
      component: AuthenticationView,
      children: [
        {
          path: 'sign-in',
          name: 'sign-in-view',
          component: () => import('@/iam/ui/views/sign-in-view.vue')
        },
        {
          path: 'sign-up',
          name: 'sign-up-view',
          component: () => import('@/iam/ui/views/sign-up-view.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-view',
      component: NotFound
    }
  ]
})

export default router

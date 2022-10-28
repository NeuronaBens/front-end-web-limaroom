import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '../store/index'

const AuthenticationView = () => import('@/iam/ui/views/authentication-view.vue')
const SignInView = () => import('@/iam/ui/views/sign-in-view.vue')
const SignUpView = () => import('@/iam/ui/views/sign-up-view.vue')

const MyOffersView = () => import('@/rental/ui/views/lessors/my-offers-view.vue')
const OffersView = () => import('@/rental/ui/views/students/offers-view.vue')
const OfferDetailView = () => import('@/rental/ui/views/students/offer-detail-view.vue')
const RequestsView = () => import('@/rental/ui/views/students/requests-view.vue')

const CreateProfileView = () => import('@/profile/ui/views/create-profile-view.component.vue')
const ProfileView = () => import('@/profile/ui/views/profile-view.component.vue')

const NotFound = () => import('@/shared/ui/views/not-found-view.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/authentication',
      alias: '/',
      name: 'authentication-view',
      component: AuthenticationView,
      children: [
        {
          path: 'sign-in',
          name: 'sign-in-view',
          component: SignInView
        },
        {
          path: 'sign-up',
          name: 'sign-up-view',
          component: SignUpView
        }
      ]
    },
    {
      path: '/profile/:id',
      name: 'profile',
      children: [
        {
          path: '',
          name: 'show-profile-view',
          component: ProfileView
        },
        {
          path: 'create',
          name: 'create-profile-view',
          component: CreateProfileView
        }
      ]
    },
    {
      path: '/properties',
      name: 'properties-view',
      component: MyOffersView
    },
    {
      path: '/offers/:id',
      name: 'offer-detail-view',
      component: OfferDetailView
    },
    {
      path: '/offers',
      name: 'offers-view',
      component: OffersView
    },
    {
      path: '/user/:id/requests',
      name: 'requests-view',
      component: RequestsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-view',
      component: NotFound
    }
  ]
})

const routesUsers = {
  ROLE_USER_STUDENT: {
    main: 'offers-view',
    routes: ['offers-view', 'offer-detail-view', 'requests-view', 'profile-view', 'create-profile-view', 'show-profile-view']
  },
  ROLE_USER_LESSOR: {
    main: 'properties-view',
    routes: ['properties-view', 'profile-view', 'create-profile-view', 'show-profile-view']
  }
}

router.beforeEach((to, from) => {
  const currentUser = userStore()

  if (currentUser.state.status.loggedIn) {
    if (to.name === 'sign-in-view' || to.name === 'sign-up-view') {
      return { name: 'offers-view' }
    }

    if (!currentUser.state.user.hasProfile) {
      if (to.name !== 'create-profile-view') {
        return { name: 'create-profile-view', params: { id: currentUser.state.user.id } }
      }
    }

    if (!routesUsers[currentUser.state.user.role].routes.includes(to.name)) {
      if (from.name) {
        return { name: from.name }
      }
      return { name: routesUsers[currentUser.state.user.role].main }
    }
  } else {
    if (to.name !== 'sign-in-view' && to.name !== 'sign-up-view') {
      return { name: 'sign-in-view' }
    }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '../store/index'

const AuthenticationView = () => import('@/iam/ui/views/authentication-view.component.vue')
const SignInView = () => import('@/iam/ui/views/sign-in-view.component.vue')
const SignUpView = () => import('@/iam/ui/views/sign-up-view.component.vue')

const MyOffersView = () => import('@/rental/ui/views/lessors/my-offers-view.component.vue')
const MyOfferDetailView = () => import('@/rental/ui/views/lessors/my-offer-detail-view.component.vue')
const CreateOfferView = () => import('@/rental/ui/views/lessors/create-offer-view.component.vue')
const EditOfferView = () => import('@/rental/ui/views/lessors/edit-offer-view.component.vue')
const AssignFeaturesView = () => import('@/rental/ui/views/lessors/assign-features-view.component.vue')

const OffersView = () => import('@/rental/ui/views/students/offers-view.component.vue')
const OfferDetailView = () => import('@/rental/ui/views/students/offer-detail-view.component.vue')

const StudentRequetsView = () => import('@/rental/ui/views/students/requests-view.component.vue')
const LessorRequetsView = () => import('@/rental/ui/views/lessors/requests-view.component.vue')

const CreateProfileView = () => import('@/profile/ui/views/create-profile-view.component.vue')
const ProfileView = () => import('@/profile/ui/views/profile-view.component.vue')
const AssignAttributesView = () => import('@/profile/ui/views/assign-attributes-view.component.vue')

const RoommatesView = () => import('@/roommate/ui/views/roommates-view.component.vue')
const TeamsView = () => import('@/roommate/ui/views/teams-view.component.vue')
const TeamView = () => import('@/roommate/ui/views/show-team-view.component.vue')

const MyTeamView = () => import('@/coexistance/ui/views/team-view.component.vue')
const CreateDutyView = () => import('@/coexistance/ui/views/create-duty-view.component.vue')
const AssignDutyToRoommateView = () => import('@/coexistance/ui/views/assign-duty-view.component.vue')

const NotFound = () => import('@/shared/ui/views/not-found-view.component.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'sign-in-view' }
    },
    {
      path: '/authentication',
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
      path: '/profile/:id?',
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
        },
        {
          path: 'assign-attributes',
          name: 'assign-attributes-view',
          component: AssignAttributesView
        }
      ]
    },
    {
      path: '/my-offers/:id',
      name: 'my-offers',
      children: [
        {
          path: '',
          name: 'my-offers-view',
          component: MyOffersView
        },
        {
          path: 'create-offer',
          name: 'create-offer-view',
          component: CreateOfferView
        }
      ]
    },
    {
      path: '/my-offers/offer/:id',
      name: 'my-offer-detail',
      children: [
        {
          path: '',
          name: 'my-offer-detail-view',
          component: MyOfferDetailView
        },
        {
          path: 'edit',
          name: 'edit-offer-view',
          component: EditOfferView
        },
        {
          path: 'assign-features',
          name: 'assign-features-view',
          component: AssignFeaturesView
        }
      ]
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
      name: 'requests',
      children: [
        {
          path: 'lessor',
          name: 'lessor-requests-view',
          component: LessorRequetsView
        },
        {
          path: 'student',
          name: 'student-requests-view',
          component: StudentRequetsView
        }
      ]
    },
    {
      path: '/roommates',
      name: 'roommates-view',
      component: RoommatesView
    },
    {
      path: '/:id/my-team',
      name: 'team-view',
      children: [
        {
          path: '',
          name: 'my-team-view',
          component: MyTeamView
        },
        {
          path: ':teamId/create-new-duty',
          name: 'create-duty-view',
          component: CreateDutyView
        },
        {
          path: ':dutyId/assign-duty-to-roommate/',
          name: 'assign-duty-to-roommate-view',
          component: AssignDutyToRoommateView
        }
      ]
    },
    {
      path: '/teams',
      name: 'teams-view',
      component: TeamsView
    },
    {
      path: '/teams/:id',
      name: 'show-team-view',
      component: TeamView
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
    routes: ['offers-view', 'offer-detail-view', 'student-requests-view', 'create-profile-view', 'show-profile-view', 'roommates-view', 'assign-attributes-view', 'my-team-view', 'create-duty-view', 'assign-duty-to-roommate-view', 'teams-view', 'show-team-view']
  },
  ROLE_USER_LESSOR: {
    main: 'my-offers-view',
    routes: ['my-offers-view', 'profile-view', 'lessor-requests-view', 'create-profile-view', 'show-profile-view', 'create-offer-view', 'my-offer-detail-view', 'edit-offer-view', 'assign-features-view']
  }
}

router.beforeEach((to, from) => {
  const currentUser = userStore()

  if (currentUser.state.status.loggedIn) {
    if (to.name === 'sign-in-view' || to.name === 'sign-up-view') {
      return { name: 'offers-view' }
    } else {
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
    }
  } else {
    if (to.name !== 'sign-in-view' && to.name !== 'sign-up-view') {
      return { name: 'sign-in-view' }
    }
  }
})

export default router

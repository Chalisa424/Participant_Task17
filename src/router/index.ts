import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailView from '../views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEventStore } from '@/stores/event'
import eventService from '@/services/EventService'
import ParticipantListView from '@/views/participant/ParticipantListView.vue'
import ParticipantDetailView from '@/views/participant/ParticipantDetailView.vue'


const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
                page: parseInt(route.query.page as string) || 1,
              }),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
          path: '/event/:id',
          name: 'event-layout-view',
          component: EventLayoutView,
          props: true,
          beforeEnter: (to) => {
            const id = parseInt(to.params.id as string)
            const eventStore = useEventStore()
            return eventService
              .getEvent(id)
              .then((response) => {
                // need to setup the data for the event
                eventStore.setEvent(response.data)
              })
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  return {
                    name: '404-resource-view',
                    params: { resource: 'event' },
                  }
                } else {
                  return { name: 'network-error-view' }
                }
              })
          },
          children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true,
        },

        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true,
        },
      ],
     },
     {
            path: '/network-error',
            name: 'network-error-view',
            component: NetworkErrorView,
       },

     {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
     {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/participants',
      name: 'participant-list-view',
      component: () => import('../views/participant/ParticipantListView.vue'),
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/participant/:id',
      name: 'participant-detail-view',
      component: () => import('../views/participant/ParticipantDetailView.vue'),
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
router.beforeEach(() => {
    nProgress.start()
  })

  router.afterEach(() => {
    nProgress.done()
  })

export default router

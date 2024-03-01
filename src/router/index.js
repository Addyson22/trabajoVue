import PaginaInicio from '@/components/PaginaInicio.vue'
import TablaClientes from '@/components/TablaClientes.vue'
import TablaTareas from '@/components/TablaTareas.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PaginaInicio
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: TablaClientes
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/tareas',
    name: 'tareas',
    component: TablaTareas
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

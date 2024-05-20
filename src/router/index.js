import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BienvenidaView from '../views/BienvenidaView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import InicioView from '@/views/InicioView.vue'
import ProductosView from '@/views/ProductosView.vue'
import CarritoView from '@/views/CarritoView.vue'
import VerificarView from '@/views/VerificarView.vue'
import HistorialView from '@/views/HistorialView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bienvenida',
      component: BienvenidaView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/verificar',
      name: 'verificar',
      component: VerificarView
    },
    {
      path: '/historial',
      name: 'historial',
      component: HistorialView
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioView
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoView
    },
    {
      path: '/productos/:id',
      name: 'productos',
      component: ProductosView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

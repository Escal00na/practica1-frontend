import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import CatalogoView from '../views/CatalogoView.vue'
import ProductoDetalle from '../views/ProductoDetalle.vue'
import NotFound from '../views/NotFound.vue'

import AdminLayout from '../layouts/AdminLayout.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Productos from '../views/admin/Productos.vue'
import NuevoProducto from '../views/admin/NuevoProducto.vue'

import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/catalogo',
      component: CatalogoView
    },
    {
      path: '/catalogo/:id',
      component: ProductoDetalle,
      props: true
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
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'productos',
          component: Productos
        },
        {
          path: 'nuevo',
          component: NuevoProducto
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (
    to.meta.requiresAuth &&
    !auth.isAuthenticated
  ) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
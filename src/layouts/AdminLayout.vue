<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <h2>Panel Administrador</h2>

    <p>
      Usuario: {{ auth.user?.name }}
    </p>

    <button @click="logout">
      Cerrar sesión
    </button>

    <br><br>

    <router-link to="/admin">
      Dashboard
    </router-link>

    |

    <router-link to="/admin/productos">
      Productos
    </router-link>

    |

    <router-link to="/admin/nuevo">
      Nuevo Producto
    </router-link>

    <br><br>

    <router-view />
  </div>
</template>
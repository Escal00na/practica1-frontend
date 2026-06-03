<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const cerrarSesion = async () => {
  try {
    await auth.logout()

    window.location.href = '/login'
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <nav>
    <span>
      Usuario: {{ auth.user?.name }}
    </span>

    <button @click="cerrarSesion">
      Cerrar sesión
    </button>
  </nav>
</template>
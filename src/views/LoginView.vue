<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const login = async () => {
  try {
    await auth.login({
      email: email.value,
      password: password.value
    })

    router.push(
      route.query.redirect || '/admin'
    )
  } catch {
    alert('Credenciales incorrectas')
  }
}
</script>

<template>
  <div>
    <h2>Login</h2>

    <input
      v-model="email"
      placeholder="Email"
    >

    <input
      v-model="password"
      type="password"
      placeholder="Password"
    >

    <button @click="login">
      Iniciar sesión
    </button>
  </div>
</template>
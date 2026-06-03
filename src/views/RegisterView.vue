<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const register = async () => {
  try {
    await axios.post(
      'http://127.0.0.1:8000/api/register',
      {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation:
          password_confirmation.value
      }
    )

    alert('Usuario registrado')
    router.push('/login')
  } catch (error) {
    alert('Error al registrar usuario')
    console.log(error)
  }
}
</script>

<template>
  <div>
    <h2>Registro</h2>

    <input
      v-model="name"
      placeholder="Nombre"
    >

    <br><br>

    <input
      v-model="email"
      placeholder="Email"
    >

    <br><br>

    <input
      v-model="password"
      type="password"
      placeholder="Contraseña"
    >

    <br><br>

    <input
      v-model="password_confirmation"
      type="password"
      placeholder="Confirmar contraseña"
    >

    <br><br>

    <button @click="register">
      Registrarse
    </button>
  </div>
</template>
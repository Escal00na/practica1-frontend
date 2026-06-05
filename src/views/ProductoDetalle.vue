<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String
})

const router = useRouter()

const producto = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/productos/${props.id}`
    )

    producto.value = data
  } catch (error) {
    console.error(error)
  }
})

const volver = () => {
  router.back()
}
</script>

<template>
  <div v-if="producto">
    <h1>{{ producto.nombre }}</h1>

    <p>
      <strong>Descripción:</strong>
      {{ producto.descripcion }}
    </p>

    <p>
      <strong>Precio:</strong>
      ${{ producto.precio }}
    </p>

    <p>
      <strong>Stock:</strong>
      {{ producto.stock }}
    </p>

    <button @click="volver">
      Volver al catálogo
    </button>
  </div>

  <div v-else>
    Cargando producto...
  </div>
</template>
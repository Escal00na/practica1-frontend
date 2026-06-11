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
  <img
    v-if="producto.imagen_url"
    :src="producto.imagen_url"
    :alt="producto.nombre"
    width="300"
  >

  <div
    v-else
    style="
      width:300px;
      height:200px;
      border:1px solid black;
      display:flex;
      align-items:center;
      justify-content:center;
   "
  >
  Sin imagen
</div>

<br><br>

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
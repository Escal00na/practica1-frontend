<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])
const busqueda = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/productos'
    )

    productos.value = data
  } catch (error) {
    console.error(error)
  }
})

const productosFiltrados = computed(() =>
  productos.value.filter(producto =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.value.toLowerCase())
  )
)
</script>

<template>
  <div>
    <h1>Catálogo</h1>

    <input
      v-model="busqueda"
      placeholder="Buscar producto..."
    >

    <hr>

    <div
      v-for="producto in productosFiltrados"
      :key="producto.id"
    >
      <h3>{{ producto.nombre }}</h3>

      <p>
        Precio: ${{ producto.precio }}
      </p>

      <router-link
        :to="`/catalogo/${producto.id}`"
      >
        Ver detalle
      </router-link>

      <hr>
    </div>
  </div>
</template>
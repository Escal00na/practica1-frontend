<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()

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

      <br><br>

      <button
        @click="carrito.agregar(producto)"
      >
        <template
          v-if="carrito.cantidadDeProducto(producto.id) > 0"
        >
          En carrito ({{ carrito.cantidadDeProducto(producto.id) }})
        </template>

        <template v-else>
          Agregar al carrito
        </template>
      </button>

      <hr>
    </div>
  </div>
</template>
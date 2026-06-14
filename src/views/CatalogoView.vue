<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()

const categorias = ref([])
const categoriaActiva = ref(null)
const productos = ref([])
const busqueda = ref('')

const cargarProductos = async () => {
  try {
    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/productos'
    )

    productos.value = data
    categoriaActiva.value = null
  } catch (error) {
    console.error(error)
  }
}

const cargarCategorias = async () => {
  try {
    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/categorias'
    )

    categorias.value = data
  } catch (error) {
    console.error(error)
  }
}

const filtrarPorCategoria = async (categoria) => {
  try {
    categoriaActiva.value = categoria

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/categorias/${categoria.id}/productos`
    )

    productos.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await cargarProductos()
  await cargarCategorias()
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

    <h3>Categorías</h3>

    <button
      @click="cargarProductos"
    >
      Todas
    </button>

    <button
      v-for="categoria in categorias"
      :key="categoria.id"
      @click="filtrarPorCategoria(categoria)"
    >
      {{ categoria.nombre }}
    </button>

    <br><br>

    <input
      v-model="busqueda"
      placeholder="Buscar producto..."
    >

    <hr>

    <div
      v-for="producto in productosFiltrados"
      :key="producto.id"
    >
      <img
        v-if="producto.imagen_url"
        :src="producto.imagen_url"
        :alt="producto.nombre"
        width="200"
      >

      <div
        v-else
        style="width:200px;height:150px;border:1px solid black;display:flex;align-items:center;justify-content:center;"
      >
        Sin imagen
      </div>

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
<script setup>
import { ref, onMounted } from 'vue'
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
} from '../services/productoService'

const productos = ref([])

const form = ref({
  nombre: '',
  descripcion: '',
  precio: '',
  stock: ''
})

const editando = ref(false)
const productoId = ref(null)

const cargarProductos = async () => {
  const response = await getProductos()
  productos.value = response.data
}

const guardarProducto = async () => {
  try {
    if (editando.value) {
      await updateProducto(productoId.value, form.value)
      alert('Producto actualizado correctamente')
    } else {
      await createProducto(form.value)
      alert('Producto guardado correctamente')
    }

    form.value = {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: ''
    }

    editando.value = false
    productoId.value = null

    cargarProductos()
  } catch (error) {
    alert('Error al guardar')
  }
}

const editarProducto = (producto) => {
  form.value = { ...producto }
  productoId.value = producto.id
  editando.value = true
}

const eliminarProducto = async (id) => {
  if (confirm('¿Eliminar producto?')) {
    try {
      await deleteProducto(id)
      alert('Producto eliminado correctamente')
      cargarProductos()
    } catch (error) {
      alert('Error al eliminar')
    }
  }
}

onMounted(() => {
  cargarProductos()
})
</script>

<template>
  <div>
    <h1>Productos</h1>

    <form @submit.prevent="guardarProducto">
      <input v-model="form.nombre" placeholder="Nombre" required />

      <input
        v-model="form.descripcion"
        placeholder="Descripción"
      />

      <input
        v-model="form.precio"
        type="number"
        placeholder="Precio"
        required
      />

      <input
        v-model="form.stock"
        type="number"
        placeholder="Stock"
        required
      />

      <button type="submit">
        {{ editando ? 'Actualizar' : 'Guardar' }}
      </button>
    </form>

    <hr />

    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="producto in productos"
          :key="producto.id"
        >
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>

          <td>
            <button @click="editarProducto(producto)">
              Editar
            </button>

            <button @click="eliminarProducto(producto.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
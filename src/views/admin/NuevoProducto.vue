<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const form = reactive({
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria_id: ''
})

const imagen = ref(null)
const preview = ref(null)

const mensaje = ref('')
const loading = ref(false)

const categorias = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/categorias'
    )

    categorias.value = data
  } catch (error) {
    console.error(error)
  }
})

const onImageChange = (event) => {
  const file = event.target.files[0]

  if (!file) return

  imagen.value = file
  preview.value = URL.createObjectURL(file)
}

const guardar = async () => {
  if (!form.nombre || !form.precio) {
  mensaje.value = 'Nombre y precio son obligatorios'

  setTimeout(() => {
    mensaje.value = ''
  }, 3000)

  return
}
  try {
    const fd = new FormData()

    fd.append('nombre', form.nombre)
    fd.append('descripcion', form.descripcion)
    fd.append('precio', form.precio)
    fd.append('stock', form.stock)
    fd.append('categoria_id', form.categoria_id)

    if (imagen.value) {
      fd.append('imagen', imagen.value)
    }

    loading.value = true
    await axios.post(
      'http://127.0.0.1:8000/api/productos',
      fd,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    mensaje.value = 'Producto guardado correctamente'
    setTimeout(() => {
      mensaje.value = ''
    }, 3000)

    form.nombre = ''
    form.descripcion = ''
    form.precio = ''
    form.stock = ''
    form.categoria_id = ''

    imagen.value = null
    preview.value = null

  } catch (error) {
    console.error(error)
    mensaje.value = 'Error al guardar producto'
    setTimeout(() => {
      mensaje.value = ''
    }, 3000)
  } finally {
      loading.value = false
    }
}
</script>

<template>
  <div>
    <h1>Nuevo Producto</h1>

    <p v-if="loading">
      Guardando producto...
    </p>  

    <p v-if="mensaje">
      {{ mensaje }}
    </p>

    <form @submit.prevent="guardar">

      <input
        v-model="form.nombre"
        placeholder="Nombre"
      >

      <br><br>

      <input
        v-model="form.descripcion"
        placeholder="Descripción"
      >

      <br><br>

      <input
        v-model="form.precio"
        type="number"
        placeholder="Precio"
      >

      <br><br>

      <input
        v-model="form.stock"
        type="number"
        placeholder="Stock"
      >

      <br><br>

      <select v-model="form.categoria_id">

        <option value="">
          Sin categoría
        </option>

        <option
          v-for="cat in categorias"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.nombre }}
        </option>

      </select>

      <br><br>

      <input
        type="file"
        accept="image/*"
        @change="onImageChange"
      >

      <br><br>

      <img
        v-if="preview"
        :src="preview"
        width="200"
      >

      <br><br>

      <button type="submit">
        Guardar Producto
      </button>

    </form>
  </div>
</template>
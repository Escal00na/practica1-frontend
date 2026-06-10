<script setup>
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()

const vaciarCarrito = () => {
  if (confirm('¿Vaciar carrito?')) {
    carrito.vaciar()
  }
}
</script>

<template>
  <div>
    <h1>Carrito</h1>

    <div
      v-for="item in carrito.items"
      :key="item.id"
    >
      <h3>{{ item.nombre }}</h3>

      <p>
        Precio: ${{ item.precio }}
      </p>

      <button
        @click="carrito.cambiarCantidad(item.id, item.cantidad - 1)"
      >
        -
      </button>

      {{ item.cantidad }}

      <button
        @click="carrito.cambiarCantidad(item.id, item.cantidad + 1)"
      >
        +
      </button>

      <button
        @click="carrito.quitar(item.id)"
      >
        X
      </button>

      <p>
        Subtotal:
        ${{ item.precio * item.cantidad }}
      </p>

      <hr>
    </div>

    <h2>
      Total: ${{ carrito.totalPrecio }}
    </h2>

    <button @click="vaciarCarrito">
      Vaciar carrito
    </button>

    <button
      @click="alert('Compra finalizada')"
    >
      Finalizar compra
    </button>
  </div>
</template>
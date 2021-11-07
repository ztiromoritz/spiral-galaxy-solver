<script setup>
  import Field from "./components/Field.vue"

</script>

<template>
  <div class="wrapper">
  <Field></Field>
  </div>
</template>

<style>
html, body {
  height: 100%;
}
body {
  display:flex;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  display: flex;
}
.wrapper {
  margin: auto;
}
</style>

<script setup>
import Field from './components/Field.vue';
import StarField from './components/StarField.vue';
</script>

<template>
  <div class="wrapper">
    <StarField></StarField>
    <Field></Field>
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
body {
  display: flex;
  background-color: black;
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

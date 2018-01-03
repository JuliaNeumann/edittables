<template>
  <div id="app">
    <EditTable/>
  </div>
</template>

<script>
import EditTable from './components/EditTable'

export default {
  name: 'app',
  components: {
    EditTable
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="epp_app_static">
    <StaticTable/>
  </div>
</template>

<script>
import StaticTable from './components/StaticTable'

export default {
  name: 'app',
  components: {
    StaticTable
  }
}
</script>

<style>
#epp_app_static {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

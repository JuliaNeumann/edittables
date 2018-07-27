<template>
    <th class="head">
        {{ text }}
    </th>
</template>

<script>
  export default {
    name: 'TableHead',
    props: [
      'text'
    ]
  }
</script>

<style scoped>
    .head {
        border: 1px solid grey;
        padding: 10px;
    }
</style>
<template>
    <th>
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
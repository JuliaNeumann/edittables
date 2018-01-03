<template>
    <tr>
        <TableCell v-for="(cell, index) in row" :key="index" :cell="cell" />
    </tr>
</template>

<script>
  import TableCell from './TableCell'

  export default {
    name: 'TableRow',
    components: {
      TableCell
    },
    props: [
      'row'
    ]
  }
</script>
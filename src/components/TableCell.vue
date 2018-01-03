<template>
    <td>
        {{ cell.content }}
    </td>
</template>

<script>
  export default {
    name: 'TableCell',
    props: [
      'cell'
    ]
  }
</script>
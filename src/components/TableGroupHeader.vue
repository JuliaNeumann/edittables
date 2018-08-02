<template>
    <tr>
        <td colspan="3" class="group-header">
            <strong>{{ text }}</strong>
        </td>
    </tr>
</template>

<script>
  export default {
    name: 'TableGroupHeader',
    props: [
      'text'
    ]
  }
</script>

<style scoped>
    .group-header {
        border: 1px solid grey;
        text-align: left;
        background-color: lightgray;
        padding: 10px;
        cursor: pointer;
    }
</style>
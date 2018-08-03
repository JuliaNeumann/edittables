<template>
    <tr>
        <td :colspan="cols" class="group-header">
            <ArrowToggle :direction="this.open ? 'down' : 'right'"/>
            <strong>{{ text }}</strong>
        </td>
    </tr>
</template>

<script>
  import ArrowToggle from './ArrowToggle'
  export default {
    name: 'TableGroupHeader',
    components: {
      ArrowToggle
    },
    props: [
      'text',
      'open',
      'cols'
    ]
  }
</script>

<style scoped>
    .group-header {
        border: 1px solid grey;
        text-align: left;
        background-color: #ddd;
        padding: 10px;
        cursor: pointer;
    }
</style>
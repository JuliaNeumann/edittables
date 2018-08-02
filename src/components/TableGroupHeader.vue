<template>
    <tr>
        <td colspan="3" class="group-header">
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
      'open'
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
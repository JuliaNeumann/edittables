<template>
    <tr class="row">
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
    .row {
        display: flex;
    }
    .group-header {
        border-bottom: 1px solid grey;
        text-align: left;
        background-color: #9DB5C7;
        padding: 10px;
        cursor: pointer;
        width: 100%;
    }
</style>

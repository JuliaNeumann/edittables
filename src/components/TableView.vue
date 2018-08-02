<template>
    <table class="table">
        <tbody>
        <template v-for="(head, index) in heads">
            <TableGroupHeader v-if="startGroup(index)"
                              :text="groups[head.group]"
                              :open="activeGroups.indexOf(head.group) > -1"
                              @click.native="toggleGroup(head.group)"/>
            <tr :key="index"
                v-if="showRow(head)"
                class="row"
                :class="head.group ? 'row--group' : ''">
                <TableHead :text="head.content" />
                <TableCell v-for="(row, rowIndex) in rows"
                           :cell="row[index]"
                           :key="rowIndex" />
            </tr>
        </template>
        </tbody>
    </table>
</template>

<script>
  import TableHead from './TableHead'
  import TableCell from './TableCell'
  import TableGroupHeader from './TableGroupHeader'

  export default {
    name: 'TableView',
    components: {
      TableHead,
      TableCell,
      TableGroupHeader
    },
    props: [
      'heads',
      'groups',
      'rows'
    ],
    data () {
      return {
        activeGroups: []
      }
    },
    watch: {
      activeGroups: function () {
        localStorage.setItem('activeGroups', JSON.stringify(this.activeGroups))
      }
    },
    mounted: function () {
      if (localStorage.getItem('activeGroups')) {
        this.activeGroups = JSON.parse(localStorage.getItem('activeGroups'))
      }
    },
    methods: {
      startGroup: function (headIndex) {
        return this.heads[headIndex].group &&                       // current head belongs to a group and ...
          (headIndex === 0 || !this.heads[headIndex - 1].group)     // ... is the first head or the head before it does not belong to a group
      },
      toggleGroup: function (groupID) {
        const index = this.activeGroups.indexOf(groupID)
        if (index === -1) {
          this.activeGroups.push(groupID)
          return
        }
        this.activeGroups.splice(index, 1)
      },
      showRow: function (head) {
        return !head.group || (this.activeGroups.indexOf(head.group) > -1)
      }
    }
  }
</script>

<style scoped>
    .table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    .row--group {
        background-color: #eee;
    }
</style>

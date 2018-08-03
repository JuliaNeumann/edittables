<template>
    <div>
        <table class="table">
            <tbody>
            <template v-for="(head, index) in heads">
                <TableGroupHeader v-if="startGroup(index)"
                                  :text="groups[head.group]"
                                  :open="activeGroups.indexOf(head.group) > -1"
                                  :cols="paginate ? rowsPerPage + 1 : 2"
                                  @click.native="toggleGroup(head.group)"/>
                <tr :key="index"
                    v-if="showRow(head)"
                    class="row"
                    :class="head.group ? 'row--group' : ''">
                    <TableHead :text="head.content" />
                    <TableCell v-for="(row, rowIndex) in rowsToShow"
                               :cell="row[index]"
                               :key="rowIndex" />
                </tr>
            </template>
            </tbody>
        </table>
        <paginate v-if="paginate"
                  v-model="page"
                  :page-count="pageNum"
                  :prev-text="'Zurück'"
                  :next-text="'Vor'"
                  :container-class="'paginate'"
                  :page-class="'paginate__page'"
                  :next-class="'paginate__next'" />
    </div>
</template>

<script>
  import TableHead from './TableHead'
  import TableCell from './TableCell'
  import TableGroupHeader from './TableGroupHeader'
  import Paginate from 'vuejs-paginate'

  const COL_WIDTH = 305
  const HEAD_COL_WIDTH = 195

  export default {
    name: 'TableView',
    components: {
      TableHead,
      TableCell,
      TableGroupHeader,
      Paginate
    },
    props: [
      'heads',
      'groups',
      'rows',
      'paginate'
    ],
    data () {
      return {
        activeGroups: [],
        page: 1,
        pageNum: 1,
        rowsPerPage: 2
      }
    },
    computed: {
      rowsToShow: function () {
        if (this.paginate) {
          const startRow = (this.page - 1) * this.rowsPerPage
          const endRow = startRow + this.rowsPerPage
          return this.rows.slice(startRow, endRow)
        }
        return this.rows
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
      this.calcColNum()
      window.addEventListener('resize', this.calcColNum)
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
      },
      calcColNum: function () {
        const prevPageNum = this.pageNum
        this.rowsPerPage = Math.floor((this.$el.clientWidth - HEAD_COL_WIDTH) / COL_WIDTH)
        this.pageNum = Math.ceil(this.rows.length / this.rowsPerPage)
        this.page = (prevPageNum === this.pageNum) ? this.page : 1
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

<style>
    .paginate {
        display: flex;
        flex-wrap: wrap;
        margin-left: -20px;
        padding: 0;
        list-style: none;
        float: right;
    }
    .paginate__page,
    .paginate__next {
        flex: none;
        padding-left: 20px;
        position: relative;
    }
    .paginate .disabled a {
        color: grey;
        cursor: default;
        outline: none;
    }
    .paginate .active a {
        font-weight: bold;
        cursor: default;
        outline: none;
    }
</style>

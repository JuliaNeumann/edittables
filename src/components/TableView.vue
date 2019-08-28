<template>
    <div :class="tableViewClass"
         class="table-view">
        <table class="table">
            <tbody>
            <template v-for="(head, index) in activeHeads">
                <TableGroupHeader v-if="startGroup(index)"
                                  :text="groups[head.group_id]"
                                  :open="activeGroups.indexOf(head.group_id) > -1"
                                  :cols="paginate ? rowsPerPage + 1 : 2"
                                  :key="`group_head_${index}`"
                                  @click.native="toggleGroup(head.group_id)"/>
                <tr :key="head.id"
                    v-show="showRow(head)"
                    class="row"
                    :class="rowClass(head)">
                    <TableHead :text="head.name"
                               :description="head.description"
                               :footnotes="head.footnotes" />
                    <TableCell v-for="(row, rowIndex) in rowsToShow"
                               :head="head"
                               :row="row"
                               :key="`row_${row.id}_${rowIndex}`" />
                </tr>
            </template>
            <tr v-if="showActions" class="row">
              <TableHead text="Aktionen" />
              <td v-for="(row, rowIndex) in rowsToShow"
                  :key="row.id"
                  class="table__cell">
                <button :key="`delete_${row.id}_${rowIndex}`"
                        @click="deleteRow(row.id)">
                    Löschen
                </button>
              </td>
            </tr>
            </tbody>
        </table>
        <b-pagination v-if="paginate"
                      :total="rows.length"
                      :current.sync="page"
                      :simple="false"
                      :rounded="false"
                      :per-page="rowsPerPage">
        </b-pagination>
    </div>
</template>

<script>
  import TableHead from './TableHead'
  import TableCell from './TableCell'
  import TableGroupHeader from './TableGroupHeader'
  import _debounce from 'lodash.debounce'

  const COL_WIDTH = 305
  const HEAD_COL_WIDTH = 197

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
      'rows',
      'paginate'
    ],
    data () {
      return {
        activeGroups: [],
        page: 1,
        rowsPerPage: 2,
        showActions: window.eventPlannerApp && window.eventPlannerApp.admin
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
      },
      tableViewClass: function () {
        return {
          'table--view-small': this.rowsToShow.length < 2
        }
      },
      activeHeads: function () {
        return this.heads.filter((head) => head.active)
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
      window.addEventListener('resize', _debounce(this.calcColNum, 500))
    },
    methods: {
      startGroup: function (headIndex) {
        return this.heads[headIndex].group_id &&                       // current head belongs to a group and ...
          (headIndex === 0 || !this.heads[headIndex - 1].group_id)     // ... is the first head or the head before it does not belong to a group
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
        return !head.group_id || (this.activeGroups.indexOf(head.group_id) > -1)
      },
      rowClass: function (head) {
        return {
          'row--group': head.group_id,
          'row--highlight': head.id === '1'
        }
      },
      calcColNum: function () {
        this.rowsPerPage = Math.floor((this.$el.clientWidth - HEAD_COL_WIDTH) / COL_WIDTH)
      },
      deleteRow: function (rowId) {
        this.$emit('deleteRow', rowId)
      }
    }
  }
</script>

<style scoped>
    .table-view,
    .table-view * {
        box-sizing: border-box;
    }
    .table-view {
        width: 100%;
    }
    @media only screen and (min-width:900px) {
        .table-view--small {
            width: 50%;
        }
    }
    .table {
        border-collapse: collapse;
        border-spacing: 0;
        display: flex;
        flex-direction: column;
        border: 1px solid grey;
        border-bottom: none;
    }
    .row {
        display: flex;
    }
    .row--group {
        background-color: #DFE7EE;
    }
    .row--highlight {
      font-weight: bold;
    }
    .table__cell {
      flex: 1;
      border-bottom: 1px solid grey;
      padding: 10px;
    }
    .table__cell:not(:last-child) {
      border-right: 1px solid gray;
    }
</style>

<style>
    .pagination {
        display: flex;
        justify-content: flex-end;
    }
    .pagination-list {
        order: 2;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        list-style: none;
        margin: 0;
    }
    .pagination-list li:not(:first-child) {
        flex: none;
        padding-left: 20px;
        position: relative;
    }
    .pagination-link {
        text-decoration: none;
        color: black;
    }
    .paginate .disabled a {
        color: grey;
        cursor: default;
        outline: none;
    }
    .pagination-link.is-current {
        font-weight: bold;
        cursor: default;
        outline: none;
        text-decoration: underline;
    }
    .pagination-previous,
    .pagination-next {
        display: flex;
        align-items: center;
    }
    .pagination-previous[disabled="disabled"],
    .pagination-next[disabled="disabled"] {
        color: gray;
        cursor: default;
    }
    .pagination-previous .icon,
    .pagination-next .icon {
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        align-items: center;
        position: static;
        top: 0;
        left: 0;
    }
    .pagination-previous {
        order: 1;
    }
    .pagination-next {
        order: 3;
    }
</style>

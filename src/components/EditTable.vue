<template>
    <div>
        <filters :heads="heads" />
        <div v-if="mobile">
            <CardView v-for="(row, rowIndex) in rows"
                      :row="row"
                      :heads="heads"
                      :groups="groups"
                      :index="rowIndex"
                      :key="rowIndex" />
        </div>
        <TableView v-else
                   :paginate="true"
                   :heads="heads"
                   :rows="rows"
                   :groups="groups" />
        <AddButton @addDate="addRow"/>
    </div>
</template>

<script>
  import CardView from './CardView'
  import TableView from './TableView'
  import AddButton from './AddButton'
  import Filters from './Filters'
  import _debounce from 'lodash.debounce'
  import {getHeaders, getGroups, getRows} from '../services/api'

  export default {
    name: 'EditTable',
    components: {
      TableView,
      CardView,
      AddButton,
      Filters
    },
    data () {
      return {
        heads: [],
        groups: {},
        rows: [],
        mobile: true
      }
    },
    async mounted () {
      this.setMobile()
      window.addEventListener('resize', _debounce(this.setMobile, 500))
      this.heads = await getHeaders()
      this.groups = await getGroups()
      this.rows = await getRows()
    },
    methods: {
      setMobile: function () {
        this.mobile = this.$el.clientWidth < 825
      },
      addRow: function (addDate) {
        this.rows.push([
          {
            content: addDate,
            type: 'date'
          },
          {
            content: '',
            type: 'text'
          },
          {
            content: '',
            type: 'text'
          },
          {
            content: '',
            type: 'longtext'
          },
          {
            content: '',
            type: 'text'
          },
          {
            content: '',
            type: 'longtext'
          }
        ])
      }
    }
  }
</script>

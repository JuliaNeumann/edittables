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
  import {responsiveMixin} from './mixins/responsive'
  import {getHeaders, getGroups, getRows, addEvent} from '../services/api'

  export default {
    name: 'EditTable',
    components: {
      TableView,
      CardView,
      AddButton,
      Filters
    },
    mixins: [responsiveMixin],
    data () {
      return {
        heads: [],
        groups: {},
        rows: []
      }
    },
    async mounted () {
      this.heads = await getHeaders()
      this.groups = await getGroups()
      this.rows = await getRows()
    },
    methods: {
      addRow: async function (addDate) {
        const apiResult = await addEvent(addDate)
        if (apiResult && apiResult.success) {
          this.rows = await getRows()
          return
        }
        if (apiResult && apiResult.error) {
          alert(`Beim Hinzufügen ist ein Fehler aufgetreten: ${apiResult.error}`)
          return
        }
        alert('Beim Hinzufügen ist ein unbekannter Fehler aufgetreten')
      }
    }
  }
</script>

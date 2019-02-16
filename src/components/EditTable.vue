<template>
    <div>
        <filters :heads="heads" v-model="activeHeads"/>
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
  import {getHeaders, getGroups, getRowsForEdit, addEvent, getData} from '../services/api'

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
        rows: [],
        activeHeads: []
      }
    },
    watch: {
      activeHeads: function () {
        localStorage.setItem('activeHeads', JSON.stringify(this.activeHeads))
        this.heads.forEach((head, index) => {
          head.active = this.activeHeads[index]
        })
      }
    },
    async mounted () {
      const data = await getData()
      this.heads = getHeaders(data)
      this.groups = getGroups(data)
      this.rows = getRowsForEdit(data)
      if (localStorage.getItem('activeHeads')) {
        const cachedActiveHeads = JSON.parse(localStorage.getItem('activeHeads'))
        if (cachedActiveHeads.length === this.heads.length) {
          this.activeHeads = cachedActiveHeads
        }
      }
      if (this.activeHeads.length !== this.heads.length) { // that is, not used the ones from cache because not set or not fitting
        this.activeHeads = this.heads.map(() => true)
      }
    },
    methods: {
      addRow: async function (addDate) {
        const apiResult = await addEvent(addDate)
        if (apiResult && apiResult.success) {
          this.rows = await getRowsForEdit()
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

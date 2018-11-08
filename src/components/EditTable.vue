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
  import {getHeaders, getGroups} from '../services/api'

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
        rows: [
          [
            {
              content: 1515279600000,
              type: 'date'
            },
            {
              content: 'Manuel',
              type: 'text'
            },
            {
              content: 'Jonas',
              type: 'text'
            },
            {
              content: 'Jonas\nSusi',
              type: 'longtext'
            },
            {
              content: 'Ich verdanke dir soviel, mein Gott',
              type: 'text'
            },
            {
              content: 'Taufe',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '3',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '4',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '5',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '6',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '7',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '8',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '9',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: '10',
              type: 'text'
            },
            {
              content: 'Elli',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            },
            {
              content: '',
              type: 'longtext'
            }
          ]
        ],
        mobile: true
      }
    },
    async mounted () {
      this.setMobile()
      window.addEventListener('resize', _debounce(this.setMobile, 500))
      this.heads = await getHeaders()
      this.groups = await getGroups()
      console.log(this.groups)
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

<template>
    <div>
        <div v-if="$mq === 'sm'">
            <CardView v-for="(row, rowIndex) in rows"
                      :row="row"
                      :heads="heads"
                      :groups="groups"
                      :index="rowIndex"
                      :key="rowIndex" />
        </div>
        <TableView v-else
                   :heads="heads"
                   :rows="rows"
                   :groups="groups" />
    </div>
</template>

<script>
  import CardView from './CardView'
  import TableView from './TableView'

  export default {
    name: 'EditTable',
    components: {
      TableView,
      CardView
    },
    data () {
      return {
        heads: [
          {
            content: 'Datum'
          },
          {
            content: 'Moderator'
          },
          {
            content: 'Musikverantwortlicher'
          },
          {
            content: 'Musiker',
            group: 1
          },
          {
            content: 'Predigtlied',
            group: 1
          },
          {
            content: 'Besonderheiten'
          }
        ],
        groups: {
          1: 'Musik - Details'
        },
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
              content: 'Beni',
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
        ]
      }
    }
  }
</script>

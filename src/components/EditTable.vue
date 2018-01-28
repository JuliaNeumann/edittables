<template>
    <table>
        <thead>
            <TableHead v-for="(head, index) in heads" :text="head" :key="index" />
        </thead>
        <tbody>
            <TableRow v-for="(row, index) in rows" :row="row" :key="index" />
        </tbody>
    </table>
</template>

<script>
  import TableHead from './TableHead'
  import TableRow from './TableRow'

  export default {
    name: 'EditTable',
    components: {
      TableHead,
      TableRow
    },
    data () {
      return {
        heads: [
          'Datum',
          'Moderator',
          'Musiker'
        ],
        rows: [
          [
            {
              content: 1515279600000,
              type: 'date'
            },
            {
              content: 'Manuel Peters',
              type: 'text'
            },
            {
              content: 'Jonas\nSusi',
              type: 'longtext'
            }
          ],
          [
            {
              content: 1515884400000,
              type: 'date'
            },
            {
              content: 'Beni Hähnel',
              type: 'text'
            },
            {
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            }
          ]
        ]
      }
    }
  }
</script>
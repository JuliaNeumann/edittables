<template>
    <div>
        <div v-if="$mq === 'sm'">
            TBD - Mobile Card view
        </div>
        <table class="table" v-else>
            <tbody>
            <tr v-for="(head, index) in heads" :key="index">
                <TableHead :text="head" />
                <TableCell v-for="(row, rowIndex) in rows" :cell="row[index]" :key="rowIndex" />
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import TableHead from './TableHead'
  import TableCell from './TableCell'

  export default {
    name: 'EditTable',
    components: {
      TableHead,
      TableCell
    },
    data () {
      return {
        heads: [
          'Datum',
          'Moderator',
          'Musiker',
          'Predigtlied'
        ],
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
              content: 'Jonas\nSusi',
              type: 'longtext'
            },
            {
              content: 'Ich verdanke dir soviel, mein Gott',
              type: 'text'
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
              content: 'Elli\nFritz\nJohanna',
              type: 'longtext'
            },
            {
              content: 'Freude wohnt in deinem Haus',
              type: 'text'
            }
          ]
        ]
      }
    }
  }
</script>

<style scoped>
    .table {
        border-collapse: collapse;
        border-spacing: 0;
    }
</style>
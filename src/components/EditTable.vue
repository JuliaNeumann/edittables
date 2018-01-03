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
          'Moderator'
        ],
        rows: [
          [
            {
              content: '07.01.2018',
              type: 'text'
            },
            {
              content: 'Manuel Peters',
              type: 'text'
            }
          ],
          [
            {
              content: '14.01.2018',
              type: 'text'
            },
            {
              content: 'Beni Hähnel',
              type: 'text'
            }
          ]
        ]
      }
    }
  }
</script>
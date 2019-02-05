<template>
  <table class="table">
    <tbody>
      <tr>
        <th v-for="head in heads" class="cell"> {{ head.name }} </th>
      </tr>
      <tr v-for="row in rows">
        <td v-for="head in heads" class="cell">
          <template v-if="head.type === 'date'">
            {{ row.fields[head.id] | timestampToLocalString }}
          </template>
          <template v-else-if="head.type === 'icons'">
            <IconList :additional="head.additional" :icons="row.fields[head.id]"/>
          </template>
          <template v-else>
            {{ row.fields[head.id] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import {getHeaders, getConfig, getRows} from '../services/api'
  import IconList from './IconList'

  export default {
    name: 'StaticTable',
    components: {
      IconList
    },
    data () {
      return {
        heads: [],
        config: {},
        rows: [],
        mobile: true
      }
    },
    async mounted () {
      this.config = await getConfig()
      this.heads = await getHeaders()
      this.rows = await getRows()

      this.heads = this.heads.filter(head => {
        return this.config.static_fields.indexOf(parseInt(head.id)) > -1
      })
    }
  }
</script>

<style scoped>
  .table {
    box-sizing: border-box;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid grey;
    text-align: left;
    border-bottom: none;
  }
  .cell {
    padding: 10px;
    border-bottom: 1px solid grey;
  }
  .cell:not(:last-child) {
    border-right: 1px solid gray;
  }
</style>

<template>
  <div>
    <table class="table" v-if="heads.length > 0">
      <tbody>
        <template v-if="mobile">
          <tr>
            <th class="cell"> {{ heads[0].name }}</th>
            <th class="cell"> Information </th>
          </tr>
          <tr v-for="row in rows">
            <td class="cell">
              <CellContent :head="heads[0]" :content="row.fields[heads[0].id]"/>
            </td>
            <td class="cell">
              <ul>
                <li v-for="head in heads.slice(1)">
                  <strong> {{ head.name }}: </strong>
                  <CellContent :head="head" :content="row.fields[head.id]"/>
                </li>
              </ul>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <th v-for="head in heads" class="cell"> {{ head.name }} </th>
          </tr>
          <tr v-for="row in rows">
            <td v-for="head in heads" class="cell">
              <CellContent :head="head" :content="row.fields[head.id]"/>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  import CellContent from './CellContent'
  import {responsiveMixin} from './mixins/responsive'
  import {getHeaders, getConfig, getRowsForCurrentYear, getData} from '../services/api'

  export default {
    name: 'StaticTable',
    components: {
      CellContent
    },
    mixins: [responsiveMixin],
    data () {
      return {
        heads: [],
        config: {},
        rows: [],
        mobile: true
      }
    },
    async mounted () {
      const data = await getData()
      this.config = getConfig(data)
      this.heads = getHeaders(data)
      this.rows = getRowsForCurrentYear(data)

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

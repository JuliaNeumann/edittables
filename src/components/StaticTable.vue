<template>
  <div>
    <table class="table" v-if="heads.length > 0">
      <tbody>
        <template v-if="mobile">
          <tr>
            <th class="cell"> {{ heads[0].name }}</th>
            <th class="cell"> Information </th>
          </tr>
          <tr v-for="row in rows"
              :key="row.fields[heads[0].id]">
            <td class="cell">
              <CellContent :head="heads[0]" :content="row.fields[heads[0].id]"/>
              <EditButton :heads="heads.slice(1)" :row="row" @updated="setData"/>
            </td>
            <td class="cell">
              <ul class="list">
                <li v-for="head in heads.slice(1)"
                    :key="head.id">
                  <strong> {{ head.name }}: </strong>
                  <CellContent :head="head" :content="row.fields[head.id]"/>
                </li>
              </ul>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <th v-for="head in heads"
                class="cell"
                :key="head.id">
              {{ head.name }}
            </th>
          </tr>
          <tr v-for="row in rows"
              :key="row.fields[heads[0].id]">
            <td v-for="(head, index) in heads" class="cell"
                :key="head.id">
              <CellContent :head="head" :content="row.fields[head.id]"/>
              <EditButton v-if="index === 0" :heads="heads.slice(1)" :row="row" @updated="setData"/>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  import CellContent from './CellContent'
  import EditButton from './EditButton'
  import {responsiveMixin} from './mixins/responsive'
  import {getHeaders, getConfig, getRowsForCurrentYear, getData} from '../services/api'

  export default {
    name: 'StaticTable',
    components: {
      CellContent,
      EditButton
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
      await this.setData();
    },
    methods: {
      async setData () {
        const data = await getData()
        this.config = getConfig(data)
        this.heads = getHeaders(data)
        this.rows = getRowsForCurrentYear(data)

        this.heads = this.heads.filter(head => {
          return this.config.static_fields.indexOf(parseInt(head.id)) > -1
        })
      }
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
  .list {
    padding-left: 20px;
  }
  .edit-button {
    width: 25px;
    height: 25px;
  }
</style>

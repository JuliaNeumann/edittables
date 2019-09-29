<template>
  <div>
    <table class="table" v-if="heads.length > 0">
      <tbody>
        <template v-if="mobile">
          <tr>
            <th class="cell"> {{ heads[0].name }}</th>
            <th class="cell"> Information </th>
          </tr>
          <template v-for="(quarter, index) in rowsByQuarter">
            <tr :key="`quarter_${index}`">
              <TableGroupHeader :text="`Quartal ${index + 1}`"
                                :cols="2"
                                :open="showQuarter(index)"
                                @click.native="toggleQuarter(index)"/>
            </tr>
            <template v-if="showQuarter(index)">
              <tr v-for="row in quarter"
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
          </template>
        </template>
        <template v-else>
          <tr>
            <th v-for="head in heads"
                class="cell"
                :key="head.id">
              {{ head.name }}
            </th>
          </tr>
          <template v-for="(quarter, index) in rowsByQuarter">
            <tr :key="`quarter_${index}`">
              <TableGroupHeader :text="`Quartal ${index + 1}`"
                                :cols="configStaticFields.length"
                                :open="showQuarter(index)"
                                @click.native="toggleQuarter(index)"/>
            </tr>
            <template v-if="showQuarter(index)">
              <tr v-for="row in quarter"
                  :key="row.fields[heads[0].id]">
                <td v-for="(head, headIndex) in heads" class="cell"
                    :key="head.id">
                  <CellContent :head="head" :content="row.fields[head.id]"/>
                  <EditButton v-if="headIndex === 0" :heads="heads.slice(1)" :row="row" @updated="setData"/>
                </td>
              </tr>
            </template>
          </template>
          
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  import CellContent from './CellContent'
  import EditButton from './EditButton'
  import TableGroupHeader from './TableGroupHeader'
  import {responsiveMixin} from './mixins/responsive'
  import {getHeaders, getConfig, getRowsForCurrentYear, getData} from '../services/api'

  export default {
    name: 'StaticTable',
    components: {
      CellContent,
      EditButton,
      TableGroupHeader
    },
    mixins: [responsiveMixin],
    data () {
      return {
        heads: [],
        configStaticFields: [],
        rowsByQuarter: [],
        mobile: true,
        activeQuarters: []
      }
    },
    async mounted () {
      this.activeQuarters.push(Math.floor((new Date()).getMonth() / 3));
      await this.setData();
    },
    methods: {
      async setData () {
        const data = await getData()
        this.configStaticFields = getConfig(data).static_fields
        this.heads = getHeaders(data)
        this.rowsByQuarter = getRowsForCurrentYear(data)

        this.heads = this.heads.filter(head => {
          return this.configStaticFields.indexOf(parseInt(head.id)) > -1
        })
      },
      showQuarter(index) {
        return this.activeQuarters.indexOf(index) > -1;
      },
      toggleQuarter(quarterIndex) {
        const index = this.activeQuarters.indexOf(quarterIndex)
        if (index === -1) {
          this.activeQuarters.push(quarterIndex)
          return
        }
        this.activeQuarters.splice(index, 1)
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
    margin: 0;
  }
  .edit-button {
    width: 25px;
    height: 25px;
  }
</style>

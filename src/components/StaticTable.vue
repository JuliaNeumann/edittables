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
              <template v-if="heads[0].type === 'date'">
                {{ row.fields[heads[0].id] | timestampToLocalString }}
              </template>
              <template v-else-if="heads[0].type === 'icons'">
                <IconList :additional="heads[0].additional" :icons="row.fields[heads[0].id]"/>
              </template>
              <template v-else>
                {{ row.fields[heads[0].id] }}
              </template>
            </td>
            <td class="cell">
              <ul>
                <li v-for="head in heads.slice(1)">
                  <strong> {{ head.name }}: </strong>
                  <template v-if="head.type === 'date'">
                    {{ row.fields[head.id] | timestampToLocalString }}
                  </template>
                  <template v-else-if="head.type === 'icons'">
                    <IconList :additional="head.additional" :icons="row.fields[head.id]"/>
                  </template>
                  <template v-else>
                    {{ row.fields[head.id] }}
                  </template>
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
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  import IconList from './IconList'
  import {responsiveMixin} from './mixins/responsive'
  import {getHeaders, getConfig, getRows} from '../services/api'

  export default {
    name: 'StaticTable',
    components: {
      IconList
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

<template>
    <article class="card">
        <h2 class="card__title"
            @click="toggleShow">
            <ArrowToggle :direction="show ? 'down': 'right'" class="arrow--big" />
            {{ row.fields[1] | timestampToLocalString }}
        </h2>
        <TableView v-show="show"
                   :paginate="false"
                   :rows="[row]"
                   :heads="heads.slice(1)"
                   :groups="groups"
                   @deleteRow="deleteRow" />
    </article>
</template>

<script>
  import TableView from './TableView'
  import ArrowToggle from './ArrowToggle'

  export default {
    name: 'CardView',
    components: {
      TableView,
      ArrowToggle
    },
    props: [
      'row',
      'heads',
      'groups',
      'index'
    ],
    data () {
      return {
        show: this.index === 0
      }
    },
    methods: {
      toggleShow: function () {
        this.show = !this.show
      },
      deleteRow: function (rowId) {
        this.$emit('deleteRow', rowId)
      }
    }
  }
</script>

<style scoped>
    .card {
        text-align: left;
    }
    .card__title {
        cursor: pointer;
    }
</style>

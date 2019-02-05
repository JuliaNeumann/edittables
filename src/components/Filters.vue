<template>
    <div class="filters">
        Anzeigen:
        <ul class="filters__list">
            <li v-for="(head, index) in heads"
                :key="index"
                class="filters__item">
                <input type="checkbox"
                       name="filter"
                       :id="`filter_${index}`"
                       v-model="actives[index]" />
                <label :for="`filter_${index}`">
                    {{ head.name }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    heads: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      actives: []
    }
  },
  watch: {
    actives: function () {
      this.$emit('input', this.actives)
    },
    value: function () {
      this.actives = this.value
    }
  },
  mounted () {
    this.actives = this.value
  }
}
</script>

<style scoped>
    .filters {
        text-align: left;
    }
    .filters__list {
        display: inline-block;
        list-style: none;
        margin: 0;
        padding: 10px;
    }
    .filters__item {
        display: inline-block;
    }
</style>

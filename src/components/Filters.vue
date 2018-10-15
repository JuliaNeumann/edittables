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
                       v-model="head.active" />
                <label :for="`filter_${index}`">
                    {{ head.content }}
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
    }
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
<template>
    <textarea @blur="saveNewValue" @keydown.tab="saveNewValue" ref="inputField" v-model="inputContent"></textarea>
</template>

<script>
  import {inputMixin} from '../mixins/input'

  export default {
    name: 'MultiLineInput',
    data: function () {
      return {
        focusOnStart: true
      }
    },
    mixins: [inputMixin]
  }
</script>
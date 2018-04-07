<template>
    <input @blur="saveNewValue" @keydown.enter.tab="saveNewValue" ref="inputField" type="text" v-model="inputContent" />
</template>

<script>
  import {inputMixin} from '../mixins/input'

  export default {
    name: 'SingleLineInput',
    data: function () {
      return {
        focusOnStart: true
      }
    },
    mixins: [inputMixin]
  }
</script>
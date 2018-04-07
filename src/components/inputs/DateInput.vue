<template>
    <datepicker v-click-outside="saveNewValue" language="de" :inline="true" @selected="saveNewValue" v-model="inputContent"></datepicker>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import ClickOutside from 'vue-click-outside'
  import {inputMixin} from '../mixins/input'

  export default {
    name: 'DateInput',
    components: {
      Datepicker
    },
    directives: {
      ClickOutside
    },
    mixins: [inputMixin],
    methods: {
      saveNewValue: function (date) {
        if (date && typeof date.getTime === 'function') {
          this.inputContent = date.getTime()
        }
        inputMixin.methods.saveNewValue.call(this)
      }
    },
    created: function () {
      this.inputContent = new Date(this.value)
    }
  }
</script>
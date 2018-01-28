<template>
    <input @blur="saveNewValue" @keydown.enter="saveNewValue" ref="inputField" v-model="inputContent" v-if="type === 'text'" type="text" />
    <datepicker v-click-outside="saveNewValue" v-else-if="type === 'date'" language="de" :inline="true" @selected="saveNewValue" v-model="inputContent"></datepicker>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import ClickOutside from 'vue-click-outside'

  export default {
    name: 'InputCell',
    components: {
      Datepicker
    },
    props: [
      'value',
      'type'
    ],
    data: function () {
      return {
        inputContent: ''
      }
    },
    methods: {
      saveNewValue: function (date) {
        if (date && (typeof date.getTime === 'function')) {
          this.inputContent = date.getTime()
        }
        this.inputContent = this.inputContent || this.value
        this.$emit('input', this.inputContent)
        this.$emit('stopEditMode')
      }
    },
    created: function () {
      if (this.type === 'text') {
        this.inputContent = this.value
        this.$nextTick(() => this.$refs.inputField.focus())
      } else if (this.type === 'date') {
        this.inputContent = new Date(this.value)
      }
    },
    directives: {
      ClickOutside
    }
  }
</script>
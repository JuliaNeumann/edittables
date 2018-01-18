<template>
    <input @blur="saveNewValue" @keydown.enter="saveNewValue" ref="inputField" v-model="inputContent" v-if="type === 'text'" type="text" />
    <datepicker v-click-outside="saveNewValue" v-else-if="type === 'date'" language="de" :inline="true" @selected="saveNewValue"></datepicker>
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
        if (date && (typeof date.toLocaleDateString === 'function')) {
          this.inputContent = date.toLocaleDateString()
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
      }
    },
    directives: {
      ClickOutside
    }
  }
</script>
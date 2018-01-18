<template>
    <input @blur="saveNewValue" @keydown.enter="saveNewValue" ref="inputField" v-model="inputContent" v-if="type === 'text'" type="text" />
    <datepicker v-else-if="type === 'date'" language="de" :inline="true" @selected="saveNewValue"></datepicker>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'

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
        if (date) {
          this.inputContent = date.toLocaleDateString()
        }
        this.$emit('input', this.inputContent)
        this.$emit('stopEditMode')
      }
    },
    created: function () {
      if (this.type === 'text') {
        this.inputContent = this.value
        this.$nextTick(() => this.$refs.inputField.focus())
      }
    }
  }
</script>
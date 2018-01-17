<template>
    <input @blur="saveNewValue" ref="inputField" v-model="inputContent" v-if="type === 'text'" type="text" />
</template>

<script>
  export default {
    name: 'InputCell',
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
      saveNewValue: function () {
        this.$emit('input', this.inputContent)
        this.$emit('toggleEditMode')
      }
    },
    created: function () {
      this.inputContent = this.value
      this.$nextTick(() => this.$refs.inputField.focus())
    }
  }
</script>
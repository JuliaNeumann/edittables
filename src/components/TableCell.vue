<template>
    <td>
        <span @click="startEdit" v-if="!editMode && !(cell.type === 'date')">{{ content }}</span>
        <span @click="startEdit" v-else-if="!editMode">{{ content | timestampToLocalString }}</span>
        <InputField @stopEditMode="stopEdit" v-if="editMode" v-model="content" :type="cell.type"/>
    </td>
</template>

<script>
  import InputField from './InputField'

  export default {
    name: 'TableCell',
    components: {
      InputField
    },
    props: [
      'cell'
    ],
    data: function () {
      return {
        editMode: false,
        content: this.cell.content
      }
    },
    methods: {
      startEdit: function () {
        this.editMode = true
      },
      stopEdit: function () {
        this.editMode = false
      }
    }
  }
</script>
<template>
    <td>
        <div class="cell__content" @click="startEdit" @focus="startEdit" v-if="!editMode && (cell.type === 'date')">
            {{ content | timestampToLocalString }}
        </div>
        <div class="cell__content" @click="startEdit" @focus="startEdit" v-else-if="!editMode">
            {{ content }}
        </div>
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

<style scoped>
    .cell__content {
        white-space: pre-line;
    }
</style>

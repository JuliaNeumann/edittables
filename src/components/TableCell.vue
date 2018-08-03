<template>
    <td class="cell">
        <div class="cell__content"
             @click="startEdit"
             @focus="startEdit"
             v-if="!editMode && (cell.type === 'date')">
            {{ cell.content | timestampToLocalString }}
        </div>
        <div class="cell__content"
             :class="`cell__content--${cell.type}`"
             @click="startEdit"
             @focus="startEdit"
             v-else-if="!editMode">
            {{ cell.content }}
        </div>
        <InputField @stopEditMode="stopEdit"
                    v-if="editMode"
                    v-model="cell.content"
                    :type="cell.type"/>
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
        editMode: false
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
    .cell {
        border: 1px solid grey;
    }
    .cell__content {
        padding: 10px;
        text-align: left;
    }
    .cell__content--longtext {
        white-space: pre-line;
        margin-top: -10px;
    }
</style>

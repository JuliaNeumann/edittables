<template>
    <td class="cell" :style="inlineStyles">
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
    props: {
      cell: {
        default: () => {
          return {
            content: '',
            type: 'text'
          }
        }
        // TODO: validate: type, type matches content?
      }
    },
    data: function () {
      return {
        editMode: false,
        currentHeight: false
      }
    },
    computed: {
      inlineStyles () {
        return this.currentHeight ? {
          height: `${this.currentHeight}px`
        } : {}
      }
    },
    methods: {
      startEdit: function () {
        this.currentHeight = this.$el.clientHeight
        this.editMode = true
      },
      stopEdit: function () {
        this.editMode = false
        this.currentHeight = false
      }
    }
  }
</script>

<style scoped>
    .cell {
        flex: 1;
        border-bottom: 1px solid grey;
    }
    .cell:not(:last-child) {
        border-right: 1px solid gray;
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

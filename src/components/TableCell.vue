<template>
    <td>
        <span @click="toggleEdit" v-if="!editMode">{{ content }}</span>
        <InputField @toggleEditMode="toggleEdit" v-if="editMode" v-model="content" :type="cell.type"/>
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
      toggleEdit: function () {
        this.editMode = !this.editMode
      }
    }
  }
</script>
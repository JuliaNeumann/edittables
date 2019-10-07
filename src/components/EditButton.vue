<template>
    <div>
        <button @click="showOverlay = true">
            Bearbeiten
        </button>
        <b-modal :active.sync="showOverlay" @close="handleClose">
            <div class="edit">
                <div ref="intro" class="edit__intro">Zum Bearbeiten auf die Felder klicken.</div>
                <div v-for="head in heads"
                     :key="head.id">
                    <strong>{{head.name}}:</strong><br>
                    <TableCell :head="head" :row="row" tag="div" class="edit__cell" />
                </div>
                <div class="edit__button-wrapper">
                    <button class="edit__button"
                        @click="saveAndClose">
                        Speichern & Schließen
                    </button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
  import TableCell from './TableCell'

  export default {
    name: 'EditButton',
    components: {TableCell},
    data: function () {
      return {
        showOverlay: false
      }
    },
    props: [
      'row',
      'heads'
    ],
    methods: {
      handleClose () {
          this.$emit('updated');
      },
      saveAndClose () {
        this.$refs.intro.click();  
        this.showOverlay = false;
        this.handleClose();
      }
    }
  }
</script>

<style>
    .modal {
        align-items: center;
        display: none;
        justify-content: center;
        overflow: hidden;
        position: fixed;
        z-index: 40;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
    }

    .modal.is-active {
        display: flex;
    }

    .modal-background {
        background-color: rgba(10, 10, 10, 0.86);
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
    }

    .modal-content {
        width: 650px;
        max-width: 100% !important;
        margin: 10px;
    }

    .modal-close {
        height: 32px;
        max-height: 32px;
        max-width: 32px;
        min-height: 32px;
        min-width: 32px;
        width: 32px;
        background: none;
        position: fixed;
        right: 20px;
        top: 20px;
        -webkit-appearance: none;
        border: none;
        border-radius: 290486px;
        cursor: pointer;
        display: inline-block;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 0;
        outline: none;
        vertical-align: top;
    }

    .modal-close:hover {
        background-color: rgba(10, 10, 10, 0.2);
    }

    .modal-close::before {
        height: 2px;
        width: 50%;
    }

    .modal-close::after {
        height: 50%;
        width: 2px;
    }

    .modal-close::before,
    .modal-close::after {
        box-sizing: border-box;
        background-color: #fff;
        content: "";
        display: block;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        transform-origin: center center;
    }

    .edit {
        background-color: white;
        padding: 20px;
        min-height: 500px;
        min-width: 200px;
    }

    .edit__intro {
        padding-bottom: 30px;
    }

    .edit__cell {
        margin: 10px 0 30px;
        border: 1px solid grey;
    }

    .edit__button {
        width: 100%;
        text-align: center;
        max-width: 450px;
        margin-top: 15px;
    }
    
    .edit__button-wrapper {
        text-align: center;
    }
</style>

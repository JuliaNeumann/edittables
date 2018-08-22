<template>
    <div>
        <button @click="showOverlay = true">+ Gottesdienst hinzufügen</button>
        <b-modal :active.sync="showOverlay">
            <div>Hello</div>
        </b-modal>
    </div>
</template>

<script>
  export default {
    name: 'AddButton',
    data: function () {
      return {
        showOverlay: false
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
        background-color: rgba(10, 10, 10, 0.2);
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
</style>
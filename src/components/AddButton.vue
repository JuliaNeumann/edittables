<template>
    <div>
        <button @click="showOverlay = true">+ Gottesdienst hinzufügen</button>
        <b-modal :active.sync="showOverlay">
            <div class="add">
                Bitte Datum auswählen:
                <datepicker language="de" :inline="true" v-model="date" class="add__datepicker"></datepicker>
                <div class="add__date">
                    {{ formatDate }}
                </div>
                <button class="add__button"
                        :disabled="this.date ? false : 'disabled'"
                        @click="addDate">
                    Hinzufügen
                </button>
                <button class="add__button"
                        :disabled="this.date ? false : 'disabled'"
                        @click="addDateAndClose">
                    Hinzufügen & schließen
                </button>
            </div>
        </b-modal>
    </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'

  export default {
    name: 'AddButton',
    components: {
      Datepicker
    },
    data: function () {
      return {
        showOverlay: false,
        date: ''
      }
    },
    computed: {
      formatDate () {
        if (this.date) {
          const dateObj = new Date(this.date)
          return dateObj.toLocaleDateString()
        }
      }
    },
    methods: {
      addDate () {
        this.$emit('addDate', this.date)
        this.date = ''
      },
      addDateAndClose () {
        this.addDate()
        this.showOverlay = false
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

    .add {
        background-color: white;
        padding: 20px;
        min-height: 500px;
    }

    .add__datepicker,
    .add__date,
    .add__button {
        margin-top: 15px;
    }

    .add__date {
        min-height: 25px;
    }

    .add__button {
        width: 100%;
        text-align: center;
    }
</style>
<template>
    <th class="head">
        {{ text }}
        <small v-if="description" class="head__tooltip">
          {{ description }}
        </small>
    </th>
</template>

<script>
  export default {
    name: 'TableHead',
    props: [
      'text',
      'description'
    ]
  }
</script>

<style scoped>
    .head {
        width: 100px;
        word-break: break-all;
        word-break: break-word;
        hyphens: auto;
        border-right: 1px solid grey;
        border-bottom: 1px solid grey;
        padding: 10px;
        text-align: left;
    }

    @media only screen and (min-width: 480px) {
        .head {
            width: 175px;
        }
    }

    .head__tooltip {
        display: none;
        position: absolute;
        max-width: 250px;
        background-color: lightgray;
        border: 1px solid gray;
        padding: 3px;
        z-index: 1;
    }

    .head:hover .head__tooltip {
        display:  block;
    }
</style>

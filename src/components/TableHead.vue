<template>
    <th class="head">
        {{ text }}
    </th>
</template>

<script>
  export default {
    name: 'TableHead',
    props: [
      'text'
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
            width: 173px;
        }
    }
</style>
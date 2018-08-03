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
        hyphens: auto;
        border: 1px solid grey;
        padding: 10px;
        text-align: left;
    }

    @media only screen and (min-width: 480px) {
        .head {
            width: 173px;
        }
    }
</style>
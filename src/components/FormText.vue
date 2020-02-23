<template>
    <p>{{ message }}</p>
</template>

<script>
    export default {
        name: "FormText",
        props: ['message']
    }
</script>

<style scoped>

    p{
        font-family: Roboto, serif;
        font-size: 26px;
        font-weight: bold;
        margin: 0;
        padding: 0;
    }

</style>
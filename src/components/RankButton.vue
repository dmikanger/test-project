<template>
    <button
            type="button"
            class="btn btn-light btn-outline-dark btn-radius"
            @click="sendData">
        {{ rank }}
    </button>
</template>

<script>

    export default {
        name: "RankButton",
        props: {
            rank: String,
            userId: String
        },
        methods: {
            sendData() {
                this.$emit('sendData', this.rank )
            }
        }
    }
</script>

<style scoped>

    .btn-radius{
        border-radius: 0px;
    }

    button{
        padding: 0;
        width: 24px;
        height: 22px;
        margin: 3px;
        font-family: Righteous, monospace;
        font-size: 14px;
    }

    button:hover{
        background-color: #F5D734;
        color: black;
        border: 0;
    }

    button:focus{
        background-color: #F5D734;
        color: black;
        box-shadow: 0 0 0 0;
        border: 0;
    }

</style>
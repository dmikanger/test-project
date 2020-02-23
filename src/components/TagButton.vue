<template>
    <button
            type="button"
            class="btn btn-outline-dark"
            v-bind:class="[isActive ? 'active-btn' : '']"
            @click="setTag()">
        {{ tag }}
    </button>
</template>

<script>
    export default {
        name: "TagButton",
        data: function(){
            return {
                isActive: false
            }
        },
        props: ['tag'],
        methods: {
            setTag: function () {
                this.isActive = !this.isActive;
            }
        },
    }
</script>

<style scoped>

    button{
        font-family: Roboto Regular, serif;
        margin: 5px;
        padding: 2px 10px;
        border-radius: 0.5rem;
        border-color: #1D2D36;
    }

    button:hover{
        background-color: #F5D734;
        color: black;
    }

    button:focus{
        box-shadow: 0 0 0 0;
    }

    .active-btn{
        background-color: #F5D734;
        color: black;
        box-shadow: 0 0 0 0;
    }

</style>
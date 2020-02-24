<template>
    <div class="container">
        <div class="align-mid">
            <div class="text-block">
                <form-text
                        message="have something to write?">

                </form-text>
            </div>

            <div class="textarea-block">
                <textarea v-model="message">

                </textarea>
            </div>

            <div class="submit-block">
                <button type="button" class="btn btn-submit"
                        @click="sandData">
                    submit
                </button>
            </div>

            <div class="button-block">
                <span @click="goBack">
                    <img class="rotate"  alt="Back" src="../assets/button.png">
                </span>
            </div>

        </div>
    </div>
</template>

<script>
import FormText from "@/components/FormText.vue"
import router from "../router";
import gql from "graphql-tag";

const SET_MESSAGE = gql`
    mutation setRank($userId: String, $message: String, $rank: Int, $tags: String){
    insert_opinions(objects: [{
        userId: $userId
        rank: $rank
        message: $message,
        tags: $tags
    }]) {
        returning {
            id
        }
    }
}
`;

export default {
    name: "MessagePage",
    data: function () {
        return {
            userId: '',
            rank: '',
            tags: [],
            message: ''
        }
    },
    components: {
        FormText
    },
    mounted() {
        this.userId = this.$store.getters.USER_INFO.userId;
        this.rank = this.$store.getters.USER_INFO.rank;
        this.tags = this.$store.getters.USER_INFO.tags;
        this.message = this.$store.getters.USER_INFO.message;

    },
    methods: {
        goBack(){
            this.$store.commit('SET_MSG', this.message);
            router.push({name: 'tags'})
        },
        sandData(){
            this.$store.commit('SET_MSG', this.message);

            this.rank = this.$store.getters.USER_INFO.rank;
            this.message = this.$store.getters.USER_INFO.message;
            this.tags = this.$store.getters.USER_INFO.tags;

            const tags = JSON.stringify( this.tags);
            const { userId: userId, rank: rank, message: message} = this;
            this.$apollo.mutate({
                mutation: SET_MESSAGE,
                variables: {
                    userId,
                    rank,
                    message,
                    tags
                }
            });

            console.log(this.userId, this.rank, this.tags, this.message)
        }
    }
}
</script>

<style scoped>

    .align-mid{
        min-height: 204px;
        width: 700px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
        padding: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);

        /*border: 1px solid black;*/
    }

    .text-block{
        margin-top: 30px;
    }

    .submit-block{
        margin-top: 13px;
    }

    .rotate{
        transform: scale(-1, 1);
    }

    .textarea-block{
        margin-top: 5px;
    }

    .btn-submit{
        height: 40px;
        width: 116px;
        border-radius: 5px;
        background-color: #FFE000;
        font-family: Roboto, serif;
        font-size: 16px;
        font-weight: bold;
    }

    .button-block{
        margin-top: 19px;
        margin-bottom: 15px;
    }

    textarea{
        width: 600px;
        height: 114px;
        border: 1px solid #E0E0E0;
        resize: none;

    }

</style>
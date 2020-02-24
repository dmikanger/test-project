<template>
    <div class="container">
        <div class="align-mid">
            <div class="text-block">
                <form-text
                        message="Please specify">

                </form-text>
            </div>

            <div class="tag-block">
                <tag-button tag="simple to use"></tag-button>
                <tag-button tag="easy to understand"></tag-button>
                <tag-button tag="fair price"></tag-button>
                <tag-button tag="good customer support"></tag-button>
                <tag-button tag="real time capabilities"></tag-button>
                <tag-button tag="site speed"></tag-button>
                <tag-button tag="happy to use"></tag-button>
                <tag-button tag="user interface"></tag-button>
            </div>

            <div class="button-block">
                <span @click="goBack">
                    <img class="rotate"  alt="Back" src="../assets/button.png">
                </span>
                <span @click="sendData">
                    <img  alt="Forward" src="../assets/button.png">
                </span>
            </div>

        </div>
    </div>
</template>

<script>
import FormText from "@/components/FormText.vue"
import TagButton from "@/components/TagButton";
import router from "../router";
import gql from "graphql-tag";

const SET_TAGS = gql`
    mutation setRank($userId: String, $rank: Int, $tags: String){
    insert_opinions(objects: [{
        userId: $userId
        rank: $rank
        tags: $tags
    }]) {
        returning {
            id
        }
    }
}
`;

export default {
    name: "TagPage",
    data: function (){
      return {
          userId: '',
          rank: 0,
          tags: [],
      }
    },
    // apollo: {
    //     opinions: {
    //         query: gql `
    //             query {
    //                 opinions {
    //                     userId
    //                     message
    //                     rank
    //                 }
    //             }
    //         `,
    //         result({data}){
    //             this.rank = data.rank;
    //             console.log(data)
    //         }
    //     }
    // },
    components: {
        FormText, TagButton
    },
    mounted() {
        this.userId = this.$store.getters.USER_INFO.userId;
        this.rank = this.$store.getters.USER_INFO.rank;
        this.tags = this.$store.getters.USER_INFO.tags;
        if (this.tags){
            let elements = document.getElementsByTagName('button');
            for (let elem of elements){
                for (let tag of this.tags){
                    if (tag === elem.innerText){
                        elem.classList.add("active-btn")
                    }
                }
            }
        }
    },
    methods: {
        sendData() {
            this.checkSelectedButton();
            this.$store.commit('SET_TAGS', this.tags);
            this.rank = this.$store.getters.USER_INFO.rank;

            const { userId: userId, rank: rank} = this;
            const tags = JSON.stringify( this.tags);
            this.$apollo.mutate({
                mutation: SET_TAGS,
                variables: {
                    userId,
                    rank,
                    tags
                }
            });

            router.push({name: 'message'})
        },
        goBack(){
            router.push({name: 'home'})
        },
        checkSelectedButton(){
            this.tags = [];
            let buttons = document.getElementsByClassName('active-btn');
            for (let btn of buttons){
                this.tags.push(btn.innerText)
            }
        }
    }
}
</script>

<style scoped>

    .align-mid{
        min-height: 204px;
        width: 700px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
        padding: 30px 55px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);

        /*border: 1px solid black;*/
    }

    .text-block{
        margin-top: 3px;
    }

    .tag-block{
        margin-top: 15px;
        text-align: left;
    }

    .rotate{
        transform: scale(-1, 1);
    }

    .button-block{
        margin-top: 79px;
        margin-bottom: 5px;
    }

    span{
        margin: 30px;
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;  /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;

        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;

        /* Support for IE. */
        font-feature-settings: 'liga';
    }

</style>
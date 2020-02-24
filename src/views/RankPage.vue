<template>
  <div class="container">
    <div class="align-mid">
      <div class="text-block">
          <form-text
                  message="Would you recommend our service to others?">

          </form-text>
      </div>

      <div class="button-block">
        <rank-button @sendData="onSendData" id="1" :userId="userId" rank="1"></rank-button>
        <rank-button @sendData="onSendData" id="2" :userId="userId" rank="2"></rank-button>
        <rank-button @sendData="onSendData" id="3" :userId="userId" rank="3"></rank-button>
        <rank-button @sendData="onSendData" id="4" :userId="userId" rank="4"></rank-button>
        <rank-button @sendData="onSendData" id="5" :userId="userId" rank="5"></rank-button>
        <rank-button @sendData="onSendData" id="6" :userId="userId" rank="6"></rank-button>
        <rank-button @sendData="onSendData" id="7" :userId="userId" rank="7"></rank-button>
        <rank-button @sendData="onSendData" id="8" :userId="userId" rank="8"></rank-button>
        <rank-button @sendData="onSendData" id="9" :userId="userId" rank="9"></rank-button>
        <rank-button @sendData="onSendData" id="10" :userId="userId" rank="10"></rank-button>
      </div>
    </div>
  </div>
</template>

<script>

import RankButton from '@/components/RankButton.vue'
import FormText from "@/components/FormText.vue"
import router from "../router";
import gql from "graphql-tag";

const SET_RANK = gql`
    mutation setRank($userId: String, $rank: Int){
    insert_opinions(objects: [{
        userId: $userId
        rank: $rank
    }]) {
        returning {
            id
        }
    }
}
`;

export default {
  name: 'RankPage',
  components: {
    RankButton, FormText
  },
  data: function () {
    return {
      userId: '',
      rank: 0
    }
  },
  mounted: function (){
    if (!this.userId){
      this.userId = this.$store.getters.USER_INFO.userId;
    }
    this.rank = this.$store.getters.USER_INFO.rank;
    if(this.rank){
      let element = document.getElementById(this.rank);
      element.focus();
    }
  },
  methods: {
    onSendData: function (data) {
      this.$store.commit('SET_RANK', data);
      this.rank = this.$store.getters.USER_INFO.rank;
      const { userId: userId, rank: rank} = this;
      this.$apollo.mutate({
        mutation: SET_RANK,
        variables: {
          userId,
          rank
        }
      });
      router.push({name: 'tags'})
    }
  }
}
</script>

<style scoped>

  .align-mid{
    min-height: 204px;
    min-width: 700px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);

    /*border: 1px solid black;*/
  }

  .text-block{
    margin-top: 35px;
  }

  .button-block{
    margin-top: 3px;
  }

</style>

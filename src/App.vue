<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {

    beforeMount: function (){
      this.userId = `f${(+new Date).toString(16)}`;
      this.$store.commit('SET_ID',  this.userId);
    }

  }

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>

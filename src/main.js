import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: 'https://vue-test-project.herokuapp.com/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'herokupass'
  }
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: "loading"
  }
});

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')

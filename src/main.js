import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueApollo from "vue-apollo"
import ApolloClient from 'apollo-boost'

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000"
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false

new Vue({  
  apolloProvider, 
  apollo: {},
  render: h => h(App)
}).$mount('#app')

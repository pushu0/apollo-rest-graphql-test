<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vue Apollo GraphQl</span>
        <span class="font-weight-light">Test</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-content>
      <jsonPlaceHolder/>
    </v-content>
  </v-app>
</template>

<script>

import jsonPlaceHolder from './components/JsonPlaceHolderTest.vue'

export default {
  name: 'app',
  components: {
    jsonPlaceHolder
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

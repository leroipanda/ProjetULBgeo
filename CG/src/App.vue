<template>
  <v-app>
    <barre-top>
      <v-card>
        <router-view/>
      </v-card>
    </barre-top>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import barreTop from "./components/barreTop.vue"
  import PageMonochromatic from "@/router/PageMonochromatic"
  import PagePolychromatic from "@/router/PagePolychromatic";
  export default Vue.extend({
    name: 'App',
    components: {
      barreTop,
    },
    data: () => ({
      //
    }),
  });


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

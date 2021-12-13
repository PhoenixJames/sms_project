<template>
  <v-app id="app">
    <v-row>
      <v-col cols="2"><SideBar /></v-col>
      <v-col class="pt-5"><router-view/></v-col>
    </v-row>
  </v-app>
</template>
<script>
// @ is an alias to /src
import SideBar from '@/components/common/SideBar.vue';

export default {
  name: 'Home',
  components: {
    SideBar,
  },
};
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

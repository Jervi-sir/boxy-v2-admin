<template>
  <div class="home">
    <img class="logo" src="../assets/resvona.svg" alt="">

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<style lang="scss" scoped>
.home {
  text-align: center;
}
.logo {
  width: 20rem;
  margin-bottom: 2rem;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

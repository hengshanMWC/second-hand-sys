<style lang="scss">

</style>
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'App',
    methods: {
      ...mapMutations(['setUserInfo']),
      getUserInfo(){
        this.$api(this.$SERVER.GET_ISLOGIN)
          .then( data => data.state && this.$api(this.$SERVER.GET_CURRENTUSERINFO))
          .then( data => this.setUserInfo(data.data))
      }
    },
    created(){
      // this.getUserInfo();
    }
  }
</script>



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
      findUser(){
        this.$api(this.$SERVER.GET_USERLIST)
          .then( data => {
            console.log(data)
          })
      }
    },
    created(){
      // this.findUser();
    }
  }
</script>



<style lang="scss" scoped>
  .banner {
  }
</style>

<template lang="pug">
  .banner banner
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "banner",
    data() {
      return {}
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
    },
    created() {

    },
    mounted() {
    
    }
  }
</script>



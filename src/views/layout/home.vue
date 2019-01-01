<style lang="scss" scoped>
  .home {
  }
</style>

<template lang="pug">
  .home home
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "home",
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



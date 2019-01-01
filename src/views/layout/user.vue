<style lang="scss" scoped>
  .user {
  }
</style>

<template lang="pug">
  .user user
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "user",
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



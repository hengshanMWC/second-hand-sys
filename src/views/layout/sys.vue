<style lang="scss" scoped>
  .sys {
  }
</style>

<template lang="pug">
  .sys sys
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "sys",
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



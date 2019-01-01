<style lang="scss" scoped>
  .daily_supplies {
  }
</style>

<template lang="pug">
  .daily_supplies 日常用品
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "daily_supplies",
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



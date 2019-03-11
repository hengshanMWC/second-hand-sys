<style lang="scss" scoped>
  .orderDetail {
  }
</style>

<template lang="pug">
  .orderDetail
  
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mDetail from '@/utils/mixin/detail'
  export default {
    name: "orderDetail",
    mixins: [mDetail],
    data() {
      return {
        api: {
          info: 'GET_ORDERINFO',
          upInfo: 'POST_ORDERUPINFO',
        },
        success: {
          url: 'order'
        },
        apiData: {
          o_price: '',
          o_num: '',
          o_state: '',
        },
      }
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



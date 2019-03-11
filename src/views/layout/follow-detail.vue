<style lang="scss" scoped>
  .followDetail {
  }
</style>

<template lang="pug">
  .followDetail followDetail
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mDetail from '@/utils/mixin/detail'
  import mPage from '@/utils/mixin/page'

  export default {
    name: "bannerDetail",
    mixins: [mPage,mDetail],
    data() {
      return {
        api: {
          list: 'GET_NEWSLIST',
          info: 'GET_FEEDBACKINFO',
          upInfo: 'POST_FEEDBACKUPINFO',
          add: 'POST_FEEDBACKADD',
        },
        success: {
          url: 'follow'
        },
        apiData: {
        
        },
        getApiData: {
          pageSize: 5,
          pageIndex: 1,
          n_type: 6,
        },
        rules: {
        
        },
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
    
    },
    create(){
    
    },
    watch: {
      $route: {
        handler(to) {
          this.id = to.query.id;
          if(this.id){
            this.getApiData.pageIndex = 1;
            this.getInfo()
            this.getList()
          }
        },
        immediate: true
      }
    },
  }
</script>



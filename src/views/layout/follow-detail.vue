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
  import mPageOn from '@/utils/mixin/page-no-create'
  import mDetailOn from '@/utils/mixin/detail-no-watch'

  export default {
    name: "bannerDetail",
    mixins: [mPageOn, mDetailOn],
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
          l_id: '',
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
            this.getApiData.l_id = this.id
            this.getInfo()
            this.getList()
          }
        },
        immediate: true
      }
    },
  }
</script>



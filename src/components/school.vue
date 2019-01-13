<style lang="scss" scoped>
  .school {
    .sel_box {
      width: 100%;
    }
  }
</style>

<template lang="pug">
  .school
    el-select.sel_box(
    v-model="val"
    filterable
    remote
    reserve-keyword
    placeholder="请输入学校关键词"
    :remote-method="getSchoolList"
    :loading="schoolLoading"
    @change="setVal")
      el-option(
      v-for="item in schools"
      :key="item.id"
      :label="item.name"
      :value="item.name")
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "school",
    props: ['school','schools'],
    data() {
      return {
        val: '',
        schoolLoading: false,
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      getSchoolList(e){
        if(e !== '') {
          this.schoolLoading = true
          this.$api(`${this.$SERVER.GET_SCHOOILIST}?name=${e}`)
            .then( data => {
              this.schoolLoading = false
              this.$emit('list', data.data)
            })
        }
      },
      setVal(e){
        this.$emit('change', e)
      }
    },
    created() {

    },
    mounted() {
    
    },
    watch: {
      school(newVal){
        this.val = newVal;
      }
    }
  }
</script>



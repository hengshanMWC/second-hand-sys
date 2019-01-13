<style lang="scss" scoped>
  .province {
  }
</style>

<template lang="pug">
  .province
    el-select(v-model="val" placeholder="请选择省份" @change="getCityList")
      el-option(
      v-for="item in provinces"
      :key="item.id"
      :label="item.name"
      :value="item.id")
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "province",
    props: ['province', 'provinces'],
    data() {
      return {
        val: '',
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      getCityList(e){
        this.$api(`${this.$SERVER.GET_CITYLIST}?id=${e}`)
          .then( data => this.$emit('change',{list:data.data,val: e}))
      },
    },
    created() {

    },
    mounted() {

    },
    watch: {
      province(newVal){
        this.val = newVal;
      }
    }
  }
</script>



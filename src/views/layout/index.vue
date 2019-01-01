<style lang="scss" scoped>
  .layout {
    .breadcrumb {
      margin: 15px;
    }
  }
</style>

<template lang="pug">
  .layout
    el-menu.el-menu-demo(
      :default-active="currentActive"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b")
      el-menu-item(index="home") 首页
      el-submenu(index="商品管理")
        template(slot="title") 商品管理
        el-menu-item(index="trappings") 服饰商品
        el-menu-item(index="daily_supplies") 日常用品
        el-menu-item(index="beautiful") 美容护肤品
        el-menu-item(index="electronic") 电子商品
      el-submenu(index="人员管理")
        template(slot="title") 人员管理
        el-menu-item(index="user") 用户管理
        el-menu-item(index="sys") 管理员列表
      el-menu-item(index="banner") banner图
      el-menu-item(index="follow") 问题反馈
    .min_box
      el-breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(v-for="(val, i) in breadcrumbs" :key="i") {{val}}
    router-view
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "layout",
    data() {
      return {
        breadcrumbs: []
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
      currentActive(){
        return this.$route.name
      },
    },
    methods: {
      ...mapMutations([]),
      handleSelect(key, keyPath) {
        this.$router.push({ name: key });
      }
    },
    created() {
    },
    mounted() {
    },
    watch: {
      $route: {
        handler(to) {
          let { title, parentTitle } = to.meta
          this.breadcrumbs = [];
          let breadcrumbs = this.breadcrumbs;
          if(title){
            breadcrumbs.push(title)
            if(parentTitle){
              breadcrumbs.unshift(parentTitle);
            }
          }
        },
        immediate: true
      }
    }
  }
</script>



<style lang="scss" scoped>
  .layout {
    .breadcrumb {
      margin: 15px;
    }
    .avatar_box{
      float:right;
      margin: 10px 25px 10px 0;
      text-align: center;
      .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border:thin solid #7d94aa;
      }
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
      el-dropdown.avatar_box(@command="OperationUser")
        img.avatar(:src="tx")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(command="toUserInfo" :title="name") 详情
          el-dropdown-item(command="quit") 退出
    .min_box
      el-breadcrumb(separator-class="el-icon-arrow-right")
        el-breadcrumb-item(v-for="(val, i) in breadcrumbs" :key="i") {{val}}
    router-view.block_box
    <!--router-view(name="a")-->
    <!--router-view(name="b")-->
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "layout",
    data() {
      return {
        breadcrumbs: [],
      }
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters([]),
      currentActive(){
        return this.$route.name
      },
      tx(){
        return this.userInfo.u_avatar || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546710354901&di=6c92107f9216037d256d716893d02608&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Db1ae535a133853438c9a8f25a6239c48%2F29381f30e924b8992d85d90e6d061d950a7bf64f.jpg'
      },
      name(){
        return this.userInfo.u_name || this.userInfo.u_account
      }
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      handleSelect(key, keyPath) {
        this.$router.push({ name: key });
      },
      OperationUser(command) {
        this[command]();
      },
      toUserInfo(){
        this.$router.push('/userDetail?id=' + this.userInfo._id)
      },
      quit(){
        this.$api(this.$SERVER.GET_QUIT)
          .then(data => {
            this.$router.push('/login')
            this.setUserInfo({});
          })
      }
    },
    created() {
    },
    mounted() {
    },
    watch: {
      $route: {
        handler(to) {
          this.breadcrumbs = to.meta.position
        },
        immediate: true
      }
    }
  }
</script>



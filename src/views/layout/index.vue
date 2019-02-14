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
        el-menu-item(index="type") 分类配置
        el-menu-item(index="commodity") 商品列表
        el-menu-item(index="order") 订单列表
      el-submenu(index="人员管理")
        template(slot="title") 人员管理
        el-menu-item(index="user") 用户管理
        el-menu-item(index="sys") 管理员列表
      el-submenu(index="消息中心")
        template(slot="title") 消息中心
        el-menu-item(index="follow") 问题反馈
        el-menu-item(index="prove") 认证管理
      el-menu-item(index="banner") banner图
      el-dropdown.avatar_box(@command="OperationUser")
        img.avatar(v-if="userInfo.u_avatar" :src="$SERVER.FILEURL + userInfo.u_avatar")
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
        this.$router.push('/sysDetail?id=' + this.userInfo._id)
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



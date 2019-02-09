<style lang="scss" scoped>
  .banner {
  }
</style>

<template lang="pug">
  .banner
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAdd" plain) 新增
      el-button(type="danger" @click="dels" plain) 批量删除
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="b_image" label="图片链接" width="180")
      el-table-column(prop="b_url" label="跳转链接" width="180")
      el-table-column(prop="b_weight" label="权重" width="60")
      el-table-column(prop="up_date" label="更新日期")
      el-table-column(prop="create_date" label="创建日期" )
      el-table-column(label="操作" width="155" fixed="right")
        template(slot-scope="scope")
          el-button(@click="upState(scope.row._id, scope.row.b_state)" type="primary" size="small") {{scope.row.b_state | getStateText}}
          el-button(@click="edit(scope.row._id)" type="primary" size="small") 编辑
          el-button(@click="delAlert(scope.row._id)" type="danger" size="small") 删除
    el-pagination.box_bottom(
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="getApiData.pageIndex + 1"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="getApiData.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="dataList.count")
    el-dialog(
    title="删除"
    :visible.sync="bAlert"
    width="25%")
      span 是否删除该分类
      span.dialog-footer(slot="footer")
        el-button(@click="closeDelAlert") 取消
        el-button(@click="del" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPage from '@/utils/mixin/page'
  export default {
    name: "banner",
    mixins: [mPage],
    data() {
      return {
        api: {
         list: 'GET_BANNERLIST',
         del: 'GET_BANNERDEL'
        },
        to: 'bannerDetail'
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      upState(id, b_state){
        this.$api.post(this.$SERVER.POST_BANNERUPINFO, {
          id,
          b_state: b_state == 1 ? 2 : 1
        })
          .then( res => {
            res.state ? this.$message.success('操作成功') :  this.$message.error(res.mes)
            this.getList();
          })
      },
    },
  }
</script>



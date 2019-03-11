<style lang="scss" scoped>
  .news {
  }
</style>

<template lang="pug">
  .news
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAdd" plain) 新增
        el-button(type="primary" @click="search") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-select.w(v-model="getApiData.n_type" clearable placeholder="信息类型")
        el-option(label="信息类型" value="")
        el-option(label="个人消息" :value="0")
        el-option(label="认证信息" :value="1")
        el-option(label="反馈信息" :value="2")
        el-option(label="官方公告" :value="3")
        el-option(label="商品信息" :value="4")
        el-option(label="商品评论" :value="4")
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="n_type" label="信息类型" width="100")
        template(slot-scope="scope")
          span {{ scope.row.n_type | fState}}
      el-table-column(prop="u_name" label="指定人" width="150")
      el-table-column(prop="n_name" label="发布人" width="150")
      el-table-column(prop="up_date" label="更新日期" width="180")
      el-table-column(prop="create_date" label="创建日期" width="180")
      el-table-column(label="操作" fixed="right" width="155")
        template(slot-scope="scope")
          el-button(@click="edit(scope.row._id)" type="primary" size="small") 编辑
          el-button(@click="delAlert(scope.row._id)" type="danger" size="small") 删除
    el-pagination.box_bottom(
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="getApiData.pageIndex"
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
    name: "news",
    mixins: [mPage],
    data() {
      return {
        api: {
          list: 'GET_NEWSLIST',
          del: 'GET_NEWSDEL'
        },
        to: 'newsDetail',
        getApiData: {
          n_type: '',
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
    filters: {
      fState(index){
        const arr = [
          '官方公告', '个人消息','认证消息', '问题反馈','商品信息', '商品评论', '反馈回复',
        ]
        return arr[index]
      }
    }
  }
</script>



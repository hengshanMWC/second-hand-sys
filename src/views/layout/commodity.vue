<style lang="scss" scoped>
  .commodity {
  
  }
</style>

<template lang="pug">
  .commodity
    .box_bottom.f_sb
      div
        el-button(type="primary" @click="toAdd" plain) 新增
        el-button(type="primary" @click="search") 搜索
        el-button(type="primary" @click="reset" round) 重置
      el-button(type="danger" @click="dels" plain) 批量删除
    .box_bottom
      el-input.box_ss1(v-model="getApiData.c_title" placeholder="商品名称")
      el-select.wl(@change="getType2" v-model="getApiData.c_state" placeholder="请选择")
        el-option(label="所有状态" value="")
        el-option(label="上架" :value="1")
        el-option(label="下架" :value="2")
      el-select.box_ss(@change="getType2" v-model="getApiData.c_type" placeholder="请选择")
        el-option(label="所有分类" value="")
        el-option(
          v-for="item in c_type"
          :key="item._id"
          :value="item.t_name")
      el-select.box_ss(v-model="getApiData.c_type2" placeholder="请选择")
        el-option(label="所有二级分类" value="")
        el-option(
          v-for="item in c_type2"
          :key="item"
          :value="item")
    el-table.box_bottom(ref="multipleTable" style="width: 100%" height="525" :data="dataList.list" @selection-change="handleSelectionChange")
      el-table-column(type="selection" width="40" fixed)
      el-table-column(prop="c_title" label="商品名称" width="150")
      el-table-column(prop="c_type" label="分类" width="150")
      el-table-column(prop="c_type2" label="子分类" width="150")
      el-table-column(prop="c_price" label="价格" width="160")
      el-table-column(prop="c_num" label="数量" width="50")
      el-table-column(prop="c_state" label="状态" width="50")
      el-table-column(prop="up_date" label="更新日期" width="170")
      el-table-column(prop="create_date" label="创建日期" width="170")
      el-table-column(label="操作" width="155" fixed="right")
        template(slot-scope="scope")
          el-button(@click="upState(scope.row._id, scope.row.c_state)" type="primary" size="small") {{scope.row.c_state | getStateText}}
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
      span 是否删除该用户
      span.dialog-footer(slot="footer")
        el-button(@click="closeDelAlert") 取消
        el-button(@click="del" type="primary")  确认
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import mPage from '@/utils/mixin/page'
  import mType from '@/utils/mixin/view/type'

  export default {
    name: "commodity",
    mixins: [mPage,mType],
    data() {
      return {
        getApiData: {
          c_title: '',
          c_state: '',
          c_type: '',
          c_type2: '',
        },
        api: {
          list: 'GET_COMMODITYLIST',
          del: 'GET_COMMODITYDEL',
        },
        to: 'commodityDetail',
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([]),
    },
    methods: {
      ...mapMutations([]),
      upState(c_id, c_state){
        this.$api.post(this.$SERVER.POST_COMMODITYUPINFO, {
          c_id,
          c_state: c_state == 1 ? 2 : 1
        })
          .then( res => {
            res.state ? this.$message.success('操作成功') :  this.$message.error(res.mes)
            this.getList();
          })
      },
    },
    
  }
</script>



<template>
  <div class="app-container page-test-list">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="$router.push({name: 'xxx-add'})">
        <svg-icon icon-class="plus"></svg-icon>
        新增
      </el-button>
    </div>
    <el-table :data="list" row-key="id" v-loading.body="listLoading" class="table-list" element-loading-text="Loading" border fit>
      <el-table-column label="列A" align="center" width="60">
        <template slot-scope="scope">
          1
        </template>
      </el-table-column>
      <el-table-column label="列B" align="center">
        <template slot-scope="scope">
          2
        </template>
      </el-table-column>
      <el-table-column label="列C" align="center" width="250">
        <template slot-scope="scope">
          3
        </template>
      </el-table-column>
      <el-table-column label="列D" align="center" width="80">
        <template slot-scope="scope">
          4
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="meta.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { test } from '@/api/test'
  import BoxImage from '@/components/upload/BoxImage'

  export default {
    name: 'ad-list',
    data () {
      return {
        /** ↓↓↓列表专用↓↓↓ */
        meta: {},
        list: [],
        listLoading: false,
        listQuery: {
          page: 1,
          offset: 0,
          limit: 20,
          position: ''
        }
        /** ↑↑↑列表专用↑↑↑ */
      }
    },
    created () {
      // this.getList()
    },
    filters: {
      ellipse: (v) => {
        if (v.length > 43) {
          return v.substring(0, 50) + '...'
        } else {
          return v
        }
      }
    },
    methods: {
      // 分页大小改变
      handleSizeChange (val) {
        this.listQuery.page = 1
        this.listQuery.limit = val
        this.getList()
      },
      // 页码改变
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.listQuery.offset = (this.listQuery.page - 1) * this.listQuery.limit
        this.getList()
      },
      // 获取列表
      getList () {
        this.listLoading = true
        test(this.listQuery).then(response => {
          this.meta = response.data.meta
          this.list = response.data.data
          this.listLoading = false
        })
      }
    },
    components: {
      BoxImage
    }
  }
</script>
<style lang="scss">
  .page-test-list {
  }

</style>


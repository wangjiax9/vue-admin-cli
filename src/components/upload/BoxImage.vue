<template>
  <div class="box-uploader">
    <el-upload :data="dataObj"
               :disabled="disabled"
               :name="fileName"
               :multiple="false"
               :show-file-list="false"
               :action="uploadServer"
               :before-upload="beforeUpload"
               :on-success="handleImageScucess">
      <img v-if="imageUrl.length>1" :src="imageUrl" class="box">
      <i v-else class="el-icon-plus box-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
  export default {
    name: 'dragImageUpload',
    props: {
      value: String,
      disabled: Boolean
    },
    computed: {
      imageUrl () {
        return this.value
      }
    },
    data () {
      return {
        fileName: window.LOCAL_DEBUG ? 'fpfile' : 'file',
        uploadServer: window.LOCAL_DEBUG ? 'https://file.webapp.163.com/gameapp/file/new/' : '/admin/ajax/upload2fp/',
        tempUrl: '',
        dataObj: { Authorization: '' }
      }
    },
    methods: {
      rmImage () {
        this.emitInput('')
      },
      emitInput (val) {
        this.$emit('input', val)
      },
      handleImageScucess (res) {
        const img = window.LOCAL_DEBUG ? JSON.parse(res.body) : res.img
        this.emitInput(img.url)
      },
      beforeUpload () {
        window.LOCAL_DEBUG && (this.dataObj.Authorization = window.ypw_token)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .box-uploader {
    width: 140px;
    height: 140px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409EFF;
    }
    img {
      width: 138px;
      height: 138px;
    }
  }

  .box-uploader-icon {
    width: 140px;
    height: 140px;
    font-size: 28px;
    color: #8c939d;
    line-height: 140px;
    text-align: center;
  }

  .box {
    max-height: 200px;
    display: block;
  }
</style>


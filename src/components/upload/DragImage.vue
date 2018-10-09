<template>
  <div class="upload-container">
    <el-upload class="image-uploader" :data="dataObj" drag 
      :name="fileName"
      :multiple="false" 
      :show-file-list="false" 
      :action="uploadServer"
      :before-upload="beforeUpload"
      :on-success="handleImageScucess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="image-preview image-app-preview">
      <div class="image-preview-wrapper" v-show="imageUrl.length>1">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i @click="rmImage" class="el-icon-delete"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dragImageUpload',
  props: {
    value: String
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  data() {
    return {
      // fileName: 'fpfile',
      // 上传至FP服务器接口
      // uploadServer: 'https://file.webapp.163.com/gameapp/file/new/',
      fileName: 'file',
      // 管理后台上传图片接口
      uploadServer: '/admin/ajax/upload2fp/',
      tempUrl: '',
      dataObj: { Authorization: '' }
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageScucess(res) {
      const img = res.img
      // const img = JSON.parse(res.body)
      this.emitInput(img.url)
    },
    beforeUpload() {
      // this.dataObj.Authorization = 'Policy 1qi93tQSLJXus00zwRM/0wk2NPw=:eyJmc2l6ZUxpbWl0IjogWzAsIDEwNDg1NzYwMF0sICJtaW1lTGltaXQiOiBbImltYWdlL2pwZWciLCAiaW1hZ2UvcG5nIiwgInZpZGVvL21wNCIsICJpbWFnZS9naWYiLCAiaW1hZ2UvYm1wIl0sICJ1cmwiOiAiaHR0cDovL2ZwLnBzLm5ldGVhc2UuY29tL2dhbWVhcHAvZmlsZS9uZXcvIiwgImNvbG9yIjogZmFsc2UsICJ0aW1lc3RhbXAiOiAxNTI3MDY5NzExLCAicGluZyI6ICIiLCAibWV0aG9kIjogIlBPU1QifQ=='
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 30%;
    float: left;
  }
  .image-preview {
    min-width: 200px;
    min-height:200px;
    max-height: 300px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      img {
        max-height: 300px;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>


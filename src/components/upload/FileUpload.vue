<template>
  <div class="file-uploader">
    <el-upload :data="dataObj"
      :name="fileName"
      :multiple="false"
      :show-file-list="false"  
      :action="uploadServer"
      :before-upload="beforeUpload"
      :on-success="handleScucess">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div v-if="fileUrl.length>1" class="url">{{fileUrl}}</div>
  </div>
</template>
<script>
export default {
  name: 'fileUpload',
  props: {
    value: String,
    fileType: String
  },
  computed: {
    fileUrl() {
      return this.value
    }
  },
  data() {
    return {
      // fileName: 'fpfile',
      // // 上传至FP服务器接口
      // uploadServer: 'https://file.webapp.163.com/gameapp/file/new/',
      fileName: 'file',
      // 管理后台上传图片接口
      uploadServer: '/admin/ajax/upload2fpv2/',
      tempUrl: '',
      dataObj: { Authorization: '' }
    }
  },
  methods: {
    rmFile() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleScucess(res) {
      const file = res.file
      // const file = JSON.parse(res.body)
      this.emitInput(file.url)
    },
    beforeUpload(file) {
      if (this.fileType === 'audio') {
        // 检查音频格式
        const rFilter = /^(audio\/mp3|audio\/mpeg)$/i
        if (!rFilter.test(file.type)) {
          this.$notify.error({
            title: '文件格式不正确',
            message: '请选择mp3/mpeg格式的音频文件'
          })
          return
        }
      } else if (this.fileType === 'video') {
        // 检查视频格式
        const rFilter = /^video\/mp4$/i
        if (!rFilter.test(file.type)) {
          this.$notify.error({
            title: '文件格式不正确',
            message: '仅支持mp4格式的视频文件'
          })
          return
        }
      }
      // this.dataObj.Authorization = 'Policy HxjO+MEab/B9G3AjxIwCpmdu+9Y=:eyJmc2l6ZUxpbWl0IjogWzAsIDEwNDg1NzYwMF0sICJtaW1lTGltaXQiOiBbImltYWdlL2pwZWciLCAiaW1hZ2UvcG5nIiwgInZpZGVvL21wNCIsICJhdWRpby9tcDMiLCAiYXVkaW8vbXBlZyIsICJpbWFnZS9naWYiLCAiaW1hZ2UvYm1wIl0sICJ1cmwiOiAiaHR0cDovL2ZwLnBzLm5ldGVhc2UuY29tL2dhbWVhcHAvZmlsZS9uZXcvIiwgImNvbG9yIjogZmFsc2UsICJ0aW1lc3RhbXAiOiAxNTI3MDc3MDY4LCAicGluZyI6ICIiLCAibWV0aG9kIjogIlBPU1QifQ=='
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>


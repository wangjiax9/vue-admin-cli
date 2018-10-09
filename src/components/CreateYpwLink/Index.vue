<template>
  <el-form ref="shareForm" :model="shareForm" :rules="shareRules" label-width="120px">
    <el-form-item label="分享地址" prop="share_url">
      <el-input v-model="shareForm.share_url" placeholder="输入分享地址"></el-input>
    </el-form-item>
    <el-form-item label="访问地址" prop="url">
      <el-input v-model="shareForm.url" placeholder="输入访问地址"></el-input>
    </el-form-item>
    <el-form-item label="分享标题" prop="share_title">
      <el-input v-model="shareForm.share_title" placeholder="输入分享标题"></el-input>
    </el-form-item>
    <el-form-item label="分享详情" prop="share_description">
      <el-input v-model="shareForm.share_description" placeholder="输入分享详情"></el-input>
    </el-form-item>
    <el-form-item label="缩略图" prop="thumb">
      <file-upload v-model="shareForm.thumb"></file-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onCreate('shareForm')">生成</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import FileUpload from '@/components/upload/DragImage'
  export default {
    name: 'create-ypw-link',
    data() {
      return {
        shareForm: {
          share_url: '',
          url: '',
          share_title: '',
          share_description: '',
          thumb: 'https://gameapp.fp.ps.netease.com/file/5b237e44143cfa2fdf942276jKAdYaBB'
        },
        shareRules: {
          share_url: [
            { required: true, message: '请输入分享地址', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入访问地址', trigger: 'blur' }
          ],
          share_title: [
            { required: true, message: '请输入分享标题', trigger: 'blur' }
          ],
          share_description: [
            { required: true, message: '请输入分享描述', trigger: 'blur' }
          ],
          thumb: [
            { required: true, message: '请输入上传分享缩略图', trigger: 'blur' }
          ]
        },
        createdUrl: 'ypwv2://activity/inside_web?_b_needShare=true&'
      }
    },
    components: {
      'file-upload': FileUpload
    },
    methods: {
      onCreate(formName) {
        const self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            const share_url = encodeURIComponent(self.shareForm.share_url)
            const url = encodeURIComponent(self.shareForm.url)
            const share_title = encodeURIComponent(self.shareForm.share_title)
            const share_description = encodeURIComponent(self.shareForm.share_description)
            const thumb = encodeURIComponent(self.shareForm.thumb)
            self.createdUrl = `${self.createdUrl}shareUrl=${share_url}&shareTitle=${share_title}&shareContent=${share_description}&shareThumbUrl=${thumb}&url=${url}`
            self.$emit('createdLink', {
              createdLink: self.createdUrl,
              shareModelVisible: false
            })
          }
        })
      },
      onCancel() {
        this.$emit('createdLink', {
          createdLink: '',
          shareModelVisible: false
        })
      }
    }
  }
</script>
<style>

</style>


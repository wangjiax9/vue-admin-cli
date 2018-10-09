<template>
  <div class="cropper-box">
    <div class="cropper" :style="boxStyle">
      <vueCropper
        ref="cropper"
        :img="options.img"
        :outputType="options.outputType"
        :autoCrop="options.autoCrop"
        :autoCropWidth="options.autoCropWidth"
        :autoCropHeight="options.autoCropHeight"
        :fixedBox="options.fixedBox"
        @realTime="realTime"
      ></vueCropper>
    </div>
    <div class="preview-box">
      <div v-if="previews" class="preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px'}">
        <img :src="previews.url" :style="previews.img">
      </div>
      <el-progress v-if="uploading" :percentage="per"></el-progress>
    </div>
    <div class="op">
      <el-button type="primary" @click="updateImg">{{tips}}</el-button>
      <el-tooltip class="item" effect="dark" content="向左旋转90°" placement="top">
        <span class="svg-btn" @click="rotateLeft"><svg-icon icon-class="rotate-left"></svg-icon></span>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="向右旋转90°" placement="top">
        <span class="svg-btn" @click="rotateRight"><svg-icon icon-class="rotate-right"></svg-icon></span>
      </el-tooltip>
      <el-button type="primary" class="upload" @click="uploadImg">
        <svg-icon icon-class="upload"></svg-icon>
        上传图片
      </el-button>
    </div>
    <input type="file" ref="updateImgFile" @change="changeImg($event)" style="width:0;height:0;opacity: 0;position: absolute;"/>
  </div>
</template>
<script>
  import VueCropper from 'vue-cropper'
  import axios from 'axios'

  export default {
    name: 'pic-cropper',
    props: {
      value: String,
      options: Object
    },
    components: {
      VueCropper
    },
    data () {
      return {
        uploadServer: window.LOCAL_DEBUG ? 'https://file.webapp.163.com/gameapp/file/new/' : '/admin/ajax/upload2fp/',
        tips: '选择图片',
        boxStyle: {
          width: (this.options.autoCropWidth + 50) + 'px',
          height: (this.options.autoCropHeight + 50) + 'px'
        },
        previews: '', // 预览对象
        uploading: false,
        per: 0
      }
    },
    methods: {
      realTime (data) {
        this.previews = data
      },
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      updateImg () {
        this.$refs.updateImgFile.click()
        this.tips = '更换图片'
      },
      changeImg (e) {
        const file = e.target.files[0]
        // 检查图片格式
        var rFilter = /^(image\/jpeg|image\/png|image\/gif)$/i
        if (!rFilter.test(file.type)) {
          this.$message.error('图片类型必须是.gif,jpeg,jpg,png中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.options.img = data
          this.$refs.updateImgFile.value = ''
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        reader.readAsArrayBuffer(file)
      },
      uploadImg () {
        const self = this
        this.$refs.cropper.getCropBlob((data) => {
          const form = document.createElement('form')
          form.enctype = 'multipart/form-data'
          const fd = new FormData(form)
          if (window.LOCAL_DEBUG) {
            fd.append('fpfile', data)
            fd.append('Authorization', window.ypw_token)
          } else {
            fd.append('file', data)
          }
          const cf = {
            onUploadProgress: function (progressEvent) {
              self.progressHandlingFunction(progressEvent)
            }
          }
          this.uploading = true
          this.per = 0
          axios.post(this.uploadServer, fd, cf)
          .then(res => {
            const result = res.data
            const img = window.LOCAL_DEBUG ? JSON.parse(result.body) : result.img
            this.uploading = false
            self.$message.success('上传成功')
            self.$emit('saveImg', img)
          })
        })
      },
      progressHandlingFunction (progressEvent) {
        if (progressEvent.lengthComputable) {
          var percent = parseInt(progressEvent.loaded / progressEvent.total * 100)
          this.per = percent
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .cropper-box {
    display: flex;
    flex-wrap: wrap;
    .cropper {
      margin-right: 20px;
    }
    .preview-box {
      flex: 1;
      text-align: center;
      box-sizing: content-box;
      .preview {
        border: 2px dashed #dbdbdb;
        overflow: hidden;
        margin: auto;
      }
    }
    .op {
      width: 100%;
      font-size: 24px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #dbdbdb;
      .upload {
        float: right;
      }
    }
  }

  .svg-btn {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    font-size: 24px;
    background-color: #409EFF;
    margin-left: 10px;
    border-radius: 50%;
    &:hover {
      background-color: #66b1ff;
    }
  }
</style>



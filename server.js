const path = require('path')
const request = require('request')
const Express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = new Express()
const router = Express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({
  storage: storage
})

app.use(bodyParser.json())

router.all('/admin/new/users/*', async (req, res, next) => {
  res.status(200).json({
    'msg': '请求成功',
    'code': 0,
    'data': {
      'status': 0,
      'ban_reason': 0,
      'pic_pick_count': 10,
      'nickname': '偷偷湿污外衰',
      'id': 5,
      'fans_count': 39,
      'last_login_time': 1534928970,
      'gender': 1,
      'follow_count': 0,
      'register_time': 1534213788,
      'comment_count': 6,
      'liked_count': 2,
      'avatar': 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLREFgyfAcpZuG1Y0xveV3e7PBwUD54alm5ltDXljGHJElbtkSia9iadhVgUia7vE4pFS840kRk0fg2w/132',
      'release_time': 1535040000
    }
  })
})

router.all(/^\/admin\/test.*$/, async (req, res, next) => {
  res.status(200).json({
    msg: '请求成功',
    meta: {'total': 0},
    code: 0,
    data: []
  })
})

router.all(/^\/admin\/(spiders|thread)\/.*$/, async (req, res, next) => {
  request({
      baseUrl: 'http://10.242.92.239:5000',
      uri: req.url,
      method: req.method,
      json: true,
      qs: req.query,
      body: req.body,
      headers: {
        'Cookie': 'remember_token=900412|4c929b050d081b30b26fc67f1e372104a516e178885dc71ef1f7329a80be7e565b5d62d959ffc19382920fe5749d43b5c26bf3ccfc4cc5783c612205f1631b02; session=eyJfZnJlc2giOmZhbHNlLCJ1c2VyX2lkIjoiOTAwNDEyIn0.DoSdQg.7wZIPHLp-bFejCtceYzTvyOPnRk',
      }
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.status(200).json(body)
      } else {
        res.status(response.statusCode).end()
      }
    }
  )
})

app.use(cors())
app.use(router)

const server = app.listen(8888, function () {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

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

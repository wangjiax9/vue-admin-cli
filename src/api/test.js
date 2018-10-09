import request from '@/utils/request'

// test
export function test(uid) {
  return request({
    url: '/test/' + uid,
    method: 'get'
  })
}

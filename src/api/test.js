import request from '@/utils/request'

'use strict'

export default {

  /**
   * 测试
   * @param query
   */
  test1 (query) {
    return request({
      url: '/test1',
      method: 'get',
      params: query
    })
  },

  /**
   * 测试
   * @param query
   */
  test2 (query) {
    return request({
      url: '/test2',
      method: 'get',
      params: query
    })
  }
}

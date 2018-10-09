/**
 * 转换器
 * 各种转换器聚集在此~~~~~
 */

/**
 * 进制转换器
 */
export const convertHexDec = {
  /**
   * 十六进制转为十进制
   * eg: #ffffff -> ffffffff -> 4294967295
   * 管理后台编辑时时rgb，需要补填为argb
   */
  h2d(val) {
    if (!val) return
    if (val.search('#') !== 0) return
    val = `ff${val.slice(1)}`
    return parseInt(val, 16)
  },
  /** 十进制转为十六进制
  * eg: 4294967295 -> ffffffff -> #ffffff
  * 由于iOS/Android颜色模式是argb，得去掉前两位
  * */
  d2h(val) {
    if (!val) return
    return `#${val.toString(16).slice(2)}`
  }
}

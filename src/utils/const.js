/**
 * 常量配置
 */

/**
 * 下线原因
 */
export const offlineReason = {
  reasonEnum(v) {
    let reason = ''
    switch (v) {
      case 100: reason = '草稿'
        break
      case 200: reason = '侵权'
        break
      case 300: reason = '广告软文'
        break
      case 400: reason = '低俗色情'
        break
      case 500: reason = '违法犯罪'
        break
      case 600: reason = '作者删除'
        break
      default: reason = '其他'
        break
    }
    return reason
  },
  reasonOptions() {
    return [
      {
        value: 100,
        label: '草稿'
      },
      {
        value: 200,
        label: '侵权'
      },
      {
        value: 300,
        label: '广告软文'
      },
      {
        value: 400,
        label: '低俗色情'
      },
      {
        value: 500,
        label: '违法犯罪'
      },
      {
        value: 600,
        label: '作者删除'
      },
      {
        value: 700,
        label: '其他'
      }
    ]
  }
}
/**
 * 禁用原因
 * 营销广告	恶意攻击	冒充他人	违法犯罪	淫秽色情	其它
 */
export const banReason = {
  reasonEnum(v) {
    let reason = ''
    switch (v) {
      case 100: reason = '营销广告'
        break
      case 200: reason = '恶意攻击'
        break
      case 300: reason = '冒充他人'
        break
      case 400: reason = '违法犯罪'
        break
      case 500: reason = '淫秽色情'
        break
      default: reason = '其他'
        break
    }
    return reason
  },
  reasonOptions() {
    return [
      {
        value: 100,
        label: '营销广告'
      },
      {
        value: 200,
        label: '恶意攻击'
      },
      {
        value: 300,
        label: '冒充他人'
      },
      {
        value: 400,
        label: '违法犯罪'
      },
      {
        value: 500,
        label: '淫秽色情'
      },
      {
        value: 600,
        label: '其他'
      }
    ]
  }
}

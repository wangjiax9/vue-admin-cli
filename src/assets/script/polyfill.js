/**
 * Created by Chen Kai on 2017/11/12.
 */

import './EventListenerOptions.polyfill'
// A low performance polyfill based on toDataURL.
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      const binStr = atob(this.toDataURL(type, quality).split(',')[1])
      const len = binStr.length
      const arr = new Uint8Array(len)

      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }

      callback(new Blob([arr], {type: type || 'image/png'}))
    }
  })
}

(function (global) {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', keysRe = new RegExp('[^' + keys + ']')

  // <Global>.atob
  global.atob = function atob (input) {
    var output = [], buffer, bufferB, chrs, index = 0, indexB, length = input.length

    if ((keysRe.test(input)) || (/=/.test(input) && (/=[^=]/.test(input) || /={3}/.test(input)))) {
      throw new Error('Invalid base64 data')
    }

    if (length % 4 > 0) {
      input += Array(4 - length % 4 + 1).join('=')
      length = input.length
    }

    while (index < length) {
      for (bufferB = [], indexB = index; index < indexB + 4;) {
        bufferB.push(keys.indexOf(input.charAt(index++)))
      }

      buffer = (bufferB[0] << 18) + (bufferB[1] << 12) + ((bufferB[2] & 63) << 6) + (bufferB[3] & 63)

      chrs = [(buffer & (255 << 16)) >> 16, bufferB[2] === 64 ? -1 : (buffer & (255 << 8)) >> 8, bufferB[3] === 64 ? -1 : buffer & 255]

      for (indexB = 0; indexB < 3; ++indexB) {
        if (chrs[indexB] >= 0 || indexB === 0) {
          output.push(String.fromCharCode(chrs[indexB]))
        }
      }
    }

    return output.join('')
  }

  // <Global>.btoa
  global.btoa = function btoa (input) {
    var output = [], buffer, chrs, index = 0, length = input.length

    while (index < length) {
      chrs = [input.charCodeAt(index++), input.charCodeAt(index++), input.charCodeAt(index++)]

      buffer = (chrs[0] << 16) + ((chrs[1] || 0) << 8) + (chrs[2] || 0)

      output.push(
        keys.charAt((buffer & (63 << 18)) >> 18),
        keys.charAt((buffer & (63 << 12)) >> 12),
        keys.charAt(isNaN(chrs[1]) ? 64 : (buffer & (63 << 6)) >> 6),
        keys.charAt(isNaN(chrs[2]) ? 64 : (buffer & 63))
      )
    }

    return output.join('')
  }
})(this)

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame

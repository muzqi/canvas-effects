/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-08-16 14:29:15
 * @Description: 雪花
 * @Last Modified by: muziq310@sina.com
 * @Last Modified time: 2019-04-25 00:14:31
 */

import { Sprite, Scene } from '../../lightning/node_modules/spritejs'
import { merge } from 'lodash'
import { Tool } from '../../lightning/node_modules/@/utils'
import initOptions from './initOptions'

export default class Bubble extends Tool {
  constructor(ele, options = {}) {
    super()

    const { width, height } = this.getEleSize(ele)
    this.options = merge(initOptions, options)

    // 制作场景
    this.scene = new Scene(ele, {
      viewport: [width, height],
      resolution: [width * 2, height * 2]
    })

    this.scene.preload({ id: 'snow', src: this.options.imgsrc })

    this.layer = this.scene.layer()

    // 定义动画速率
    this.layer.timeline.playbackRate = this.options.playbackRate

    // 定义画布的背景色
    this.layer.canvas.style.backgroundColor = this.options.bgcolor
  }

  addItem() {
    const [width, height] = this.scene.resolution
    const { size, duration } = this.options

    // 随机尺寸
    const r = Math.random() * size + size

    // 随机位置以及运动方向
    let pos = [Math.random() * width, -20]
    let animY = height

    // 定义气泡
    const item = new Sprite('snow')
    item.attr({
      anchor: [0.5, 0.5],
      size: [r, r],
      pos
    })

    // 定义气泡左右摇晃动画
    item.animate([
      { x: pos[0] - 5 },
      { x: pos[0] + 5 }
    ], {
      duration: 1000 + Math.random() * 500,
      fill: 'forwards',
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out'
    })

    // 定义气泡上升动画
    const anim = item.animate([
      { y: animY, rotate: 360 }
    ], {
      duration: 5000 + Math.random() * duration
    })

    // 上升动画结束后, 删除掉该元素
    anim.finished.then(() => {
      item.remove()
    })

    this.layer.append(item)
  }

  render() {
    const { growspeed } = this.options
    setInterval(this.addItem.bind(this), growspeed)
  }
}

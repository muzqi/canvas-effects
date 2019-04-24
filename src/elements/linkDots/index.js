/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-08-15 11:26:43
 * @Description: 知乎背景特效
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-08-15 13:42:25
 */

import { Sprite, Scene, Path } from 'spritejs'
import { merge, random } from 'lodash'
import { Tool } from '@/utils'
import initOptions from './initOptions'

export default class LinkDots extends Tool {
  constructor(ele, options = {}) {
    super()

    const { width, height } = this.getEleSize(ele)
    this.cw = width * 2
    this.ch = height * 2
    this.options = merge(initOptions, options)

    // 创建场景
    this.scene = new Scene(ele, {
      viewport: [width, height],
      resolution: [this.cw, this.ch]
    })

    // 创建图层
    this.layer = this.scene.layer()

    // 设置画布背景颜色
    this.layer.canvas.style.backgroundColor = this.options.bgcolor

    // 需要使用到的变量
    this.dots = []
  }

  /**
   * 制作所有小球的数据
   */
  createDotsData() {
    const { num, rRange } = this.options

    for(let i = 0; i < num; i ++) {
      let x = Math.random() * this.cw
      let y = Math.random() * this.ch
      let r = random(...rRange)

      // 水平速度
      let vx = Math.random() * 0.5 * Math.pow(-1, Math.floor(Math.random() * 2 + 1))
      // 垂直速度
      let vy = Math.random() * 0.5 * Math.pow(-1, Math.floor(Math.random() * 2 + 1))

      // 将初始数据添加进数组中
      this.dots.push({ x, y, r, vx, vy })
    }
  }

  draw() {
    const { num, color, strokeColor, lineWidth, limit } = this.options

    // 判断两个圆的圆心之间的距离是否小于某个临界值, 若满足, 则将两个圆相连接
    for(let j = 0; j < num; j ++) {
      for(let k = j + 1; k < num; k ++) {
        if(this.getDistance(this.dots[j], this.dots[k]) < limit) {
          let path = new Path()
          const from = `${this.dots[j].x + this.dots[j].r / 2} ${this.dots[j].y + this.dots[j].r / 2}`
          const to = `${this.dots[k].x + this.dots[k].r / 2} ${this.dots[k].y + this.dots[k].r / 2}`
          path.attr({
            d: `M ${from}, L ${to}`,
            strokeColor,
            lineWidth
          })
          this.layer.append(path)
        }
      }
    }

    // 绘制所有圆点
    for(let i = 0; i < num; i ++) {
      const dot = this.dots[i]

      this.layer.append(new Sprite({
        size: [dot.r, dot.r],
        pos: [dot.x, dot.y],
        borderRadius: dot.r / 2,
        bgcolor: color
      }))
    }

    // 实现动画
    for(var k = 0; k < num; k++) {
      // 利用小球中的 vx vy 速率值, 改变其 x y值
      this.dots[k].x += this.dots[k].vx
      this.dots[k].y += this.dots[k].vy

      // 边界监测
      if(this.dots[k].x - this.dots[k].r > this.cw) {
        this.dots[k].x = 0 - this.dots[k].r
      }
      if(this.dots[k].x + this.dots[k].r < 0) {
        this.dots[k].x = this.cw + this.dots[k].r
      }
      if(this.dots[k].y - this.dots[k].r > this.ch) {
        this.dots[k].y = 0 - this.dots[k].r
      }
      if(this.dots[k].y + this.dots[k].r < 0) {
        this.dots[k].y = this.ch + this.dots[k].r
      }
    }
  }

  animate() {
    const loop = () => {
      requestAnimationFrame(loop)
      this.layer.clear()
      this.draw()
    }

    loop()
  }

  render() {
    this.createDotsData()
    this.animate()
  }
}

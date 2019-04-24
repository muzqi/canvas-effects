/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-08-16 16:05:19
 * @Description: 粒子
 * @Last Modified by: muziq310@sina.com
 * @Last Modified time: 2019-04-24 23:03:40
 */
import { random } from 'lodash';
import { rgb } from 'd3-color';
import { ParticleInterface, ParticleConstructorInterface } from './declare';

interface Particle extends ParticleInterface {}

class Particle {
  public constructor(options: ParticleConstructorInterface) {
    const { canvas, context, speed, colors = [], rRange = [], x, y } = options;

    this.canvas = canvas;
    this.context = context;
    this.speed = speed;

    // 制作随机的颜色
    let color = rgb(colors[random(0, colors.length - 1)]);
    color.opacity = random(0.2, 1);

    this.color = color.toString();
    this.r = random(...rRange);

    this.x = x;
    this.y = y;

    // 原始 x 位置
    this.ox = x;
    this.exp = false;
  }

  /**
   * 绘制粒子
   */
  public draw() {
    const { context, color, x, y, r } = this;

    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
  }

  /**
   * 移动粒子
   */
  public move() {
    const { canvas, speed } = this;

    const s = Math.random() * speed;

    // 上升动画
    this.y -= s;
    if (this.y <= 0) {
      this.y = canvas.height;
    }

    // 左右晃动
    if (!this.exp) {
      this.x += Math.random() * (this.r * 0.02);
      if (this.x - this.ox > 5) {
        this.exp = true;
      }
    } else {
      this.x -= Math.random() * (this.r * 0.02);
      if (this.x - this.ox < -5) {
        this.exp = false;
      }
    }

    this.draw();
  }
}

export default Particle;

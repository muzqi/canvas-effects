/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-07-16 14:30:27
 * @Description: 气泡
 * @Last Modified by: muziq310@sina.com
 * @Last Modified time: 2019-04-24 22:55:07
 */

import { merge } from 'lodash';
import { Tool } from '../../utils';
import Particle from './particle';
import { BubbleInterface, optionsInterface, defaultOptions } from './declare';

interface Bubble extends BubbleInterface {}

class Bubble extends Tool {
  private constructor(ele: string, options: optionsInterface = {}) {
    super(ele);
    this.createCanvas();
    this.options = merge(defaultOptions, options);

    this.particles = [];
  }

  /**
   * 执行动画
   */
  public animate() {
    const loop = () => {
      // 清空画布
      this.clearContext();

      for (let particle of this.particles) {
        particle.move();
      }

      requestAnimationFrame(loop);
    };

    loop();
  }

  public render() {
    const { canvas, context, options, cw, ch } = this;
    const { count, speed, colors, rRange }: any = options;

    // 循环绘制出 n 个粒子
    for (let i = 0; i < count; i ++) {
      this.particles[i] = new Particle({
        canvas,
        context,
        speed,
        colors,
        rRange,
        x: Math.random() * cw,
        y: Math.random() * ch,
      });

      this.particles[i].draw();
    }

    // 执行动画
    this.animate();
  }
}

export default Bubble;

/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-08-14 14:06:55
 * @Description: 闪电
 * @Last Modified by: muziq310@sina.com
 * @Last Modified time: 2019-04-25 21:20:31
 */
const { Sprite, Scene, Path } = require('../../node_modules/spritejs/dist/spritejs.min');
import { merge, random } from 'lodash';
import { rgb } from 'd3-color';
import { Tool } from '../utils';
import { LightingInterface, LightingMethods, optionsInterface, defaultOptions } from './declare';

interface Lighting extends LightingInterface { }

class Lighting extends Tool implements LightingMethods {
  public constructor(ele: string, options: optionsInterface = {}) {
    super(ele);

    const { width, height } = this.getEleSize();
    this.cw = width * 2;
    this.ch = height * 2;
    this.options = merge(defaultOptions, options);

    // 创建场景
    this.scene = new Scene(ele, {
      viewport: [width, height],
      resolution: [this.cw, this.ch],
    });

    // 定义组装闪电的图层
    this.lightingLayer = this.scene.layer('lighting');

    // 定义画布背景色
    this.lightingLayer.canvas.style.backgroundColor = this.options.bgcolor;

    // 定义亮光图层
    this.flash = new Sprite({ size: [this.cw, this.ch], bgcolor: 'transparent' });
    this.flashLayer = this.scene.layer('flash');
    this.flashLayer.append(this.flash);

    // 需要使用到的变量
    this.lightingArr = [];
    this.lightTimeCurrent = 0;
    this.lightTimeTotal = 50;
  }

  public createLighting(x = 0, y = 0, canSpawn = false) {
    const { pathLimitRange = [], xRange = [], yRange = [] } = this.options;

    this.lightingArr.push({
      x, y,

      // 可控制闪电的横向曲折度
      xRange: random(...xRange),
      yRange: random(...yRange),
      path: [{ x, y }],

      // 可控制闪电的长度
      pathLimit: random(...pathLimitRange),
      canSpawn,
      hasFired: false,
    });
  }

  public updateLighting() {
    let i = this.lightingArr.length;

    while (i--) {
      let lighting = this.lightingArr[i];
      let path = lighting.path;

      path.push({
        x: path[path.length - 1].x + (random(0, lighting.xRange) - lighting.xRange / 2),
        y: path[path.length - 1].y + random(0, lighting.yRange),
      });

      // 如果 path 数组长度 > pathLimit 则删除 lightingArr 数组中第 i 位置的第1个项目
      if (path.length > lighting.pathLimit) {
        this.lightingArr.splice(i, 1);
      }

      lighting.hasFired = true;
    }
  }

  public lightingTimer() {
    const { countRange = [], spawnTimeRange = [] } = this.options;

    this.lightTimeCurrent++;
    if (this.lightTimeCurrent >= this.lightTimeTotal) {
      let newX = random(100, this.cw - 100);
      let newY = random(0, this.ch / 2);

      // 一次产生多少根闪电
      let createCount = random(...countRange);

      while (createCount--) {
        // 更新闪电出现的位置
        this.createLighting(newX, newY, true);
      }

      this.lightTimeCurrent = 0;

      // 更新闪电出现的随机时间
      this.lightTimeTotal = random(...spawnTimeRange);
    }
  }

  public renderLighting() {
    const { color = '' } = this.options;

    let i = this.lightingArr.length;

    while (i--) {
      let lighting = this.lightingArr[i];

      let pathCount = lighting.path.length;

      // 判断后定义闪电线宽
      let lineWidth = 1;
      if (random(0, 30) === 0) {
        lineWidth = 2;
      }
      if (random(0, 60) === 0) {
        lineWidth = 3;
      }
      if (random(0, 90) === 0) {
        lineWidth = 4;
      }
      if (random(0, 120) === 0) {
        lineWidth = 5;
      }
      if (random(0, 150) === 0) {
        lineWidth = 6;
      }

      // 循环输出每一条闪电
      for (let j = 0; j < pathCount; j++) {
        const p = new Path();

        // 定义线段的路径
        const d = (function path() {
          let str = '';

          for (let i = 0; i < lighting.path.length; i++) {
            const v = lighting.path[i];
            if (i === 0) {
              str = `M ${v.x} ${v.y}`;
            }
            str += `,L ${v.x} ${v.y}`;
          }
          return str;
        }());
        // console.log(d);

        if (lighting.canSpawn) {
          if (random(0, 100) === 0) {
            lighting.canSpawn = false;
            // 闪电出现的位置
            this.createLighting(lighting.path[j].x, lighting.path[j].y, false);
          }
        }

        p.attr({
          d, lineWidth,
          strokeColor: color,
        });

        this.lightingLayer.append(p);
      }

      // 制作闪光
      if (!lighting.hasFired) {
        const transColor = rgb(color);

        this.flash.attr({
          bgcolor: `rgba(${transColor.r}, ${transColor.g}, ${transColor.b}, ${random(0.1, 0.8)})`,
        });
      } else {
        this.flash.attr({
          bgcolor: 'transparent',
        });
      }
    }
  }

  public animate() {
    const loop = () => {
      requestAnimationFrame(loop);
      this.lightingLayer.clear();
      this.updateLighting();
      this.lightingTimer();
      this.renderLighting();
    };
    loop();
  }

  public render() {
    this.animate();
  }
}

export default Lighting;

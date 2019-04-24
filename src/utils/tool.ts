/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-07-16 14:42:06
 * @Description: 工具类
 * @Last Modified by: muziq310@sina.com
 * @Last Modified time: 2019-04-24 23:14:30
 */

interface Tool {
  ele: string;

  context: any;
  cw: any;
  ch: any;
  canvas: any;
}

interface ToolMethods {
 /**
  * 创建 canvas 元素
  * @param {Number} dpi 分辨率倍数, 默认 2
  */
  createCanvas: (dpi?: number) => void;

  /**
   * 清除画布
   */
  clearContext: () => void;

  /**
   * 获取容器尺寸
   * @return {Object} 返回容器尺寸数据集
   */
  getEleSize: () => {
    width: number;
    height: number;
  };

  /**
   * 通过勾股定理, 计算两个点之间的距离
   * @param  {Object} point1 包含 x y 两个值的对象
   * @param  {Object} point2 包含 x y 两个值的对象
   * @return {Number} 返回两点之间的距离
   */
  getDistance: (point1: any, point2: any) => number;
}

class Tool implements ToolMethods {
  public constructor(ele: string) {
    this.ele = ele;
    this.context = null;
    this.cw = null;
    this.ch = null;
  }

  public createCanvas(dpi = 2) {
    const { width, height } = this.getEleSize();
    const canvas = document.createElement('canvas');

    // canvas 画布在页面中的实际大小
    canvas.setAttribute('style', `width: ${width}px;height: ${height}px`);

    // 设置 canvas 为2倍分辨率
    canvas.width = width * dpi;
    canvas.height = height * dpi;

    // 初始化必要的配置项
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.cw = width * dpi;
    this.ch = height * dpi;

    // 将 canvas 元素添加到节点中
    const dom: any = document.querySelector(this.ele);
    dom.appendChild(canvas);
  }

  public clearContext() {
    this.context.clearRect(0, 0, this.cw, this.ch);
  }

  public getEleSize() {
    const dom: any = document.querySelector(this.ele);
    let { width, height } = dom.style;
    width = Number(width.replace('px', ''));
    height = Number(height.replace('px', ''));

    return { width, height };
  }

  public getDistance(point1: any, point2: any) {
    let a = Math.pow(point1.x - point2.x, 2);
    let b = Math.pow(point1.y - point2.y, 2);
    let c = Math.sqrt(a + b);

    return c;
  }
}

export default Tool;

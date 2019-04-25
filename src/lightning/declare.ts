export interface optionsInterface {
  color?: string;                   // 闪电的颜色
  bgcolor?: string;                 // 画布的背景颜色
  xRange?: Array<any>;
  yRange?: Array<any>;
  pathLimitRange?: Array<any>;   // 可控制闪电长度区间
  countRange?: Array<any>;       // 控制一次闪电的条数区间
  spawnTimeRange?: Array<any>;   // 控制下一次闪电的间隔时间区间
}

export const defaultOptions: optionsInterface = {
  color: '#FFF',
  bgcolor: '#333',
  xRange: [5, 35],
  yRange: [5, 50],
  pathLimitRange: [10, 20],
  countRange: [1, 3],
  spawnTimeRange: [0, 100],
};

export interface LightingInterface {
  options: optionsInterface;
  scene: any;
  lightingLayer: any;
  flash: any;
  flashLayer: any;
  lightingArr: Array<any>;
  lightTimeCurrent: number;
  lightTimeTotal: number;
}

export interface LightingMethods {
  /**
   * 创建闪电
   * @param {Number}  x x
   * @param {Number}  y y
   * @param {Boolean} canSpawn 闪电
   */
  createLighting: (x: number, y: number, canSpawn: boolean) => void;

  /**
   * 更新闪电的数组
   */
  updateLighting: () => void;

  /**
   * 闪电定时器
   */
  lightingTimer: () => void;

  /**
   * 渲染闪电
   */
  renderLighting: () => void;

  /**
   * 定义闪电动画
   */
  animate: () => void;

  /**
   * 渲染
   */
  render: () => void;
}

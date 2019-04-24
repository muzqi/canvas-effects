import { Colors } from '../utils';
const { blue, orange, green } = Colors;

export interface optionsInterface {
  count?: number;          // 气泡的数量
  rRange?: Array<number>;  // 气泡的半径区间
  colors?: Array<string>;  // 气泡的颜色
  bgcolor?: string;        // 画布的背景色
  speed?: number;          // 冒泡的速度
}

export const defaultOptions: optionsInterface = {
  count: 100,
  rRange: [4, 12],
  colors: [blue, orange, green],
  bgcolor: '#FFF',
  speed: 1,
};

export interface BubbleInterface {
  createCanvas: (dpi?: number) => void;
  options?: optionsInterface;
  particles: Array<any>;
}

export interface ParticleInterface {
  canvas: any;
  context: any;
  speed: number;
  color?: string;
  r: number;
  x: number;
  y: number;
  ox: number;
  exp: boolean;
}

export interface ParticleConstructorInterface {
  canvas: any;
  context: any;
  speed: number;
  colors: Array<string>;
  rRange: Array<any>;
  x: number;
  y: number;
}

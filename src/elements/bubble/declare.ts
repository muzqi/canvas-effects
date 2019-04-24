import { Colors } from '../../utils'

const { blue, orange, green } = Colors

export interface optionsInterface {
  count: number,
  rRange: Array<number>,

  // 气泡的颜色
  colors: Array<string>,
  speed: number,
}

export const defaultOptions: optionsInterface = {
  count: 100,
  rRange: [4, 12],
  // 气泡的颜色
  colors: [blue, orange, green],
  speed: 1
}

export interface BubbleInterface {
  createCanvas: (dpi?: number) => void;
  options?: optionsInterface;
  particles: Array<any>;
}

export interface ParticleInterface {
  canvas: any;
  context: any;
  speed: number;
  color: string;
  r: number;
  x: number;
  y: number;
  ox: number;
  exp: boolean;
}

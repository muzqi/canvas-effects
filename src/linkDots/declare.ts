import { Colors } from '../utils';
const { graylight } = Colors;

export interface optionsInterface {
  color?: string;         // 小球的颜色
  strokeColor?: string;   // 边的颜色
  lineWidth?: number;     // 边的宽度
  bgcolor?: string;       // 画布背景颜色
  num?: number;           // 创建的圆点数量
  rRange?: Array<any>;    // 小球的半径区间
  limit?: number;         // 小球之间距离的临界值, 小于这个值, 两个小球就会相连
}

export const defaultOptions: optionsInterface = {
  color: '#CCC',
  strokeColor: 'rgba(0, 0, 0, 0.2)',
  lineWidth: 1,
  bgcolor: graylight,
  num: 50,
  rRange: [8, 20],
  limit: 150,
};

export interface LinkDotsInterface {
  options: optionsInterface;
  scene: any;
  layer: any;
  dots: Array<any>;
}

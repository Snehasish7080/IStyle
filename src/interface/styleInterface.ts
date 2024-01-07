import {ILink} from './linkInterface';
export interface IStyle {
  id: string;
  image: string;
  trendCount: number;
  links?: ILink[];
  isMarked: boolean;
}

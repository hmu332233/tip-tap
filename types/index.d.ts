export interface ITouch {
  identifier: string;
  pageX: number;
  pageY: number;
  color: sring;
}

export interface IOngoingTouches {
  [key: string]: ITouch;
}

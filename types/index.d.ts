export interface ITouch {
  identifier: number;
  pageX: number;
  pageY: number;
  color: sring;
}

export interface IOngoingTouchMap {
  [key: string]: ITouch;
}

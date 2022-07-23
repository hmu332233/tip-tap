export interface ITouch {
  identifier: number;
  pageX: number;
  pageY: number;
  color: sring;
}

export interface IOngoingTouchMap {
  [key: string]: ITouch;
}

export type SettingContextValue = [
  {
    mode: string;
    count: number;
  },
  {
    changeMode(mode: string): void;
    changeCount(v: number): void;
  },
];

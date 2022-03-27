type NumberGrid = Array<Array<number>>;
type InputNodeList = NodeListOf<HTMLInputElement>;
type NullableGrid = NumberGrid | null;
type NumberList = Array<number>;
type Updater = (x: number, y: number, n: number) => void;
type Cloner<T> = (obj: T) => T;
type BoardCallback = (x: number, y: number) => void;

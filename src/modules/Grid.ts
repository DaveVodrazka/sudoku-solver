declare global {
  interface Window {
    structuredClone: Cloner<Array<any>>;
  }
}

export class Grid {
  static instance: Grid | null = null;

  private gridElement: NumberGrid;
  private subscribees: Array<Updater>;

  constructor() {
    if (Grid.instance) {
      return Grid.instance;
    }
    Grid.instance = this;
    this.resetGrid();
    this.subscribees = [];
  }

  private resetGrid():void {
    this.gridElement = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
    ];
  }

  public subscribe(callback: Updater): void {
    this.subscribees.push(callback);
  }

  public update(x: number, y: number, n: number): void {
    this.setValue(x, y, n);
    this.subscribees.forEach((subscriber) => { subscriber(x, y, n) });
  }

  public setValue(x: number, y: number, n: number): void {
    this.gridElement[x][y] = n;
  }

  public getValue(x: number, y: number): number {
    const grid = this.snapshot;

    return grid[x][y];
  }

  public getRow(x: number): NumberList {
    const grid = this.snapshot;

    return grid[x];
  }

  public getColumn(y: number): NumberList {
    return this.gridElement.map((arr) => arr[y]);
  }

  public getSquare(x: number, y: number): NumberList {
    const grid = this.snapshot;

    const x0 = Math.floor(x / 3) * 3;
    const y0 = Math.floor(y / 3) * 3;

    return [
      grid[x0][y0],
      grid[x0 + 1][y0],
      grid[x0 + 2][y0],
      grid[x0][y0 + 1],
      grid[x0 + 1][y0 + 1],
      grid[x0 + 2][y0 + 1],
      grid[x0][y0 + 2],
      grid[x0 + 1][y0 + 2],
      grid[x0 + 2][y0 + 2],
    ];
  }

  public get snapshot(): NumberGrid {
    return window.structuredClone(this.gridElement);
  }
}

import { Grid } from "./Grid.js";

export class Solver {
  private grid: Grid;
  private values: NumberList;
  private delay: number | undefined;
  private done: boolean;

  constructor() {
    this.values = [1,2,3,4,5,6,7,8,9];
    this.grid = new Grid();
    this.delay = 0;
    this.done = false;
  }

  public solve(delay?: number): void {
    this.done = false;
    if (delay) {
      this.delay = delay;
      this.solveWithDelay();
    } else {
      this.delay = 0;
      this.solveSync();
    }
  }

  private async wait() {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }

  private solveSync(): void {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (this.grid.getValue(x, y) === 0) {
          for (const n of this.values) {
            if (this.done) {
              return;
            }
            if (this.isPossible(x, y, n)) {
              this.grid.update(x, y, n);
              this.solveSync();
              if (!this.done) {
                this.grid.update(x, y, 0);
              }
            }
          }
          // None of the values are possible - dead end
          return;
        }
      }
    }
    this.done = true;
  }

  private async solveWithDelay(): Promise<void> {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (this.grid.getValue(x, y) === 0) {
          for (const n of this.values) {
            if (this.done) {
              return;
            }
            if (this.isPossible(x, y, n)) {
              this.grid.update(x, y, n);
              await this.wait();
              await this.solveWithDelay();
              if (!this.done) {
                this.grid.update(x, y, 0);
              }
            }
          }
          // None of the values are possible - dead end
          return;
        }
      }
    }
    this.done = true;
  }

  private isPossible(x: number, y: number, n: number): boolean {
    const row = this.grid.getRow(x);
    const column = this.grid.getColumn(y);
    const square = this.grid.getSquare(x, y);

    if (row.includes(n) || column.includes(n) || square.includes(n)) {
      return false;
    }
    return true;
  }
}

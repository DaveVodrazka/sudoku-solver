import { Grid } from "./Grid.js";

export class Solver {
  private grid: Grid;
  private values: NumberList;
  private delay?: number;
  private done: boolean;

  constructor() {
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  private hasDuplicate(arr: Array<number>): boolean {
    const nonZeroArr = arr.filter((n) => n != 0);
    return nonZeroArr.length !== new Set(nonZeroArr).size;
  }

  private hasInvalidChar(arr: Array<any>): boolean {
    const isValid = (char: any): boolean => {
      return typeof char === "number" && char >= 0 && char < 10;
    };
    return !arr.every(isValid);
  }

  /**
   * Checks for duplicates and invalid characters.
   * @return true if valid sudoku board, false otherwise
   */
  public isValid(): boolean {
    for (let x = 0; x < 9; x++) {
      const a = 3 * (x % 3);
      const b = Math.floor(x / 3) * 3;
      const square = this.grid.getSquare(a, b);
      const row = this.grid.getRow(x);
      const column = this.grid.getColumn(x);
      if (this.hasDuplicate(row) || this.hasDuplicate(column) || this.hasDuplicate(square) || this.hasInvalidChar(row)) {
        return false;
      }
    }
    return true;
  }
}

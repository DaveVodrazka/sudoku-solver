import { Grid } from "./Grid.js";

export class Visualiser {
  private inputs: InputNodeList;
  private grid: Grid;
  private root: HTMLElement;
  private toast: HTMLElement;
  private rowLength: number;

  constructor(root: HTMLElement) {
    this.root = root;
    this.rowLength = 9;
    this.inputs = this.root.querySelectorAll("input");
    this.grid = new Grid();
    this.grid.subscribe(this.update.bind(this));
    this.toast = document.getElementById("toast");
  }

  private walkTheBoard(callback: BoardCallback): void {
    for (let x = 0; x < this.rowLength; x++) {
      for (let y = 0; y < this.rowLength; y++) {
        callback(x, y);
      }
    }
  }

  public collectValues() {
    const callback = (x: number, y: number):void => {
      const index = this.coordinatesToIndex(x, y);
      const value = this.stringToNumber(this.inputs[index].value);
      this.grid.setValue(x, y, value);
    };
    this.walkTheBoard(callback);
  }

  public clear() {
    const callback = (x: number, y: number):void => {
      const index = this.coordinatesToIndex(x, y);
      this.inputs[index].value = "";
    };
    this.walkTheBoard(callback);
  }

  private stringToNumber(str: string): number {
    return str === "" ? 0 : parseInt(str, 10);
  }

  private numberToString(n: number): string {
    return n === 0 ? "" : n.toString();
  }

  private update(x: number, y: number, n: number) {
    const sanitizedValue = this.numberToString(n);
    const index = this.coordinatesToIndex(x, y);

    this.inputs[index].value = sanitizedValue;
  }

  private coordinatesToIndex(x: number, y: number): number {
    return x * this.rowLength + y;
  }

  /**
   * Display given message for some time
   * @param msg 
   */
  public showMessage(msg: string): void {
    this.toast.innerText = msg;
    this.toast.classList.add("show");
    setTimeout(() => this.toast.classList.remove("show"), 1500);
  }
}

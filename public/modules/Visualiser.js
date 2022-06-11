import { Grid } from "./Grid.js";
export class Visualiser {
    inputs;
    grid;
    root;
    toast;
    rowLength;
    constructor(root) {
        this.root = root;
        this.rowLength = 9;
        this.inputs = this.root.querySelectorAll("input");
        this.grid = new Grid();
        this.grid.subscribe(this.update.bind(this));
        this.toast = document.getElementById("toast");
    }
    walkTheBoard(callback) {
        for (let x = 0; x < this.rowLength; x++) {
            for (let y = 0; y < this.rowLength; y++) {
                callback(x, y);
            }
        }
    }
    collectValues() {
        const callback = (x, y) => {
            const index = this.coordinatesToIndex(x, y);
            const value = this.stringToNumber(this.inputs[index].value);
            this.grid.setValue(x, y, value);
        };
        this.walkTheBoard(callback);
    }
    clear() {
        const callback = (x, y) => {
            const index = this.coordinatesToIndex(x, y);
            this.inputs[index].value = "";
        };
        this.walkTheBoard(callback);
    }
    stringToNumber(str) {
        return str === "" ? 0 : parseInt(str, 10);
    }
    numberToString(n) {
        return n === 0 ? "" : n.toString();
    }
    update(x, y, n) {
        const sanitizedValue = this.numberToString(n);
        const index = this.coordinatesToIndex(x, y);
        this.inputs[index].value = sanitizedValue;
    }
    coordinatesToIndex(x, y) {
        return x * this.rowLength + y;
    }
    /**
     * Display given message for some time
     * @param msg
     */
    showMessage(msg) {
        this.toast.innerText = msg;
        this.toast.classList.add("show");
        setTimeout(() => this.toast.classList.remove("show"), 1500);
    }
}

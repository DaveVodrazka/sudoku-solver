export class Grid {
    static instance = null;
    gridElement;
    subscribees;
    constructor() {
        if (Grid.instance) {
            return Grid.instance;
        }
        Grid.instance = this;
        this.resetGrid();
        this.subscribees = [];
    }
    resetGrid() {
        this.gridElement = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }
    subscribe(callback) {
        this.subscribees.push(callback);
    }
    update(x, y, n) {
        this.setValue(x, y, n);
        this.subscribees.forEach((subscriber) => { subscriber(x, y, n); });
    }
    setValue(x, y, n) {
        this.gridElement[x][y] = n;
    }
    getValue(x, y) {
        const grid = this.snapshot;
        return grid[x][y];
    }
    getRow(x) {
        const grid = this.snapshot;
        return grid[x];
    }
    getColumn(y) {
        return this.gridElement.map((arr) => arr[y]);
    }
    getSquare(x, y) {
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
    get snapshot() {
        return window.structuredClone(this.gridElement);
    }
}

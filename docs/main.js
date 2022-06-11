import { Visualiser } from "./modules/Visualiser.js";
import { Solver } from "./modules/Solver.js";
const init = () => {
    const root = document.getElementById("board");
    if (!(root && root instanceof HTMLElement)) {
        console.warn("Couldn't get root element:", root);
        return;
    }
    const visualiser = new Visualiser(root);
    const solver = new Solver();
    const buttonClear = document.getElementById("button-clear");
    const buttonSync = document.getElementById("button-solve-sync");
    const buttonAsync = document.getElementById("button-solve-animation");
    const invalidBoardMessage = "Invalid Sudoku";
    buttonClear.addEventListener("click", () => {
        visualiser.clear();
    });
    buttonSync.addEventListener("click", () => {
        visualiser.collectValues();
        if (solver.isValid()) {
            solver.solve();
        }
        else {
            visualiser.showMessage(invalidBoardMessage);
        }
    });
    buttonAsync.addEventListener("click", () => {
        visualiser.collectValues();
        if (solver.isValid()) {
            solver.solve(10);
        }
        else {
            visualiser.showMessage(invalidBoardMessage);
        }
    });
};
init();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('docs'));

app.listen(port, () => {
  console.log(`Sudoku solver running at http://localhost:${port}`)
});

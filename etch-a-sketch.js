const container = document.querySelector(".container");
console.log(container);

const GRID_SIDE = 16;
let i = 0;
let j = 0;
for (i = 0; i < GRID_SIDE; i++) {
  const row_container = document.createElement('div');
  row_container.classList.add('row_container');
  for (j = 0; j < GRID_SIDE; j++) { 
      const div = document.createElement('div');
      div.style.backgroundColor = 'white';
      div.classList.add('grid_square');
      if (j == 0) {
        div.classList.add('left_edge');
      } 
      if (j == GRID_SIDE - 1) {
        div.classList.add('right_edge');
      } 
      if (i == 0) {
        div.classList.add('top_edge');
      } 
      if (i == GRID_SIDE - 1) {
        div.classList.add('bottom_edge');
      } 
      row_container.appendChild(div);
    }
  container.appendChild(row_container);
}

const grid_squares = document.querySelectorAll('.grid_square');
grid_squares.forEach(grid_square => {
  grid_square.addEventListener('mouseenter', change_color);
})

function change_color(e) {
  console.log(e);
  const grid_square = e.target;
  let current_color = grid_square.style['background-color'];
  let new_color;
  if (current_color == 'white') {
    new_color = 'rgba(1, 1, 1, 0.1)';
  }
  else {
    let rgba = current_color.slice(current_color.indexOf('('), current_color.indexOf(')')).split(', ');
    let alpha = parseFloat(rgba[3]);
    new_color = `rgba(1, 1, 1, ${alpha + 0.1})`;
    
  }
  grid_square.style['background-color'] = new_color;
}

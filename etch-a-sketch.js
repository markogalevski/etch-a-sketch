const default_size = 16;
init(default_size);

const resize_button = document.querySelector('.resize');
resize_button.addEventListener('click', resize);
const rainbow_button = document.querySelector('.rainbow');
rainbow_button.addEventListener('click', rainbow);
const shading_button = document.querySelector('.shading');
shading_button.addEventListener('click', shading);
const black_button = document.querySelector('.black');
black_button.addEventListener('click', black);
const reset_button = document.querySelector('.clear');
reset_button.addEventListener('click', paint_white);


function black_mode(e) {
  const grid_square = e.target;
  let new_color = 'black'
  grid_square.style.backgroundColor = new_color;
}

function shading_mode(e) {
  const grid_square = e.target;
  let current_color = grid_square.style.backgroundColor;
  let new_color;
  if (current_color == 'white') {
    new_color = 'rgba(1, 1, 1, 0.1)';
  }
  else {
    let rgba = current_color.slice(current_color.indexOf('('), current_color.indexOf(')')).split(', ');
    let alpha = parseFloat(rgba[3]);
    new_color = `rgba(1, 1, 1, ${alpha + 0.1})`;
    
  }
  grid_square.style.backgroundColor = new_color;
}

function rainbow_mode(e) {
  const grid_square = e.target;
  let current_color = grid_square.style.backgroundColor;
  if (current_color == 'white') {
    let r = clamp(Math.random() * 255, 120, 255);
    let g = clamp(Math.random() * 255, 120, 255);
    let b = clamp(Math.random() * 255, 120, 255);
    let new_color = `rgb(${r}, ${g}, ${b})`;
    grid_square.style.backgroundColor = new_color;
  }
}


function clamp(number, lower, upper) {
    let result = Math.max(number, lower);
    result = Math.min(result, upper);
    return result;
}

function resize(_e) {
  let grid_size = clamp(parseInt(prompt("Enter the new grid size!")), 1, 100);
  grid_size = grid_size > 1 ? grid_size : 16;
  init(grid_size);
}

function rainbow(_e) {
  paint_white();
  select_mode(rainbow_mode);
}

function shading(e) {
  paint_white();
  select_mode(shading_mode);
}

function black(_e) {
  paint_white();
  select_mode(black_mode);
}


function init(grid_size) {
  const container = document.querySelector(".container");
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  let i = 0;
  let j = 0;
  for (i = 0; i < grid_size; i++) {
    const row_container = document.createElement('div');
    row_container.classList.add('row_container');
    for (j = 0; j < grid_size; j++) { 
        const div = document.createElement('div');
        div.style.backgroundColor = 'white';
        div.classList.add('grid_square');
        if (j == 0) {
          div.classList.add('left_edge');
        } 
        if (j == grid_size - 1) {
          div.classList.add('right_edge');
        } 
        if (i == 0) {
          div.classList.add('top_edge');
        } 
        if (i == grid_size - 1) {
          div.classList.add('bottom_edge');
        } 
        row_container.appendChild(div);
      }
    container.appendChild(row_container);
  }
  select_mode(black_mode);
}

function select_mode(mode_func) {
  const grid_squares = document.querySelectorAll('.grid_square');
  grid_squares.forEach(grid_square => {
    remove_all_listeners(grid_square);
    grid_square.addEventListener('mouseenter', mode_func);
  })
}

function paint_white() {
  const grid_squares = document.querySelectorAll('.grid_square');
  grid_squares.forEach(grid_square => {
    grid_square.style.backgroundColor = 'white';
  })
}

function remove_all_listeners(node) {
  node.removeEventListener('mouseenter', rainbow_mode);
  node.removeEventListener('mouseenter', shading_mode);
  node.removeEventListener('mouseenter', black_mode);
}

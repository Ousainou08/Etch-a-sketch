const container = document.querySelector('#container');
const resizeButton = document.getElementById('resize-button');
const clearButton = document.getElementById('clear-button');

const GRID_SIZE_PX = 486;

function createGrid(n) {
  container.innerHTML = '';

  const squareSize = Math.floor(GRID_SIZE_PX / n);

  for (let i = 0; i < n * n; i++) {
    const box = document.createElement('div');
    box.classList.add('square');

    box.style.width = `${squareSize}px`;
    box.style.height = `${squareSize}px`;

    // Store darkness level on the element (0 = no darkening)
    box.dataset.darkness = 0;

    box.addEventListener('mouseenter', () => {
      let darkness = Number(box.dataset.darkness);

      if (darkness < 10) {
        darkness += 1;
        box.dataset.darkness = darkness;

        // Generate random RGB color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Calculate opacity based on darkness (10 steps)
        const opacity = darkness * 0.1;

        // Set background color with opacity darkening effect
        box.style.backgroundColor = `rgba(${r},${g},${b},${opacity})`;
      }
    });

    container.appendChild(box);
  }
}

createGrid(16);

resizeButton.addEventListener('click', () => {
  let newSize = prompt("Enter new grid size (max 100):");
  newSize = Number(newSize);

  if (Number.isNaN(newSize) || newSize < 1 || newSize > 100) {
    alert("Invalid input! Please enter a number between 1 and 100.");
    return;
  }

  createGrid(newSize);
});

// Clear button resets all squares to lightgray and darkness 0
clearButton.addEventListener('click', () => {
  const squares = container.querySelectorAll('.square');
  squares.forEach(square => {
    square.style.backgroundColor = 'lightgray';
    square.dataset.darkness = 0;
  });
});

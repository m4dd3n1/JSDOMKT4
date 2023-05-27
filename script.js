const slider = document.querySelector('.slider');
const thumb = slider.querySelector('.slider-thumb');
const value = slider.querySelector('.slider-value');

const min = 0;
const max = 100;
let currentValue = 50;

function updateThumbPosition() {
  const thumbPosition = ((currentValue - min) / (max - min)) * (slider.offsetWidth - thumb.offsetWidth);
  thumb.style.left = thumbPosition + 'px';
}

function updateValueDisplay() {
  value.textContent = currentValue;
}

function handleMouseDown(event) {
  event.preventDefault();

  const startX = event.clientX;
  const thumbLeft = thumb.offsetLeft;

  function handleMouseMove(event) {
    const x = event.clientX - startX;
    const newThumbLeft = Math.max(0, Math.min(thumbLeft + x, slider.offsetWidth - thumb.offsetWidth));
    currentValue = Math.round((newThumbLeft / (slider.offsetWidth - thumb.offsetWidth)) * (max - min) + min);
    updateThumbPosition();
    updateValueDisplay();
  }

  function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

thumb.addEventListener('mousedown', handleMouseDown);

updateThumbPosition();
updateValueDisplay();
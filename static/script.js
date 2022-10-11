const WIDE = 'wide'
const FILL = 'fill'
const KEY_ESCAPE = 'Escape'
const KEY_ARROW_RIGHT = 'ArrowRight';
const KEY_ARROW_LEFT = 'ArrowLeft';

let currentModalImgSrc = ''

function onSelectChange(e) {
  document.querySelector('main').classList.remove(WIDE);
  document.querySelector('main').classList.remove(FILL);

  const v = e.target.value;
  if (v === WIDE) {
    document.querySelector('main').classList.add(WIDE);
  }
  if (v === FILL) {
    document.querySelector('main').classList.add(FILL);
  }
}

function onImgClick(e) {
  const src = e.target.src;
  document.body.classList.add('lock');
  updateModalImg(src);
}

function closeModal() {
  document.body.classList.remove('lock');
}

function next() {
  const currentImg = document.querySelector(`[src="${currentModalImgSrc}"]`);
  const nextSibling = currentImg.nextSibling;

  const src = nextSibling ? nextSibling.src : document.querySelector('.photos img').src;

  updateModalImg(src);
}
function previous() {
  const currentImg = document.querySelector(`[src="${currentModalImgSrc}"]`);
  const previousSibling = currentImg.previousSibling;

  let src = previousSibling ? previousSibling.src : '';
  if (!src) {
    const all = document.querySelectorAll('.photos img')
    src = all[all.length - 1].src;
  }

  updateModalImg(src);
}

function updateModalImg(src) {
  currentModalImgSrc = src;
  document.querySelector('.modal img').src = src;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.view select').oninput = onSelectChange;
  for (const elt of document.querySelectorAll('img')) {
    elt.onclick = onImgClick;
  }
  document.querySelector('.modal').onclick = closeModal;
  document.body.addEventListener('keyup', (e) => {
    if (e.key === KEY_ESCAPE) {
      closeModal();
    }
    if (document.body.classList.contains('lock')) {
      if (e.key === KEY_ARROW_RIGHT) {
        next();
      }
      if (e.key === KEY_ARROW_LEFT) {
        previous();
      }
    }

  });
});

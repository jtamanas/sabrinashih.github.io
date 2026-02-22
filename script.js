document.querySelectorAll('.card').forEach(function (card) {
  card.addEventListener('click', function () {
    card.classList.toggle('flipped');
  });
});

// Show hint pill after 5 seconds, dismiss with bubble-pop on click
(function () {
  var hint = document.getElementById('hint');
  var dismissed = false;

  var timer = setTimeout(function () {
    hint.classList.add('visible');
  }, 5000);

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(timer);

    if (hint.classList.contains('visible')) {
      hint.classList.add('popping');
      hint.addEventListener('animationend', function () {
        hint.classList.remove('visible', 'popping');
      }, { once: true });
    } else {
      hint.classList.remove('visible');
    }

    document.querySelector('.card-grid').removeEventListener('click', dismiss);
    hint.removeEventListener('click', dismiss);
  }

  document.querySelector('.card-grid').addEventListener('click', dismiss);
  hint.addEventListener('click', dismiss);
})();

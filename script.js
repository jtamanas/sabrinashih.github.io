document.querySelectorAll('.card').forEach(function (card) {
  const btnClose = card.querySelector('.card-btn-close');
  const btnExpand = card.querySelector('.card-btn-expand');

  card.addEventListener('click', function (e) {
    if (e.target.closest('.card-btn-icon')) return;
    if (card.classList.contains('expanded')) return;
    card.classList.toggle('flipped');
  });

  if (btnClose) {
    btnClose.addEventListener('click', async function (e) {
      e.stopPropagation();
      const isExpanded = card.classList.contains('expanded');

      if (isExpanded) {
        if (document.startViewTransition) {
          card.style.viewTransitionName = 'active-card';
          document.documentElement.classList.add('is-shrinking');
          document.documentElement.classList.remove('is-expanding');
          const transition = document.startViewTransition(() => {
            card.classList.remove('expanded');
            document.querySelector('.card-grid').classList.remove('has-expanded-card');
          });

          await transition.finished;
          document.documentElement.classList.remove('is-shrinking');
          card.style.viewTransitionName = '';
        } else {
          card.classList.remove('expanded');
          document.querySelector('.card-grid').classList.remove('has-expanded-card');
        }
        card.classList.remove('flipped');
      } else {
        card.classList.remove('flipped');
        card.classList.remove('expanded');
        document.querySelector('.card-grid').classList.remove('has-expanded-card');
      }
    });
  }

  if (btnExpand) {
    btnExpand.addEventListener('click', function (e) {
      e.stopPropagation();
      const grid = document.querySelector('.card-grid');
      const isExpanding = !card.classList.contains('expanded');

      if (document.startViewTransition) {
        card.style.viewTransitionName = 'active-card';
        if (isExpanding) {
          document.documentElement.classList.add('is-expanding');
          document.documentElement.classList.remove('is-shrinking');
        } else {
          document.documentElement.classList.add('is-shrinking');
          document.documentElement.classList.remove('is-expanding');
        }

        const transition = document.startViewTransition(() => {
          if (isExpanding) {
            document.querySelectorAll('.card.expanded').forEach(c => c.classList.remove('expanded'));
            card.classList.add('expanded');
            grid.classList.add('has-expanded-card');
          } else {
            card.classList.remove('expanded');
            grid.classList.remove('has-expanded-card');
          }
        });
        transition.finished.finally(() => {
          card.style.viewTransitionName = '';
          document.documentElement.classList.remove('is-expanding', 'is-shrinking');
          if (isExpanding) {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      } else {
        if (isExpanding) {
          document.querySelectorAll('.card.expanded').forEach(c => c.classList.remove('expanded'));
          card.classList.add('expanded');
          grid.classList.add('has-expanded-card');
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          card.classList.remove('expanded');
          grid.classList.remove('has-expanded-card');
        }
      }
    });
  }
});

// Toggle header blurb on name click (both sticky header and grid header)
(function () {
  var pairs = [
    { name: document.getElementById('header-name'), blurb: document.getElementById('header-blurb'), container: '.site-header' },
    { name: document.getElementById('grid-header-name'), blurb: document.getElementById('grid-header-blurb'), container: '.grid-header' }
  ];

  pairs.forEach(function (pair) {
    if (!pair.name || !pair.blurb) return;

    pair.name.addEventListener('click', function () {
      pair.blurb.classList.toggle('open');
    });
  });

  // Close blurbs when clicking outside their containers
  document.addEventListener('click', function (e) {
    pairs.forEach(function (pair) {
      if (!pair.blurb) return;
      if (!e.target.closest(pair.container)) {
        pair.blurb.classList.remove('open');
      }
    });
  });
})();

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

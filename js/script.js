document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.tab');
  var panels = {
    1: document.getElementById('hall1'),
    2: document.getElementById('hall2')
  };

  function activateHall(n) {
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.dataset.hall === String(n));
    });
    Object.keys(panels).forEach(function (key) {
      panels[key].classList.toggle('hidden', key !== String(n));
    });
  }

  // Клики по вкладкам цен
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateHall(tab.dataset.hall);
    });
  });

  // Клики по карточкам преимуществ с data-open-hall (пункт 04)
  document.querySelectorAll('.adv-card[data-open-hall]').forEach(function (card) {
    card.addEventListener('click', function () {
      activateHall(card.dataset.openHall);
    });
  });

  // Подсветка целевого блока при переходе
  function highlightTarget(hash) {
    var id = hash.replace('#', '');
    var el = document.getElementById(id);
    if (!el) return;

    var target = id === 'group' ? document.getElementById('hall2') : el;

    target.classList.remove('target-highlight');
    void target.offsetWidth;
    target.classList.add('target-highlight');

    setTimeout(function () {
      target.classList.remove('target-highlight');
    }, 1400);
  }

  // Перехват всех якорных ссылок: плавный скролл + подсветка
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = link.getAttribute('href');
      if (!hash || hash === '#' || hash.length < 2) return;

      var el = document.getElementById(hash.slice(1));
      if (!el) return;

      e.preventDefault();
      highlightTarget(hash);

      setTimeout(function () {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', hash);
      }, 30);
    });
  });

  // Если страница открыта сразу с хэшем (например, progym/#group)
  if (location.hash) {
    highlightTarget(location.hash);
  }
});
const envelopeScreen = document.getElementById('envelopeScreen');
const openEnvelope = document.getElementById('openEnvelope');
const site = document.getElementById('site');
const musicButton = document.getElementById('musicButton');
const audio = document.getElementById('bgMusic');
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
  setTimeout(() => {
    if (preloader) preloader.classList.add('hide');
  }, 250);
});

if (openEnvelope && envelopeScreen) {
  let envelopeOpening = false;
  openEnvelope.addEventListener('click', () => {
    if (envelopeOpening) return;
    envelopeOpening = true;
    openEnvelope.classList.add('open');

    // Музыку запускаем отдельно и НЕ ждём её ответа,
    // чтобы блокировка автозапуска не мешала открыть сайт.
    if (audio) {
      audio.play().catch(() => {});
    }

    window.setTimeout(() => {
      envelopeScreen.classList.add('opened');
      document.body.classList.remove('locked');
      document.body.classList.add('site-opened');
      if (site) site.setAttribute('aria-hidden', 'false');
      if (musicButton) {
        musicButton.hidden = false;
        if (audio && !audio.paused) musicButton.classList.add('playing');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1800);
  });
}

if (musicButton && audio) {

    let musicStarted = false;

    async function startMusic() {
        if (musicStarted && !audio.paused) return;

        try {
            await audio.play();
            musicStarted = true;
            musicButton.classList.add('playing');
        } catch (error) {
            console.log('Автозапуск музыки заблокирован браузером');
        }
    }

    // Запуск после открытия конверта
    if (openEnvelope) {
        openEnvelope.addEventListener('click', () => {
            setTimeout(startMusic, 700);
        });
    }

    // Управление с кнопки
    musicButton.addEventListener('click', async (event) => {
        event.stopPropagation();

        try {
            if (audio.paused) {
                await audio.play();
                musicStarted = true;
                musicButton.classList.add('playing');
            } else {
                audio.pause();
                musicButton.classList.remove('playing');
            }
        } catch (error) {
            alert('Добавьте файл assets/music.mp3');
        }
    });
}

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const weddingDate = new Date('2026-08-30T14:00:00+03:00');

function updateCountdown() {
  const difference = weddingDate.getTime() - Date.now();
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

  if (difference <= 0) {
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference / 3600000) % 24);
  const minutes = Math.floor((difference / 60000) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const SCRIPT_URL = '';
const form = document.getElementById('rsvpForm');
const status = document.getElementById('formStatus');

if (form && status) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.textContent = 'Отправляем…';
    const data = Object.fromEntries(new FormData(form).entries());

    if (!SCRIPT_URL) {
      localStorage.setItem('ismat-nastya-rsvp', JSON.stringify({ ...data, date: new Date().toISOString() }));
      status.textContent = 'Ответ сохранён на устройстве. Добавьте URL Apps Script для отправки в таблицу.';
      return;
    }

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      status.textContent = 'Спасибо! Ваш ответ отправлен.';
      form.reset();
    } catch (error) {
      status.textContent = 'Не удалось отправить. Попробуйте ещё раз.';
    }
  });
}

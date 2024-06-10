import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import imageUrl from '../img/alert-icon.svg';

const refs = {
  dateTime: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  timer: {
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
  },
};

let userSelectedDate;
let initTimeId;
refs.button.disabled = true;
refs.button.classList.add('disabled');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.show({
        title: 'ERROR',
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        titleSize: '16px',
        messageColor: '#fff',
        messageSize: '16px',
        progressBarColor: '#B51B1B',
        position: 'topRight',
        iconUrl: imageUrl,
        iconColor: '#FAFAFB',
        imageWidth: 302,
        theme: 'dark',
      });
    } else {
      userSelectedDate = selectedDates[0];
      refs.button.disabled = false;
      refs.button.classList.remove('disabled');
      refs.button.classList.add('enabled');
    }
  },
});

refs.button.addEventListener('click', () => {
  refs.button.disabled = true;
  refs.button.classList.remove('enabled');
  refs.button.classList.add('disabled');
  refs.dateTime.disabled = true;

  initTimeId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;

    if (diff <= 0) {
      clearInterval(initTimeId);
      iziToast.show({
        title: 'Time Up!',
        message: 'The countdown has finished.',
        backgroundColor: '#4CAF50',
        titleColor: '#fff',
        titleSize: '16px',
        messageColor: '#fff',
        messageSize: '16px',
        progressBarColor: '#1B5E20',
        position: 'topRight',
        iconUrl: imageUrl,
        iconColor: '#FAFAFB',
        imageWidth: 302,
        theme: 'dark',
      });
      return;
    }

    const time = convertMs(diff);
    updateTimer(time);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.timer.dataDays.textContent = days.toString().padStart(2, '0');
  refs.timer.dataHours.textContent = hours.toString().padStart(2, '0');
  refs.timer.dataMinutes.textContent = minutes.toString().padStart(2, '0');
  refs.timer.dataSeconds.textContent = seconds.toString().padStart(2, '0');
}

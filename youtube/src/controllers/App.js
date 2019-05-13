import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

// 'AIzaSyApT_ZFxRMHcuqpc4yARUZXZsGb75SICJU';
const key = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';
const chunk = 15;

export default class App {
  constructor() {
    this.state = {
      url: `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${chunk}&q=`,
      statisticsUrl: `https://www.googleapis.com/youtube/v3/videos?key=${key}&part=statistics&id=`,
    };
  }

  static slider() {
    // SLIDER
    const slider = document.querySelector('.items');
    let isDown = false;
    let isUp = true;
    let startX;
    // let scrollLeft;

    slider.addEventListener('mousedown', (event) => {
      isDown = true;
      startX = event.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      // scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      isUp = true;
    });

    slider.addEventListener('mousemove', (event) => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - slider.offsetLeft;

      const walk = (x - startX) * 1.5;
      if (walk < -85) {
        // slider.scrollLeft = scrollLeft - walk;
        if (isUp) {
          AppView.pagination();
          isUp = false;
        }
        const currentPage = +document.querySelector('.red').innerText;
        slider.scrollLeft = 1180 * (currentPage - 1);
      } else if (walk > 85) {
        if (isUp) {
          AppView.prevPagination();
          isUp = false;
        }
        const currentPage = +document.querySelector('.red').innerText;
        slider.scrollLeft = 1180 * (currentPage - 1);
      }
    });
  }

  static pagination() {
    const circles = document.querySelector('.list-mod');
    circles.addEventListener('click', (event) => {
      const currentCircle = +event.toElement.innerText;

      if (event.toElement.id !== 'last' && !event.toElement.classList.contains('red')) {
        event.toElement.childNodes[0].classList.remove('white');
        event.toElement.childNodes[0].classList.add('red');
        while (circles.childNodes[currentCircle].id !== 'last') {
          circles.childNodes[currentCircle].remove();
        }
        circles.lastChild.innerText = currentCircle + 1;
      }

      const slider = document.querySelector('.items');
      const pageNumber = +document.querySelector('.red').innerText;
      slider.scrollLeft = 1180 * (pageNumber - 1);
    });
  }

  async start() {
    let model = new AppModel(this.state);
    let data = await model.getClipInfo();
    data = await model.getClipStat(data);

    let view = new AppView(data);

    view.render();
    App.slider();

    document.getElementById('last').addEventListener('click', () => {
      AppView.pagination();
    });

    App.pagination();

    document.querySelector('input').addEventListener('keypress', async (event) => {
      if (event.keyCode === 13) {
        const search = document.querySelector('input').value;
        const posQ = this.state.url.indexOf('q=');
        const lastSearch = this.state.url.slice(posQ + 2, this.state.url.length);
        if (lastSearch !== search && lastSearch !== '') {
          this.state.url = this.state.url.replace(lastSearch, search);
        } else {
          this.state.url += search;
        }

        model = new AppModel(this.state);
        data = await model.getClipInfo();
        data = await model.getClipStat(data);

        view = new AppView(data);
        view.render();
      }
      App.slider();

      document.getElementById('last').addEventListener('click', () => {
        AppView.pagination();
      });

      App.pagination();
    });
  }
}

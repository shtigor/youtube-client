import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

// 'AIzaSyApT_ZFxRMHcuqpc4yARUZXZsGb75SICJU';
const key = 'AIzaSyB-y25GvRw1sBqTiWVfUjfe09h69hR76sU';
const chunk = 6;

export default class App {
  constructor() {
    this.state = {
      url: `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${chunk}&q=`,
      statisticsUrl: `https://www.googleapis.com/youtube/v3/videos?key=${key}&part=statistics&id=`,
      token: '',
    };
  }

  static slider() {
    // SLIDER
    const slider = document.querySelector('.items');
    let isDown = false;
    let isUp = true;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (event) => {
      isDown = true;
      startX = event.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
    });

    slider.addEventListener('mouseup', async () => {
      isDown = false;
      isUp = true;
    });

    slider.addEventListener('mousemove', (event) => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - slider.offsetLeft;

      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;

      const widthSlider = parseInt(getComputedStyle(slider).width, 10);
      if (walk < -85) {
        if (isUp) {
          AppView.pagination();
          isUp = false;
        }
        const currentPage = +document.querySelector('.red').innerText;
        slider.scrollLeft = widthSlider * (currentPage - 1);
      } else if (walk > 85) {
        if (isUp) {
          AppView.prevPagination();
          isUp = false;
        }
        const currentPage = +document.querySelector('.red').innerText;
        slider.scrollLeft = widthSlider * (currentPage - 1);
      }
    });
  }

  static pagination() {
    const circles = document.querySelector('.list-mod');
    circles.addEventListener('click', (event) => {
      const currentCircle = +event.target.innerText;

      if (event.target.id !== 'last' && !event.target.classList.contains('red')) {
        if (event.target.childNodes[0].tagName !== 'A') {
          event.target.childNodes[0].classList.remove('white');
          event.target.childNodes[0].classList.add('red');

          while (circles.childNodes[currentCircle].id !== 'last') {
            circles.childNodes[currentCircle].remove();
          }
          circles.lastChild.innerText = currentCircle + 1;
        }
      }

      const slider = document.querySelector('.items');
      const pageNumber = +document.querySelector('.red').innerText;
      const widthSlider = parseInt(getComputedStyle(slider).width, 10);
      slider.scrollLeft = widthSlider * (pageNumber - 1);
    });
  }

  async start() {
    let model = new AppModel();
    let data;

    let view = new AppView();
    view.render();

    document.querySelector('.search').addEventListener('keypress', async (event) => {
      if (event.keyCode === 13) {
        const search = document.querySelector('.search').value;
        const posQ = this.state.url.indexOf('q=');
        const lastSearch = this.state.url.slice(posQ + 2, this.state.url.length);
        if (lastSearch !== search && lastSearch !== '') {
          this.state.url = this.state.url.replace(lastSearch, search);
        } else {
          this.state.url += search;
        }

        model = new AppModel(this.state);
        data = await model.getClipInfo();

        this.state.token = data.token;
        this.state.url = `${this.state.url}&pageToken=${this.state.token}`;

        data = await model.getClipStat(data.video);

        view = new AppView(data);
        view.render();

        App.slider();

        App.pagination();

        document.querySelector('#last').addEventListener('click', async () => {
          AppView.pagination();

          const countVideos = +document.querySelector('.items').childElementCount;
          const countCircles = +document.querySelector('.list-mod').childElementCount;
          if (countVideos < countCircles * 4) {
            model = new AppModel(this.state);
            data = await model.getClipInfo();

            this.state.token = data.token;
            const posToken = this.state.url.indexOf('&pageToken=');
            this.state.url = this.state.url.slice(0, posToken);
            this.state.url = `${this.state.url}&pageToken=${this.state.token}`;

            data = await model.getClipStat(data.video);

            view = new AppView(data);
            view.render();
          }
        });

        const slider = document.querySelector('.items');
        slider.addEventListener('mouseup', async () => {
          const countVideos = +document.querySelector('.items').childElementCount;
          const countCircles = +document.querySelector('.list-mod').childElementCount;
          if (countVideos < countCircles * 4) {
            model = new AppModel(this.state);
            data = await model.getClipInfo();

            this.state.token = data.token;
            this.state.url = `${this.state.url}&pageToken=${this.state.token}`;

            this.state.token = data.token;
            const posToken = this.state.url.indexOf('&pageToken=');
            this.state.url = this.state.url.slice(0, posToken);
            this.state.url = `${this.state.url}&pageToken=${this.state.token}`;

            data = await model.getClipStat(data.video);

            view = new AppView(data);
            view.render();
          }
        });
      }
    });
  }
}

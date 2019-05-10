import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

//'AIzaSyApT_ZFxRMHcuqpc4yARUZXZsGb75SICJU';
const key = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';
const chunk = 4;

export default class App {
  constructor() {
    this.state = {
      url: `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${chunk}&q=`,
      statisticsUrl: `https://www.googleapis.com/youtube/v3/videos?key=${key}&part=statistics&id=`,
    };
  }

  async start() {
    let model = new AppModel(this.state);
    let data = await model.getClipInfo();
    data = await model.getClipStat(data);

    let view = new AppView(data);

    view.render();

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
    });

    document.getElementById('last').addEventListener('click', () => {
      view.pagination();
    });
  }
}

export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipInfo(data) {
    const videos = [];
    let item = {};
    for (let i = 0; i < data.items.length; i++) {
      item.id = data.items[i].id.videoId;

      item.title = `${data.items[i].snippet.title}`;
      if (item.title.length > 66) {
        item.title = `${item.title.slice(0, 66)} ...`;
      }

      item.description = `${data.items[i].snippet.description.slice(0, 100)} ...`;
      item.channelTitle = data.items[i].snippet.channelTitle;

      const [date] = data.items[i].snippet.publishedAt.split('T');
      item.publishAt = date;

      item.image = data.items[i].snippet.thumbnails.medium.url;
      item.link = `https://www.youtube.com/watch?v=${data.items[i].id.videoId}`;
      item.viewCount = 0;
      videos.push(item);
      item = {};
    }
    return videos;
  }

  static extractStatistic(data, stat) {
    const updatedData = data;
    for (let i = 0; i < data.length; i++) {
      updatedData[i].viewCount = stat.items[i].statistics.viewCount;
    }
    return updatedData;
  }

  async getClipInfo() {
    const { url } = this.state;

    // general info about videos
    const response = await fetch(url);
    const data = await response.json();

    return AppModel.extractClipInfo(data);
  }

  async getClipStat(data) {
    let { statisticsUrl } = this.state;

    const ids = [];
    for (let i = 0; i < data.length; i++) {
      ids.push(data[i].id);
    }


    // statistics about videos
    statisticsUrl += ids.join();
    const responseStat = await fetch(statisticsUrl);
    const statistics = await responseStat.json();

    return AppModel.extractStatistic(data, statistics);
  }
}

/* eslint-disable no-plusplus */
export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipInfo(data) {
    const videos = [];
    let item = {};
    for (let i = 0; i < data.items.length; i++) {
      item.title = data.items[i].snippet.title;
      item.description = data.items[i].snippet.description;
      item.channelTitle = data.items[i].snippet.channelTitle;

      const [date] = data.items[i].snippet.publishedAt.split('T');
      item.publishAt = date;

      item.image = data.items[i].snippet.thumbnails.medium.url;
      item.link = `https://www.youtube.com/watch?v=${data.items[i].id.videoId}`;
      videos.push(item);
      item = {};
    }
    return videos;
  }

  async getClipNames() {
    const { url } = this.state;

    const response = await fetch(url);
    const data = await response.json();

    return AppModel.extractClipInfo(data);
  }
}

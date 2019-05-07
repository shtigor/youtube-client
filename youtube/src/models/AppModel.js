export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipNames(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  async getClipNames() {
    const { url } = this.state;

    const response = await fetch(url);
    const data = await response.json();

    return AppModel.extractClipNames(data);
  }
}

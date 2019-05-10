export default class AppView {
  constructor(videos) {
    this.videos = videos;
  }

  render() {
    // Serach box
    if (!document.querySelector('input')) {
      const searchBox = document.createElement('input');
      searchBox.type = 'text';
      searchBox.placeholder = 'Search...';

      document.body.appendChild(searchBox);
    }


    // Videos
    if (document.querySelector('ul')) {
      const elem = document.querySelector('ul');
      elem.parentNode.removeChild(elem);
    }
    const content = document.createElement('ul');
    content.innerHTML = this.videos.map(item => `<li>
                                                  <img class="image-mod" src="${item.image}">
                                                  <a href="${item.link}" class="title-mod" target="_blank">${item.title}</a>
                                                  <p class="channel-mod">${item.channelTitle}</p>
                                                  <p class="date-mod">${item.publishAt}</p>
                                                  <p class="viewers-mod">${item.viewCount}</p>
                                                  <p class="description-mod">${item.description}</p>
                                                </li>`).join('');
    document.body.appendChild(content);
  }
}

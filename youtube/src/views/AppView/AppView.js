export default class AppView {
  constructor(videos) {
    this.videos = videos;
  }

  static pagination() {
    const firstCircle = document.getElementsByClassName('red');
    const lastCircle = document.getElementById('last');

    firstCircle[0].classList.remove('red');

    const newItem = document.createElement('a');
    newItem.setAttribute('href', '#');
    newItem.setAttribute('class', 'pagination-mod');

    const numPage = document.createElement('span');
    numPage.setAttribute('class', 'red');
    numPage.innerHTML = lastCircle.innerText;
    newItem.appendChild(numPage);
    lastCircle.innerHTML = `<span>${+lastCircle.innerText + 1}</span>`;

    const list = document.getElementsByClassName('list-mod');
    list[0].insertBefore(newItem, list[0].childNodes[list[0].childNodes.length - 1]);
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
    content.setAttribute('class', 'items');
    content.innerHTML = this.videos.map(item => `<li class="item">
                                                  <img class="image-mod" src="${item.image}">
                                                  <a href="${item.link}" class="title-mod" target="_blank">${item.title}</a>
                                                  <p class="channel-mod">${item.channelTitle}</p>
                                                  <p class="date-mod">${item.publishAt}</p>
                                                  <p class="viewers-mod">${item.viewCount}</p>
                                                  <p class="description-mod">${item.description}</p>
                                                </li>`).join('');
    document.body.appendChild(content);

    if (this.videos.length > 1) {
      const pagination = document.createElement('div');
      pagination.setAttribute('class', 'list-mod');
      pagination.innerHTML = '<a href="#" class="pagination-mod" id="first"><span class="red">1</span></a><a href="#" class="pagination-mod" id="last"><span>2</span></a>';

      document.body.appendChild(pagination);
    }
  }
}

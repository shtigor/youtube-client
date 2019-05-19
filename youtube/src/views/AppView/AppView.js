export default class AppView {
  constructor(videos) {
    this.videos = videos;
  }

  static pagination() {
    const firstCircle = document.querySelector('.red');
    const lastCircle = document.getElementById('last');

    firstCircle.classList.remove('red');
    firstCircle.classList.add('white');

    const newItem = document.createElement('a');
    newItem.setAttribute('href', '#');
    newItem.setAttribute('class', 'pagination-mod');

    const numPage = document.createElement('span');
    numPage.setAttribute('class', 'red');
    numPage.innerHTML = lastCircle.innerText;
    newItem.appendChild(numPage);
    lastCircle.innerHTML = `<span class="white">${+lastCircle.innerText + 1}</span>`;

    const list = document.querySelector('.list-mod');
    list.insertBefore(newItem, list.childNodes[list.childNodes.length - 1]);
  }

  static prevPagination() {
    const redCircle = document.querySelector('.red');
    const countCircles = document.querySelector('.list-mod').childElementCount;
    const lastCircle = document.getElementById('last');
    if (countCircles > 2) {
      const number = +redCircle.innerText;
      const prevElem = document.querySelector('.list-mod').childNodes[number - 2].childNodes[0];
      prevElem.classList.remove('white');
      prevElem.classList.add('red');

      lastCircle.innerText = number;

      document.querySelector('.list-mod').removeChild(document.querySelector('.list-mod').childNodes[number - 1]);
    }
  }

  static addMoreVideos(videos) {
    const ulElement = document.querySelector('.items');

    ulElement.innerHTML = videos.map(item => `<li class="item">
                                                  <img class="image-mod" src="${item.image}">
                                                  <a href="${item.link}" class="title-mod" target="_blank">${item.title}</a>
                                                  <p class="channel-mod">${item.channelTitle}</p>
                                                  <p class="date-mod">${item.publishAt}</p>
                                                  <p class="viewers-mod">${item.viewCount}</p>
                                                  <p class="description-mod">${item.description}</p>
                                                </li>`).join('');
    document.body.appendChild(ulElement);
  }

  render() {
    let search = document.querySelector('.search');

    // Serach box
    if (!search) {
      search = document.createElement('input');
      search.type = 'text';
      search.placeholder = 'Search...';
      search.setAttribute('class', 'search');

      document.body.appendChild(search);
    }

    if (search.value) {
      // Videos
      const ulElement = document.querySelector('ul');
      let content = '';
      if (ulElement && document.querySelector('.list-mod').childElementCount === 2) {
        const elem = document.querySelector('ul');
        elem.innerHTML = '';
      }

      if (ulElement) {
        content = ulElement;

        content.innerHTML += this.videos.map(item => `<li class="item">
                                                    <img class="image-mod" src="${item.image}">
                                                    <a href="${item.link}" class="title-mod" target="_blank">${item.title}</a>
                                                    <p class="channel-mod">${item.channelTitle}</p>
                                                    <p class="date-mod">${item.publishAt}</p>
                                                    <p class="viewers-mod">${item.viewCount}</p>
                                                    <p class="description-mod">${item.description}</p>
                                                  </li>`).join('');
        ulElement.innerHTML = content.innerHTML;
      } else {
        content = document.createElement('ul');
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
      }


      if (document.querySelector('.list-mod') && document.querySelector('.list-mod').childElementCount === 2) {
        const elem = document.querySelector('.list-mod');
        elem.parentNode.removeChild(elem);
      }

      if (document.querySelector('.list-mod') === null) {
        const pagination = document.createElement('div');
        pagination.setAttribute('class', 'list-mod');
        pagination.innerHTML = '<a href="#" class="pagination-mod" id="first"><span class="red">1</span></a><a href="#" class="pagination-mod" id="last"><span class="white">2</span></a>';

        document.body.appendChild(pagination);
      }
    }
  }
}

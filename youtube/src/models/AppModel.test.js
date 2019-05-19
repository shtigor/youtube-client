import AppModel from './AppModel';

describe('AppModel.extractClipNames', () => {
  it('Should be an instatnce of Function', () => {
    expect(AppModel.extractClipInfo).toBeInstanceOf(Function);
  });

  it('Should return object with array of string that contains clip titeles and token', () => {
    const data = { nextPage: 'some token' };
    const videos = {
      items: [
        {
          id: { videoId: 'id1' },
          snippet: {
            title: 'title 1',
            description: 'description 1',
            channelTitle: 'channel title 1',
            publishedAt: '2019-05-18T03:30:00.000Z',
            thumbnails: { medium: { url: 'image1' } },
            link: 'https://www.youtube.com/watch?v=id1',
          },
        },
        {
          id: { videoId: 'id2' },
          snippet: {
            title: 'title 2',
            description: 'description 2',
            channelTitle: 'channel title 2',
            publishedAt: '2019-05-18T03:30:00.000Z',
            thumbnails: { medium: { url: 'image2' } },
            link: 'https://www.youtube.com/watch?v=id2',
          },
        },
        {
          id: { videoId: 'id3' },
          snippet: {
            title: 'title 3',
            description: 'description 3',
            channelTitle: 'channel title 3',
            publishedAt: '2019-05-18T03:30:00.000Z',
            thumbnails: { medium: { url: 'image3' } },
            link: 'https://www.youtube.com/watch?v=id3',
          },
        },
      ],
    };

    const result = AppModel.extractClipInfo(videos);
    result.token = data.nextPage;

    expect(result).toEqual({
      video: [
        {
          id: 'id1',
          title: 'title 1',
          description: 'description 1 ...',
          channelTitle: 'channel title 1',
          publishAt: '2019-05-18',
          image: 'image1',
          link: 'https://www.youtube.com/watch?v=id1',
          viewCount: 0,
        },
        {
          id: 'id2',
          title: 'title 2',
          description: 'description 2 ...',
          channelTitle: 'channel title 2',
          publishAt: '2019-05-18',
          image: 'image2',
          link: 'https://www.youtube.com/watch?v=id2',
          viewCount: 0,
        },
        {
          id: 'id3',
          title: 'title 3',
          description: 'description 3 ...',
          channelTitle: 'channel title 3',
          publishAt: '2019-05-18',
          image: 'image3',
          link: 'https://www.youtube.com/watch?v=id3',
          viewCount: 0,
        },
      ],
      token: 'some token',
    });
  });
});

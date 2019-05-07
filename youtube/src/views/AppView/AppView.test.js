import AppView from './AppView';

describe('AppView.prototype.render', () => {
  it('Should be an instatnce of Function', () => {
    expect(AppView.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    const context = {
      titles: [
        'Video about JS',
        'Anpther video ...',
        'I need more video',
      ],
    };

    AppView.prototype.render.call(context);

    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

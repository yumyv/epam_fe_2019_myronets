class ShortPost extends Post {
  constructor(post, id) {
    super(post, id);
    this.id = id;
  }
  media() {
    const media = createDOMElement('div', 'post__media');
    const image = createDOMElement('img', 'post__img', 'post__img--blog');
    const videoBtnUrl = './img/sprite.svg#a-icon-play';
    image.setAttribute('src', this.post.imgUrl);
    image.setAttribute('alt', 'post pic');
    media.append(image);
    if (this.post.type === 'video') {
      media.append(makeSvgPic(videoBtnUrl, 'post__media-btn'));
    }
    return media;
  }

  postAudio() {
    const audio = createDOMElement('audio', 'post__audio', 'post__audio--blog');
    audio.setAttribute('controls', 'controls');
    const source = createDOMElement('source');
    source.setAttribute('src', this.post.mediaUrl);
    source.setAttribute('type', 'audio/mpeg');
    source.innerText = 'The audio tag is not supported by your browser.';
    const link = createDOMElement('a');
    link.setAttribute('href', this.post.mediaUrl);
    link.innerText = 'Download';
    audio.append(source);
    audio.append(link);
    return audio;
  }

  appendTextContainer(container) {
    const heading = createDOMElement('h2', 'post__heading', 'post__heading--md');
    heading.innerText = this.post.heading;
    const text = createDOMElement('p', 'post__text');
    text.innerText = this.post.text.slice(0, 300);
    container.append(heading);
    if (this.post.mediaUrl) {
      container.append(this.postAudio());
    }
    container.append(text);
  }

  content() {
    const content = createDOMElement('div', 'post__content');
    const textContainer = createDOMElement('div', 'post__text-container');
    this.appendTextContainer(textContainer);
    const moreBtn = createDOMElement('button', 'post__btn', 'post__btn--more', 'secondary-btn');
    moreBtn.innerText = 'Read more';
    const deleteBtn = createDOMElement('button', 'post__btn', 'post__btn--delete', 'secondary-btn');
    deleteBtn.innerText = 'Delete post';
    content.append(this.postInfo());
    content.append(textContainer);
    content.append(moreBtn);
    content.append(deleteBtn);
    return content;
  }

  textTypeContent() {
    const content = createDOMElement('div', 'post__text-container');
    const heading = createDOMElement('h2', 'post__heading', 'post__heading--md', 'post__heading--text');
    heading.innerText = this.post.heading;
    const text = createDOMElement('p', 'post__text');
    text.innerText = this.post.text.slice(0, 500);
    content.append(heading);
    content.append(text);
    return content;
  }

  asElement() {
    const post = createDOMElement('article', 'post', 'post--blog', `post--${this.post.type}`);
    post.dataset.id = this.id;
    if (this.post.type === 'text') {
      const moreBtn = createDOMElement('button', 'post__btn', 'post__btn--more', 'secondary-btn');
      moreBtn.innerText = 'Read more';
      const deleteBtn = createDOMElement('button', 'post__btn', 'post__btn--delete', 'secondary-btn');
      deleteBtn.innerText = 'Delete post';
      post.append(this.postInfo());
      post.append(this.textTypeContent());
      post.append(moreBtn);
      post.append(deleteBtn);
    } else {
      post.append(this.media());
      post.append(this.content());
    }
    return post;
  }
}

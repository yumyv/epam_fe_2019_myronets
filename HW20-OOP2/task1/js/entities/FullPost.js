class FullPost extends Post {
  postAudio() {
    const audio = createDOMElement('audio', 'post__audio');
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

  textContainer() {
    const container = createDOMElement('div', 'post__text-container');
    const text = createDOMElement('p', 'post__text');
    text.innerHTML = this.post.text;
    container.append(text);
    const quote = createDOMElement('p', 'post__text', 'post__text--quote');
    quote.innerHTML = this.post.quote;
    container.append(quote);
    return container;
  }

  appendSocLinks(container) {
    const socialImg = [
      './img/sprite.svg#a-icon-facebook', './img/sprite.svg#a-icon-dribbble', './img/sprite.svg#a-icon-instagram',
    ];
    for (let i = 0; i < this.post.socialLinks.length; i++) {
      let link = createDOMElement('a', 'post__soc-link', 'soc-links__link');
      link.setAttribute('href', this.post.socialLinks[i].link);
      link.append(makeSvgPic(socialImg[i], 'soc-links__img'));
      if (i === this.post.socialLinks.length - 1) {
        link = createDOMElement('a', 'post__soc-link', 'soc-links__link', 'post__soc-link--last');
        link.setAttribute('href', this.post.socialLinks[i].link);
        link.append(makeSvgPic(socialImg[i], 'soc-links__img'));
      }
      container.append(link);
    }
  }

  socLinks() {
    const container = createDOMElement('div', 'post__wrapper');
    const likes = createDOMElement('div', 'post__likes');
    const imgLikeUrl = './img/sprite.svg#a-icon-like-1';
    likes.append(makeSvgPic(imgLikeUrl, 'post__likes-pic'));
    const likesText = createDOMElement('p', 'post__likes-text');
    likesText.innerText = `${this.post.countOfLikes} likes`;
    likes.append(likesText);
    const socLinks = createDOMElement('div', 'soc-links');
    this.appendSocLinks(socLinks);
    container.append(likes);
    container.append(socLinks);
    return container;
  }

  asElement() {
    const post = createDOMElement('article', 'post');
    const heading = createDOMElement('h1', 'post__heading');
    heading.innerText = this.post.heading;
    const img = createDOMElement('img', 'post__img');
    img.setAttribute('src', this.post.imgUrl);
    img.setAttribute('alt', 'post img');
    post.append(heading);
    post.append(this.postInfo());
    post.append(img);
    if (this.post.mediaUrl) {
      post.append(this.postAudio());
    }
    post.append(this.textContainer());
    post.append(this.socLinks());
    return post;
  }
}

class Post {
  constructor(post) {
    this.post = post;
  }

  appendBasicElements(container, ...elements) {
    elements.forEach((element) => {
      container.append(element);
    });
  }

  addStars(container) {
    for (let i = 0; i < this.post.countOfFullStars; i++) {
      container.append(makeSvgPic(this.post.imgFullStarUrl, 'post__info-pic'));
    }
    for (let i = 0; i < this.post.countOfHalfStars; i++) {
      container.append(makeSvgPic(this.post.imgHalfStarUrl, 'post__info-pic'));
    }
    for (let i = 0; i < this.post.countOfEmptyStars; i++) {
      container.append(makeSvgPic(this.post.imgEmptyStarUrl, 'post__info-pic'));
    }
  }

  postInfoWrapper() {
    const container = createDOMElement('div', 'post__info-wrapper');
    const postInfoHeading = createDOMElement('h4', 'post__info-heading');
    postInfoHeading.innerText = this.post.author;
    const postInfoContainer = createDOMElement('div', 'post__info-container');
    const postInfoDate = createDOMElement('span', 'post__info-date', 'post__info-element');
    postInfoDate.innerText = this.post.date;
    const postInfoStatus = createDOMElement('span', 'post__info-status', 'post__info-element');
    postInfoStatus.innerText = this.post.time;
    const postInfoComments = createDOMElement('span', 'post__info-comments');
    postInfoComments.innerText = this.post.countOfComments;
    container.append(postInfoHeading);
    this.appendBasicElements(
      postInfoContainer,
      postInfoDate,
      postInfoStatus,
      makeSvgPic(this.post.imgCommentsUrl, 'post__info-pic'),
      postInfoComments,
    );
    this.addStars(postInfoContainer);
    container.append(postInfoContainer);
    return container;
  }

  postInfo() {
    const container = createDOMElement('div', 'post__info');
    const img = createDOMElement('img', 'post__info-img');
    img.setAttribute('src', this.post.imgAvatarUrl);
    img.setAttribute('alt', this.post.author);
    container.append(img);
    container.append(this.postInfoWrapper());
    return container;
  }
}

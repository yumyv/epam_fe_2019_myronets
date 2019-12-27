class Post {
  constructor(post) {
    this.post = post;
  }

  appendBasicElements(container, ...elements) {
    elements.forEach((element) => {
      container.append(element);
    });
  }

  addIfIntegerStars(container, MAXIMUM_STARS) {
    const imgFullStarUrl = './img/sprite.svg#Star-1';
    const imgEmptyStarUrl = './img/sprite.svg#Star-2';
    for (let i = 0; i < this.post.countOfStars; i++) {
      container.append(makeSvgPic(imgFullStarUrl, 'post__info-pic'));
    }
    for (let i = 0; i < MAXIMUM_STARS - this.post.countOfStars; i++) {
      container.append(makeSvgPic(imgEmptyStarUrl, 'post__info-pic'));
    }
  }

  addIfNotIntegerStars(container, MAXIMUM_STARS) {
    const imgFullStarUrl = './img/sprite.svg#Star-1';
    const imgEmptyStarUrl = './img/sprite.svg#Star-2';
    const imgHalfStarUrl = './img/sprite.svg#Group';
    for (let i = 0; i < Math.round(this.post.countOfStars) - 1; i++) {
      container.append(makeSvgPic(imgFullStarUrl, 'post__info-pic'));
    }
    container.append(makeSvgPic(imgHalfStarUrl, 'post__info-pic'));
    for (let i = 0; i < MAXIMUM_STARS - Math.round(this.post.countOfStars); i++) {
      container.append(makeSvgPic(imgEmptyStarUrl, 'post__info-pic'));
    }
  }

  addStars(container) {
    const MAXIMUM_STARS = 5;
    if ((this.post.countOfStars ^ 0) === this.post.countOfStars) {
      this.addIfIntegerStars(container, MAXIMUM_STARS);
    } else {
      this.addIfNotIntegerStars(container, MAXIMUM_STARS);
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
      makeSvgPic('./img/sprite.svg#a-icon-comment', 'post__info-pic'),
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

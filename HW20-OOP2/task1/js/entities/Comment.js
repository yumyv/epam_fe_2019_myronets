class Comment {
  constructor(comment, isFirst, isLast) {
    this.comment = comment;
    this.isFirst = isFirst;
    this.isLast = isLast;
  }

  image() {
    let container;
    if (this.isFirst) {
      container = createDOMElement('div', 'comment__img-container', 'comment__img-container--first');
    } else if (this.isLast) {
      container = createDOMElement('div', 'comment__img-container', 'comment__img-container--last');
    } else {
      container = createDOMElement('div', 'comment__img-container');
    }
    const image = createDOMElement('img', 'comment__img');
    image.setAttribute('src', this.comment.imgUrl);
    image.setAttribute('alt', this.comment.author);
    container.append(image);
    return container;
  }

  addStars(container) {
    for (let i = 0; i < this.comment.countOfFullStars; i++) {
      container.append(makeSvgPic(this.comment.imgFullStarUrl, 'comment__pic'));
    }
    for (let i = 0; i < this.comment.countOfHalfStars; i++) {
      container.append(makeSvgPic(this.comment.imgHalfStarUrl, 'comment__pic'));
    }
    for (let i = 0; i < this.comment.countOfEmptyStars; i++) {
      container.append(makeSvgPic(this.comment.imgEmptyStarUrl, 'comment__pic'));
    }
  }

  heading() {
    const container = createDOMElement('div', 'comment__wrapper');
    const headingContainer = createDOMElement('div', 'comment__heading-container');
    const heading = createDOMElement('h4', 'comment__heading');
    heading.innerText = this.comment.author;
    headingContainer.append(heading);
    this.addStars(headingContainer);
    const timeContainer = createDOMElement('div', 'comment__time-container');
    const time = createDOMElement('p', 'comment__time-text');
    time.innerText = this.comment.time;
    timeContainer.append(makeSvgPic(this.comment.imgTimeUrl, 'comment__pic'));
    timeContainer.append(time);
    container.append(headingContainer);
    container.append(timeContainer);
    return container;
  }

  content() {
    const content = createDOMElement('div', 'comment__container');
    const text = createDOMElement('p', 'comment__text');
    text.innerText = this.comment.text;
    content.append(this.heading());
    content.append(text);
    if (this.comment.btn.link) {
      const link = createDOMElement('a', 'comment__link');
      link.setAttribute('href', this.comment.btn.link);
      link.innerText = this.comment.btn.text;
      content.append(link);
    }
    return content;
  }

  asElement() {
    const comment = createDOMElement('article', 'comment');
    comment.append(this.image());
    comment.append(this.content());
    return comment;
  }
}

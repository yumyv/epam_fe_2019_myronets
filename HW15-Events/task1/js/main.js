const createDOMElement = (elemType, ...elemClass) => {
  const elem = document.createElement(elemType);
  if (elemClass.length > 0) {
    elem.classList.add(...elemClass);
  }
  return elem;
};

const makeSvgPic = (imgUrl, ...svgClasses) => {
  const pic = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  pic.classList.add(...svgClasses);
  const useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useTag.setAttribute('href', imgUrl);
  pic.append(useTag);
  return pic;
};

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

  appendParagraphs(container, arr) {
    arr.forEach((item) => {
      const text = createDOMElement('p', 'post__text');
      text.innerHTML = item;
      container.append(text);
    });
  }

  textContainer() {
    const container = createDOMElement('div', 'post__text-container');
    this.appendParagraphs(container, this.post.paragraphs);
    const firstHeading = createDOMElement('h2', 'post__text-heading');
    firstHeading.innerText = this.post.firstTextHeading;
    container.append(firstHeading);
    this.appendParagraphs(container, this.post.paragraphsAfterFirstTextHeading);
    const quote = createDOMElement('p', 'post__text', 'post__text--quote');
    quote.innerHTML = this.post.quote;
    container.append(quote);
    const secondHeading = createDOMElement('h2', 'post__text-heading');
    secondHeading.innerText = this.post.secondTextHeading;
    container.append(secondHeading);
    this.appendParagraphs(container, this.post.paragraphsAfterSecondTextHeading);
    return container;
  }

  appendSocLinks(container) {
    for (let i = 0; i < this.post.socialLinks.length; i++) {
      let link = createDOMElement('a', 'post__soc-link', 'soc-links__link');
      link.setAttribute('href', this.post.socialLinks[i].link);
      link.append(makeSvgPic(this.post.socialLinks[i].imgUrl, 'soc-links__img'));
      if (i === this.post.socialLinks.length - 1) {
        link = createDOMElement('a', 'post__soc-link', 'soc-links__link', 'post__soc-link--last');
        link.setAttribute('href', this.post.socialLinks[i].link);
        link.append(makeSvgPic(this.post.socialLinks[i].imgUrl, 'soc-links__img'));
      }
      container.append(link);
    }
  }

  socLinks() {
    const container = createDOMElement('div', 'post__wrapper');
    const likes = createDOMElement('div', 'post__likes');
    likes.append(makeSvgPic(this.post.imgLikeUrl, 'post__likes-pic'));
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

class ShortPost extends Post {
  media() {
    const media = createDOMElement('div', 'post__media');
    const image = createDOMElement('img', 'post__img', 'post__img--blog');
    image.setAttribute('src', this.post.imgUrl);
    image.setAttribute('alt', 'post pic');
    media.append(image);
    if (this.post.type === 'video') {
      media.append(makeSvgPic(this.post.videoBtnUrl, 'post__media-btn'));
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
    text.innerText = this.post.shortText;
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
    const btn = createDOMElement('button', 'post__btn', 'secondary-btn');
    btn.innerText = this.post.btn.text;
    content.append(this.postInfo());
    content.append(textContainer);
    content.append(btn);
    return content;
  }

  textTypeContent() {
    const content = createDOMElement('div', 'post__text-container');
    const heading = createDOMElement('h2', 'post__heading', 'post__heading--md', 'post__heading--text');
    heading.innerText = this.post.heading;
    const text = createDOMElement('p', 'post__text');
    text.innerText = this.post.shortText;
    content.append(heading);
    content.append(text);
    return content;
  }

  asElement() {
    const post = createDOMElement('article', 'post', 'post--blog', `post--${this.post.type}`);
    if (this.post.type === 'text') {
      const btn = createDOMElement('button', 'post__btn', 'secondary-btn');
      btn.innerText = this.post.btn.text;
      post.append(this.postInfo());
      post.append(this.textTypeContent());
      post.append(btn);
    } else {
      post.append(this.media());
      post.append(this.content());
    }
    return post;
  }
}

class LatestPost {
  constructor(post) {
    this.post = post;
  }

  info() {
    const info = document.createDocumentFragment();
    const date = createDOMElement('span', 'latest-post__date', 'latest-post__element');
    date.innerText = this.post.date;
    const status = createDOMElement('span', 'latest-post__status', 'latest-post__element');
    status.innerText = this.post.time;
    const comments = createDOMElement('span', 'latest-post__comments');
    comments.innerText = this.post.countOfComments;
    info.append(date);
    info.append(status);
    info.append(makeSvgPic(this.post.imgCommentsUrl, 'latest-post__pic'));
    info.append(comments);
    return info;
  }
}

class ShortLatestPost extends LatestPost {
  image() {
    const image = createDOMElement('img', 'latest-post__img', 'latest-post__img--md');
    image.setAttribute('src', this.post.imgUrl);
    image.setAttribute('alt', 'latest post');
    return image;
  }

  content() {
    const content = createDOMElement('div', 'latest-post__wrapper');
    const link = createDOMElement('a', 'latest-post__link');
    link.setAttribute('href', this.post.link);
    const heading = createDOMElement('h3', 'latest-post__heading', 'latest-post__heading--md');
    heading.innerText = this.post.heading;
    link.append(heading);
    const postInfo = createDOMElement('div', 'latest-post__container', 'latest-post__container--md');
    postInfo.append(this.info());
    content.append(link);
    content.append(postInfo);
    return content;
  }

  asElement() {
    const post = createDOMElement('article', 'latest-post', 'latest-post--md');
    post.append(this.image());
    post.append(this.content());
    return post;
  }
}

class FullLatestPost extends LatestPost {
  image() {
    const image = createDOMElement('img', 'latest-post__img');
    image.setAttribute('src', this.post.imgUrl);
    image.setAttribute('alt', 'latest post');
    return image;
  }

  link() {
    const link = createDOMElement('a', 'latest-post__link');
    link.setAttribute('href', this.post.link);
    const heading = createDOMElement('h3', 'latest-post__heading');
    heading.innerText = this.post.heading;
    link.append(heading);
    return link;
  }

  text() {
    const text = createDOMElement('p', 'latest-post__text');
    text.innerText = this.post.text;
    return text;
  }

  asElement() {
    const post = createDOMElement('article', 'latest-post');
    const postInfo = createDOMElement('div', 'latest-post__container');
    postInfo.append(this.info());
    post.append(this.image());
    post.append(this.link());
    post.append(this.text());
    post.append(postInfo);
    return post;
  }
}

class Portfolio {
  constructor(portfolio) {
    this.portfolio = portfolio;
  }

  image() {
    const image = createDOMElement('img', 'portfolio-post__img');
    image.setAttribute('src', this.portfolio.imgUrl);
    image.setAttribute('alt', 'portfolio');
    return image;
  }

  heading() {
    const heading = createDOMElement('h3', 'portfolio-post__heading');
    heading.innerText = this.portfolio.heading;
    return heading;
  }

  text() {
    const text = createDOMElement('p', 'portfolio-post__text');
    text.innerText = this.portfolio.text;
    return text;
  }

  asElement() {
    const portfolio = createDOMElement('article', 'portfolio-post');
    portfolio.append(this.image());
    portfolio.append(this.heading());
    portfolio.append(this.text());
    return portfolio;
  }
}

class Testimonial {
  constructor(testimonial) {
    this.testimonial = testimonial;
  }

  content() {
    const content = createDOMElement('div', 'testimonials-post__container');
    const quote = createDOMElement('p', 'testimonials-post__quote');
    quote.innerText = '“';
    const text = createDOMElement('p', 'testimonials-post__text');
    text.innerText = this.testimonial.text;
    const author = createDOMElement('p', 'testimonials-post__author');
    author.innerText = this.testimonial.author;
    const position = createDOMElement('p', 'testimonials-post__position');
    position.innerText = this.testimonial.position;
    content.append(quote);
    content.append(text);
    content.append(author);
    content.append(position);
    return content;
  }

  image() {
    const image = createDOMElement('img', 'testimonials-post__img');
    image.setAttribute('src', this.testimonial.imgUrl);
    image.setAttribute('alt', 'testimonials-post');
    return image;
  }

  asElement() {
    const testimonial = createDOMElement('div', 'testimonials-post');
    testimonial.append(this.content());
    testimonial.append(this.image());
    return testimonial;
  }
}

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

class PageBuilder {
  constructor(selector, page) {
    this.selector = document.querySelector(selector);
    this.page = page;
  }
}

class PostPage extends PageBuilder {
  constructor(selector, page, post) {
    super(selector, page, post);
    this.post = post;
  }

  appendLatestPosts(container) {
    this.page.post[0].content[0].listOfLatestPosts.forEach((item) => {
      const listItem = createDOMElement('li', 'latest-posts__item', 'latest-posts__item--md');
      listItem.append(new ShortLatestPost(item).asElement());
      container.append(listItem);
    });
  }

  latestPosts() {
    const posts = createDOMElement('section', 'aside__wrapper', 'aside__posts');
    const heading = createDOMElement('h2', 'aside__heading', 'main-heading__text');
    heading.innerText = this.page.post[0].content[0].heading;
    const postsList = createDOMElement('ul', 'aside__posts__list');
    this.appendLatestPosts(postsList);
    const btnContainer = createDOMElement('div', 'latest-posts__container');
    const btn = createDOMElement('button', 'latest-posts__btn', 'secondary-btn');
    btn.innerText = this.page.post[0].content[0].btn.text;
    btnContainer.append(btn);
    posts.append(heading);
    posts.append(postsList);
    posts.append(btnContainer);
    return posts;
  }

  categoryList(category) {
    const container = createDOMElement('div', 'category__container');
    const list = createDOMElement('ul', 'category__list');
    for (let i = 0; i < category.items.length; i++) {
      let item;
      if (i === 0) {
        item = createDOMElement('li', 'category__item', 'category__item--first');
      } else {
        item = createDOMElement('li', 'category__item');
      }
      const link = createDOMElement('a', 'category__link');
      link.setAttribute('href', category.items[i].link);
      link.innerText = category.items[i].text;
      item.append(link);
      list.append(item);
    }
    container.append(list);
    return container;
  }

  category(category) {
    const container = createDOMElement('div', 'category');
    const label = createDOMElement('label', 'category__label');
    label.setAttribute('for', category.name);
    label.innerText = category.heading;
    const input = createDOMElement('input', 'category__input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', category.name);
    input.setAttribute('name', category.name);
    container.append(label);
    container.append(input);
    container.append(this.categoryList(category));
    container.append(makeSvgPic(
      this.page.post[0].content[1].arrowButtons.imgUrl,
      'category__arrow',
      'category__arrow--closed',
    ));
    container.append(makeSvgPic(
      this.page.post[0].content[1].arrowButtons.imgUrl,
      'category__arrow',
      'category__arrow--opened',
    ));
    return container;
  }

  appendCategories(container) {
    this.page.post[0].content[1].listOfCategories.forEach((category) => {
      container.append(this.category(category));
    });
  }

  categories() {
    const categories = createDOMElement('section', 'aside__wrapper', 'categories');
    const heading = createDOMElement('h2', 'categories__heading', 'aside__heading', 'main-heading__text');
    heading.innerText = this.page.post[0].content[1].heading;
    categories.append(heading);
    this.appendCategories(categories);
    return categories;
  }

  appendTagsList(container) {
    const list = createDOMElement('ul', 'tags__list');
    this.page.post[0].content[2].items.forEach((item) => {
      const listItem = createDOMElement('li', 'tags__item');
      const link = createDOMElement('a', 'tags__link');
      link.setAttribute('href', item.link);
      link.innerText = item.text;
      listItem.append(link);
      list.append(listItem);
    });
    container.append(list);
  }

  tags() {
    const tags = createDOMElement('section', 'aside__wrapper', 'tags');
    const heading = createDOMElement('h2', 'tags__heading', 'aside__heading', 'main-heading__text');
    heading.innerText = this.page.post[0].content[2].heading;
    tags.append(heading);
    this.appendTagsList(tags);
    return tags;
  }

  aside() {
    const aside = createDOMElement('aside', 'aside');
    aside.append(this.latestPosts());
    aside.append(this.categories());
    aside.append(this.tags());
    return aside;
  }

  postAndAside() {
    const container = createDOMElement('div', 'row');
    container.append(new FullPost(this.post).asElement());
    container.append(this.aside());
    return container;
  }

  appendComments(container) {
    for (let i = 0; i < this.page.post[1].listOfComments.length; i++) {
      if (i === 0) {
        container.append(new Comment(this.page.post[1].listOfComments[i], true, false).asElement());
      } else if (i === this.page.post[1].listOfComments.length - 1) {
        container.append(new Comment(this.page.post[1].listOfComments[i], false, true).asElement());
      } else {
        container.append(new Comment(this.page.post[1].listOfComments[i]).asElement());
      }
    }
  }

  reviews() {
    const container = createDOMElement('div', 'row');
    const reviews = createDOMElement('div', 'reviews');
    const heading = createDOMElement('h2', 'reviews__heading', 'main-heading__text');
    heading.innerText = this.page.post[1].heading;
    const reviewsContainer = createDOMElement('div', 'reviews__container');
    this.appendComments(reviewsContainer);
    const btnContainer = createDOMElement('div', 'reviews__wrapper');
    const btn = createDOMElement('button', 'reviews__btn', 'secondary-btn');
    btn.innerText = this.page.post[1].btn.text;
    btnContainer.append(btn);
    reviews.append(heading);
    reviews.append(reviewsContainer);
    reviews.append(btnContainer);
    container.append(reviews);
    return container;
  }

  content() {
    const content = createDOMElement('div', 'container');
    content.append(this.postAndAside());
    content.append(this.reviews());
    return content;
  }

  init() {
    if (this.selector) {
      this.selector.append(this.content());
    }
  }
}

class HomePage extends PageBuilder {
  headingText(text) {
    const textRow = createDOMElement('div', 'row');
    const textContainer = createDOMElement('div', 'main-text__container');
    const textElement = createDOMElement('p', 'main-text');
    textElement.innerText = text;
    textContainer.append(textElement);
    textRow.append(textContainer);
    return textRow;
  }

  heading(headingText, text, selector) {
    const container = document.createDocumentFragment();
    const headingRow = createDOMElement('div', 'row');
    const headingContainer = createDOMElement('div', 'main-heading', selector);
    const heading = createDOMElement('h2', 'main-heading__text');
    heading.innerText = headingText;
    const headingElement = createDOMElement('span', 'main-heading__element');
    heading.append(headingElement);
    headingContainer.append(heading);
    headingRow.append(headingContainer);
    container.append(headingRow);
    if (text) {
      container.append(this.headingText(text));
    }
    return container;
  }

  folderElement(folder) {
    const container = createDOMElement('article', 'folder', `folder--${folder.name}`);
    const imgContainer = createDOMElement('div', 'folder__img-container');
    imgContainer.append(makeSvgPic(folder.imgUrl, 'folder__img'));
    const heading = createDOMElement('h4', 'folder__heading');
    heading.innerText = folder.heading;
    container.append(imgContainer);
    container.append(heading);
    return container;
  }

  appendFolderElements(container, folders) {
    folders.forEach((folder) => {
      container.append(this.folderElement(folder));
    });
  }

  aboutUsContent() {
    const aboutUsContent = createDOMElement('div', 'row');
    const container = createDOMElement('div', 'about-us__container');
    const row = createDOMElement('div', 'row');
    this.appendFolderElements(row, this.page.home[1].folders);
    container.append(row);
    const videoContainer = createDOMElement('div', 'about-us__video-container');
    const video = createDOMElement('video', 'about-us__video');
    video.setAttribute('src', this.page.home[1].video.src);
    video.setAttribute('poster', this.page.home[1].video.posterUrl);
    videoContainer.append(video);
    videoContainer.append(makeSvgPic(this.page.home[1].video.btnUrl, 'about-us__video-btn'));
    aboutUsContent.append(container);
    aboutUsContent.append(videoContainer);
    return aboutUsContent;
  }

  aboutUs() {
    const aboutUs = createDOMElement('section', 'about-us');
    aboutUs.id = 'aboutUs';
    const container = createDOMElement('div', 'container');
    container.append(this.heading(this.page.home[1].heading, this.page.home[1].text));
    container.append(this.aboutUsContent());
    aboutUs.append(container);
    return aboutUs;
  }

  postsSlider(posts) {
    const row = createDOMElement('div', 'row');
    const slider = createDOMElement('div', 'posts-slider');
    const wrapper = createDOMElement('div', 'posts-slider__wrapper');
    const list = createDOMElement('ul', 'posts-slider__list');
    posts.forEach((post) => {
      const item = createDOMElement('li', 'posts-slider__item');
      item.append(new FullLatestPost(post).asElement());
      list.append(item);
    });
    wrapper.append(list);
    slider.append(wrapper);
    row.append(slider);
    return row;
  }

  latestPosts() {
    const latestPosts = createDOMElement('section', 'latest-posts');
    const container = createDOMElement('div', 'container');
    container.append(this.heading(this.page.home[2].heading, this.page.home[2].text, 'latest-posts__heading'));
    container.append(this.postsSlider(this.page.home[2].listOfLatestPosts));
    latestPosts.append(container);
    return latestPosts;
  }

  controlsForPortfolioSlider() {
    const controlsContainer = createDOMElement('div', 'portfolio-slider__btn-container');
    const btnPrev = createDOMElement('div', 'portfolio-slider__btn', 'portfolio-slider__btn--prev');
    btnPrev.append(makeSvgPic(this.page.home[3].arrowButtons.imgUrl, 'portfolio-slider__btn-img'));
    const btnNext = createDOMElement('div', 'portfolio-slider__btn', 'portfolio-slider__btn--next');
    btnNext.append(makeSvgPic(this.page.home[3].arrowButtons.imgUrl, 'portfolio-slider__btn-img'));
    controlsContainer.append(btnPrev);
    controlsContainer.append(btnNext);
    return controlsContainer;
  }

  portfolioSlider(portfolio) {
    const row = createDOMElement('div', 'row');
    const slider = createDOMElement('div', 'portfolio-slider');
    const wrapper = createDOMElement('div', 'portfolio-slider__wrapper');
    const list = createDOMElement('ul', 'portfolio-slider__list');
    portfolio.forEach((portfolio) => {
      const item = createDOMElement('li', 'portfolio-slider__item');
      item.append(new Portfolio(portfolio).asElement());
      list.append(item);
    });
    wrapper.append(list);
    const btnContainer = createDOMElement('div', 'portfolio-slider__container');
    const btn = createDOMElement('button', 'secondary-btn');
    btn.innerText = this.page.home[3].btn.text;
    btnContainer.append(btn);
    slider.append(wrapper);
    slider.append(this.controlsForPortfolioSlider());
    slider.append(btnContainer);
    row.append(slider);
    return row;
  }

  latestPortfolio() {
    const latestPortfolio = createDOMElement('section', 'latest-portfolio');
    latestPortfolio.id = 'portfolio';
    const container = createDOMElement('div', 'container');
    container.append(this.heading(this.page.home[3].heading, this.page.home[3].text));
    container.append(this.portfolioSlider(this.page.home[3].listOfPortfolio));
    latestPortfolio.append(container);
    return latestPortfolio;
  }

  testimonialsSlider(testimonials) {
    const row = createDOMElement('div', 'row');
    const slider = createDOMElement('div', 'testimonials-slider');
    const wrapper = createDOMElement('div', 'testimonials-slider__wrapper');
    const list = createDOMElement('ul', 'testimonials-slider__list');
    const btnPrev = createDOMElement('div', 'testimonials-slider__btn', 'testimonials-slider__btn--prev');
    btnPrev.append(makeSvgPic(this.page.home[4].arrowButtons.imgUrl, 'testimonials-slider__btn-img'));
    wrapper.append(btnPrev);
    testimonials.forEach((testimonial) => {
      const item = createDOMElement('li', 'testimonials-slider__item');
      item.append(new Testimonial(testimonial).asElement());
      list.append(item);
    });
    wrapper.append(list);
    const btnNext = createDOMElement('div', 'testimonials-slider__btn', 'testimonials-slider__btn--next');
    btnNext.append(makeSvgPic(this.page.home[4].arrowButtons.imgUrl, 'testimonials-slider__btn-img'));
    wrapper.append(btnNext);
    slider.append(wrapper);
    row.append(slider);
    return row;
  }

  testimonials() {
    const testimonials = createDOMElement('div', 'testimonials');
    const container = createDOMElement('div', 'container');
    container.append(this.heading(this.page.home[4].heading));
    container.append(this.testimonialsSlider(this.page.home[4].items));
    testimonials.append(container);
    return testimonials;
  }

  content() {
    const content = document.createDocumentFragment();
    content.append(this.aboutUs());
    content.append(this.latestPosts());
    content.append(this.latestPortfolio());
    content.append(this.testimonials());
    return content;
  }

  init() {
    if (this.selector) {
      this.selector.append(this.content());
    }
  }
}

class BlogPage extends PageBuilder {
  constructor(selector, page, posts) {
    super(selector, page, posts);
    this.posts = posts;
  }

  heading(headingText) {
    const container = createDOMElement('div', 'blog__heading', 'main-heading');
    const heading = createDOMElement('h2', 'main-heading__text');
    heading.innerText = headingText;
    const headingElement = createDOMElement('span', 'main-heading__element');
    heading.append(headingElement);
    container.append(heading);
    return container;
  }

  searchBtn() {
    const btn = createDOMElement('button', 'search__submit');
    btn.setAttribute('type', 'submit');
    btn.append(makeSvgPic(this.page.blog[0].searchInput.imgUrl, 'search__pic'));
    return btn;
  }

  search() {
    const form = createDOMElement('form', 'form', 'search');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'post');
    const searchContainer = createDOMElement('div', 'blog__search');
    const label = document.createElement('label');
    const input = createDOMElement('input', 'search__input', 'form__input');
    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', this.page.blog[0].searchInput.placeholder);
    label.append(input);
    searchContainer.append(label);
    searchContainer.append(this.searchBtn());
    form.append(searchContainer);
    return form;
  }

  listOfPosts(posts) {
    const list = document.createDocumentFragment();
    posts.forEach((post) => {
      list.append(new ShortPost(post).asElement());
    });
    return list;
  }

  content() {
    const content = createDOMElement('div', 'container');
    const row = createDOMElement('div', 'row');
    const section = createDOMElement('section', 'blog');
    const btnContainer = createDOMElement('div', 'blog__wrapper');
    const btn = createDOMElement('button', 'blog__btn', 'secondary-btn');
    btn.innerText = this.page.blog[0].btn.text;
    btnContainer.append(btn);
    section.append(this.heading(this.page.blog[0].heading));
    section.append(this.search());
    section.append(this.listOfPosts(this.posts));
    section.append(btnContainer);
    row.append(section);
    content.append(row);
    return content;
  }

  init() {
    if (this.selector) {
      this.selector.append(this.content());
    }
  }
}

class Modules {
  constructor() {
    this.modules = [];
  }

  registerModule(module) {
    this.modules.push(module);
  }

  init() {
    this.modules.forEach((m) => {
      m.init();
    });
  }

  start() {
    this.init();
  }
}

class Slider {
  constructor(selector) {
    this.selector = document.querySelector(selector);
  }

  onCreate() {
  }

  onComponentsLoading() {
  }

  onBindEvents() {
  }

  animation(valuesAsObj, onFrame, onend) {
    const FRAME_TIME = 15;
    const frames = valuesAsObj.time / FRAME_TIME;
    const step = (valuesAsObj.endValue - valuesAsObj.startValue) / frames;
    const up = valuesAsObj.endValue > valuesAsObj.startValue;

    const conditionForZeroing = () => {
      if ((up && valuesAsObj.startValue >= valuesAsObj.endValue) || (!up && valuesAsObj.startValue <= valuesAsObj.endValue)) {
        clearInterval(inter);
        valuesAsObj.startValue = valuesAsObj.endValue;
      }
    };
    const terminationCondition = () => {
      onFrame(valuesAsObj.startValue);
      if (valuesAsObj.startValue === valuesAsObj.endValue && onend) {
        onend();
      }
    };

    const inter = setInterval(() => {
      valuesAsObj.startValue += step;
      conditionForZeroing();
      terminationCondition();
    }, FRAME_TIME);
  }

  init() {
    if (this.selector) {
      this.onComponentsLoading();
      this.onBindEvents();
      this.onCreate();
    }
  }
}

class LatestPortfolioSlider extends Slider {
  constructor(selector, autoScrollTime = 0, autoStop = false) {
    super(selector);
    this.autoScrollTime = autoScrollTime;
    this.autoStop = autoStop;
    this.isAnimation = false;
    this.clickStartX = 0;
    this.clickEndX = 0;
  }

  onComponentsLoading() {
    this.slideWrapper = this.selector.querySelector('.portfolio-slider__list');
    this.leftArrow = this.selector.querySelector('.portfolio-slider__btn--prev');
    this.rightArrow = this.selector.querySelector('.portfolio-slider__btn--next');
  }

  onBindEvents() {
    this.rightArrow.addEventListener('click', () => this.animateLeft());
    this.leftArrow.addEventListener('click', () => this.animateRight());
    this.selector.addEventListener('mouseenter', () => {
      this.autoStop = true;
    });
    this.selector.addEventListener('mouseleave', () => {
      this.autoStop = false;
    });
    this.selector.addEventListener('mousedown', (e) => {
      this.clickStartX = e.clientX;
    }, false);
    this.selector.addEventListener('mouseup', (e) => {
      this.clickEndX = e.clientX;
      this.handleGesture();
    }, false);
  }

  onCreate() {
    if (this.autoScrollTime > 0) {
      setInterval(() => {
        if (this.autoStop) {
          return;
        }
        this.autoAnimate();
      }, this.autoScrollTime);
    }
  }

  animateLeft() {
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    const values = {startValue: 0, endValue: -17, time: 1000};
    this.animation(values,
      (value) => {
        this.slideWrapper.style.transform = `translateX(${value}%)`;
      }, () => {
        if (this.slideWrapper.firstElementChild) {
          this.slideWrapper.appendChild(this.slideWrapper.firstElementChild);
          this.slideWrapper.style.transform = '';
          this.isAnimation = false;
        }
      });
  }

  animateRight() {
    if (this.isAnimation) {
      return;
    }
    this.isAnimation = true;
    this.slideWrapper.style.transform = 'translateX(-17%)';
    if (this.slideWrapper.firstElementChild) {
      this.slideWrapper.insertBefore(
        this.slideWrapper.lastElementChild,
        this.slideWrapper.firstElementChild,
      );
    }
    const values = {startValue: -17, endValue: 0, time: 1000};
    this.animation(values,
      (value) => {
        this.slideWrapper.style.transform = `translateX(${value}%)`;
      }, () => {
        this.slideWrapper.style.transform = '';
        this.isAnimation = false;
      });
  }

  autoAnimate() {
    this.animateLeft();
  }

  handleGesture() {
    const VALUE_FOR_SWIPE = 100;
    if ((this.clickStartX - this.clickEndX) > VALUE_FOR_SWIPE) {
      this.animateLeft();
    }
    if ((this.clickEndX - this.clickStartX) > VALUE_FOR_SWIPE) {
      this.animateRight();
    }
  }
}

const makeContent = (content) => {
  const postPage = new PostPage('.post-hook', content.pages[2], content.posts[1]);
  postPage.init();
  const homePage = new HomePage('.home-hook', content.pages[0]);
  homePage.init();
  const blogPage = new BlogPage('.blog-hook', content.pages[1], content.posts);
  blogPage.init();

  const modules = new Modules();
  modules.registerModule(new LatestPortfolioSlider('.portfolio-slider', 3000));
  modules.start();
};

fetch('./js/basicContent.json')
  .then((response) => response.json())
  .then((content) => makeContent(content));

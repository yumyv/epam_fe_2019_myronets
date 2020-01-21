class PostPage extends PageBuilder {
  constructor(selector, page) {
    super(selector, page);
    this.id = new URLSearchParams(location.search).get('id');
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
    fetch(`./api/list/${this.id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        this.post = response;
        this.selector.append(this.content());
      })
      .catch((err) => {
        document.querySelector('.header').insertAdjacentText('afterend', err);
      });
  }
}

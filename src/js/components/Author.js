import {createDOMElement} from '../functions/functions';

export default class Author {
  constructor(mediator, author) {
    this.mediator = mediator;
    this.author = author;
  }

  click() {
    this.mediator.notify(this, 'click');
  }

  postsAsElement(isAside) {
    const list = createDOMElement('ul', 'author-posts');
    if (isAside) {
      list.classList.add('author-posts--aside');
    }
    this.author.posts.forEach((post) => {
      const item = createDOMElement('li', 'author-posts__item');
      item.dataset.heading = post.heading;
      item.dataset.author = post.author;
      item.dataset.id = post.id;
      const btn = createDOMElement('button', 'author-posts__btn', 'primary-btn');
      btn.innerText = post.heading;
      item.append(btn);
      list.append(item);
    });
    return list;
  }

  asElement() {
    const element = createDOMElement('li', 'posts__item');
    element.dataset.author = this.author.author;
    const btn = createDOMElement('button', 'posts__btn', 'secondary-btn');
    btn.innerText = this.author.author;
    element.append(btn);
    return element;
  }
}

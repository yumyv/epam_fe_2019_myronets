import {createDOMElement} from '../functions/functions';

export default class Author {
  constructor(mediator, author) {
    this.mediator = mediator;
    this.author = author;
  }

  click() {
    this.mediator.notify(this, 'click');
  }

  cliked() {

  }

  postsAsElement() {
    const list = createDOMElement('ul', 'posts');
    return list;
  }

  asElement() {
    const element = createDOMElement('li', 'posts__item');
    element.dataset.id = this.author.id;
    const btn = createDOMElement('button', 'posts__btn', 'secondary-btn');
    btn.innerText = this.author.author;
    element.append(btn);
    return element;
  }
}

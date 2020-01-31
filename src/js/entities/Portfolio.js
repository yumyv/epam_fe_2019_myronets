import {createDOMElement} from '../functions/functions';

export default class Portfolio {
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

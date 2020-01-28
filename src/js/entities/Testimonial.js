import {createDOMElement} from '../functions/functions';

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
    const image = createDOMElement('div', 'testimonials-post__img');
    image.style.background = `url(${this.testimonial.imgUrl})`;
    image.style.backgroundPosition = 'center';
    image.style.backgroundSize = 'cover';
    return image;
  }

  asElement() {
    const testimonial = createDOMElement('div', 'testimonials-post');
    testimonial.append(this.content());
    testimonial.append(this.image());
    return testimonial;
  }
}

export default Testimonial;

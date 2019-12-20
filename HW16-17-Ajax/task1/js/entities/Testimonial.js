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

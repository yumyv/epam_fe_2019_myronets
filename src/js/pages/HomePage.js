import PageBuilder from './PageBuilder';
import {createDOMElement, makeSvgPic} from '../functions/functions';
import FullLatestPost from '../entities/FullLatestPost';
import Portfolio from '../entities/Portfolio';
import Testimonial from '../entities/Testimonial';

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
    testimonials.forEach((testimonial) => {
      const item = createDOMElement('li', 'testimonials-slider__item');
      item.append(new Testimonial(testimonial).asElement());
      list.append(item);
    });
    wrapper.append(list);
    const btnNext = createDOMElement('div', 'testimonials-slider__btn', 'testimonials-slider__btn--next');
    btnNext.append(makeSvgPic(this.page.home[4].arrowButtons.imgUrl, 'testimonials-slider__btn-img'));
    slider.append(btnPrev);
    slider.append(wrapper);
    slider.append(btnNext);
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
    this.selector.append(this.content());
    setTimeout(() => {
      $(this.selector).modalWindow({
        type: 'info',
        text: 'Subscribe to this blog and be the first to know about updates.',
        isAdditionalBtn: false,
        onSuccess: () => {},
      });
    }, 10000);
  }
}

export default HomePage;

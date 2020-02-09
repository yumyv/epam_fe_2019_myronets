import PageBuilder from './PageBuilder';
import {createDOMElement, makeSvgPic} from '../functions/functions';
import ShortPost from '../entities/ShortPost';
import PostManager from '../modules/PostManager';
import FilterForPosts from '../modules/FilterForPosts';

export default class BlogPage extends PageBuilder {
  constructor(selector, page) {
    super(selector, page);
    this.id = new URLSearchParams(location.search).get('id');
    this.postApiUrl = 'http://localhost:3000/api/articles/';
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

  resetBtn() {
    const btnContainer = createDOMElement('div', 'search__btn-container');
    const btn = createDOMElement('input', 'search__btn', 'search__reset-btn', 'secondary-btn');
    btn.setAttribute('type', 'reset');
    btnContainer.append(btn);
    return btnContainer;
  }

  outputSearchResult() {
    const container = createDOMElement('div', 'search__result-container');
    const result = createDOMElement('div', 'search__result');
    container.append(result);
    return container;
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
    searchContainer.append(this.resetBtn());
    form.append(searchContainer);
    form.append(this.outputSearchResult());
    return form;
  }

  listOfPosts(posts) {
    if (posts.length > 0) {
      const list = createDOMElement('div', 'posts-wrapper');
      posts.reverse().forEach((post) => {
        list.append(new ShortPost(post, post.id).asElement());
      });
      return list;
    } else {
      return createDOMElement('div', 'posts-wrapper')
        .innerText = 'There are no posts here, you can add new by clicking the button above.';
    }
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
    fetch(this.postApiUrl, {
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
        this.posts = response;
        this.selector.append(this.content());
      })
      .then(() => {
        new PostManager('.blog-hook').init();
        new FilterForPosts('.search').init();
      })
      .catch((err) => {
        document.querySelector('.header').insertAdjacentText('afterend', err);
      });
  }
}

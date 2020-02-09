import PageBuilder from './PageBuilder';
import PostManager from '../modules/PostManager';
import PostsMediator from '../components/PostsMediator';
import Author from '../components/Author';
import {createDOMElement} from '../functions/functions';

export default class PostsPage extends PageBuilder {
  constructor(selector) {
    super(selector);
    this.id = new URLSearchParams(location.search).get('id');
    this.postApiUrl = 'http://localhost:3000/api/articles/';
    this.postsMediator = new PostsMediator(this.selector);
  }

  onBindEvents() {
    this.selector.addEventListener('click', (event) => this.clickEvent(event));
  }

  findAuthorFromMediator(authorName) {
    let author = {};
    for (const key in this.postsMediator.authors) {
      if (key === authorName) {
        author = this.postsMediator.authors[key];
      }
    }
    return author;
  }

  clickEvent(event) {
    if (event.target.closest('.posts__item')) {
      this.findAuthorFromMediator(event.target.closest('.posts__item').getAttribute('data-author')).click();
    }
  }

  getAuthors() {
    const authors = [];
    const uniqueAuthors = [...new Set(this.posts.map((post) => post.author))];
    uniqueAuthors.forEach((author) => {
      authors.push({author, posts: []});
    });
    this.posts.forEach((post) => {
      authors.forEach((author) => {
        if (author.author === post.author) {
          author.posts.push(post);
        }
      });
    });
    return authors;
  }

  makeListOfAuthors(isAside) {
    const list = createDOMElement('ul', 'posts');
    if (isAside) {
      list.classList.add('posts--aside');
    }
    this.getAuthors().forEach((author) => {
      const newAuthor = new Author(this.postsMediator, author);
      this.postsMediator.addAuthor(newAuthor);
      list.append(newAuthor.asElement());
    });
    return list;
  }

  makeAsideContent() {
    const aside = createDOMElement('section', 'posts-aside');
    aside.append(this.makeListOfAuthors(true));
    return aside;
  }

  makeMainContent() {
    const section = createDOMElement('section', 'posts-post');
    section.append(this.makeListOfAuthors(false));
    const defaultContent = createDOMElement('div', 'default-post');
    const defaultPic = createDOMElement('img', 'default-post__img');
    defaultPic.setAttribute('src', './img/no-content.png');
    defaultContent.append(defaultPic);
    section.append(defaultContent);
    return section;
  }

  content() {
    const content = createDOMElement('div', 'container');
    const row = createDOMElement('div', 'row');
    row.append(this.makeMainContent());
    row.append(this.makeAsideContent());
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
        this.onBindEvents();
        new PostManager('.posts-hook').init();
      })
      .catch((err) => {
        document.querySelector('.header').insertAdjacentText('afterend', err);
      });
  }
}

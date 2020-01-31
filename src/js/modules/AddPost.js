import Module from './Module';
import {createDOMElement, isValidTitle} from '../functions/functions';

export default class AddPost extends Module {
  constructor(selector) {
    super(selector);
    this.postApiUrl = 'http://localhost:3000/api/articles';
  }

  onComponentsLoading() {
    this.fade = document.querySelector('.add-post-fade');
    this.addBtn = document.querySelector('.add-post-form__add');
    this.closeBtn = document.querySelector('.add-post-form__cancel');
  }

  onBindEvents() {
    this.selector.addEventListener('click', () => this.fade.style.display = 'block');
    this.closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.fade.style.display = 'none';
    });
    this.addBtn.addEventListener('click', (e) => this.addPost(e));
  }

  successRedirect(id) {
    const url = new URL(`${document.URL.substr(0, document.URL.lastIndexOf('/'))}/post.html`);
    const params = new URLSearchParams(location.search);
    params.set('id', id);
    url.search = params.toString();
    window.location.href = url.toString();
  }

  // eslint-disable-next-line max-statements
  addPost(e) {
    e.preventDefault();
    if (isValidTitle(this.fade.querySelector('#postTitle').value)) {
      const post = {};
      post.type = this.fade.querySelector('#postType').value;
      post.imgUrl = this.fade.querySelector('#postImg').value;
      post.heading = this.fade.querySelector('#postTitle').value;
      post.author = this.fade.querySelector('#postAuthor').value;
      const date = new Date();
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      post.date = `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`;
      post.text = this.fade.querySelector('#postText').value;
      post.quote = this.fade.querySelector('#postQuote').value;

      fetch(this.postApiUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return null;
          }
        })
        .then((response) => {
          this.successRedirect(response.id);
        })
        .catch((err) => {
          this.fade.querySelector('.form__heading').insertAdjacentText('afterend', err);
        });
    } else {
      const output = createDOMElement('p', 'form__output');
      output.style.color = 'red';
      output.innerText = 'Invalid input';
      if (!this.fade.querySelector('.form__output')) {
        this.fade.querySelector('.add-post-form ').insertBefore(output, this.fade.querySelector('#postTitle'));
      }
    }
  }

  init() {
    this.onComponentsLoading();
    this.onBindEvents();
  }
}

import Module from './Module';
import {isValidTitle} from '../functions/functions';

export default class PostManager extends Module {
  constructor(selector) {
    super(selector);
    this.postApiUrl = 'http://localhost:3000/api/articles/';
  }
  onBindEvents() {
    this.selector.addEventListener('click', (event) => this.clickEvent(event));
  }

  deletePost(id) {
    fetch(`${this.postApiUrl}${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return $(this.selector).modalWindow({
            type: 'success',
            text: 'Post deleted successfully',
            onSuccess: () => {
              location.reload();
            },
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        document.querySelector('.header').insertAdjacentText('afterend', err);
      });
  }

  sendEditedPost(id, editedPost) {
    fetch(`${this.postApiUrl}${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPost),
    })
      .then((response) => {
        if (response.ok) {
          return $(this.selector).modalWindow({
            type: 'success',
            text: 'Post edited successfully',
            onSuccess: () => {
              location.reload();
            },
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        this.fade.querySelector('.form__heading').insertAdjacentText('afterend', err);
      });
  }

  changePost(id, post) {
    $(this.selector).modalWindow({
      type: 'info',
      text: 'Edit post text:',
      isAdditionalBtn: true,
      onSuccess: () => {
        if (isValidTitle(this.selector.querySelector('#newHeading').value)) {
          post.text = this.selector.querySelector('.modal__textarea').value;
          post.type = this.selector.querySelector('#newType').value;
          post.imgUrl = this.selector.querySelector('#newImgUrl').value;
          post.heading = this.selector.querySelector('#newHeading').value;
          post.author = this.selector.querySelector('#newAuthor').value;
          post.quote = this.selector.querySelector('#newQuote').value;
          post.imgAvatarUrl = this.selector.querySelector('#newImgAvatarUrl').value;
          post.mediaUrl = this.selector.querySelector('#newMediaUrl').value;
          this.sendEditedPost(id, post);
        }
        if (!isValidTitle(this.selector.querySelector('#newHeading').value)) {
          alert('Invalid heading!');
        }
      },
      isTextArea: true,
      textAreaValue: post.text,
      textAreaClass: 'modal__textarea',
      isAdditionalInputs: true,
      additionalInputs: [
        {id: 'newType', value: post.type, text: 'Edit type:'},
        {id: 'newImgUrl', value: post.imgUrl, text: 'Edit imgUrl:'},
        {id: 'newHeading', value: post.heading, text: 'Edit heading:'},
        {id: 'newAuthor', value: post.author, text: 'Edit author:'},
        {id: 'newQuote', value: post.quote, text: 'Edit quote:'},
        {id: 'newImgAvatarUrl', value: post.imgAvatarUrl, text: 'Edit imgAvatarUrl:'},
        {id: 'newMediaUrl', value: post.mediaUrl, text: 'Edit mediaUrl:'},
      ],
    });
  }

  editPost(id) {
    fetch(`${this.postApiUrl}${id}`, {
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
        this.changePost(id, response);
      })
      .catch((err) => {
        document.querySelector('.header').insertAdjacentText('afterend', err);
      });
  }

  clickEvent(event) {
    if (event.target.closest('.post__btn--more')) {
      const url = new URL(`${document.URL.substr(0, document.URL.lastIndexOf('/'))}/post.html`);
      const params = new URLSearchParams(location.search);
      params.set('id', event.target.closest('.post').getAttribute('data-id'));
      url.search = params.toString();
      window.location.href = url.toString();
    }
    if (event.target.closest('.post__btn--delete')) {
      $(this.selector).modalWindow({
        type: 'error',
        text: 'Are you sure you want to delete this post?',
        isAdditionalBtn: true,
        onSuccess: () => {
          this.deletePost(event.target.closest('.post').getAttribute('data-id'));
        },
      });
    }
    if (event.target.closest('.post__btn--edit')) {
      this.editPost(event.target.closest('.post').getAttribute('data-id'));
    }
  }

  init() {
    this.onBindEvents();
  }
}

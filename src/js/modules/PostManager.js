import Module from './Module';

class PostManager extends Module {
  onBindEvents() {
    this.selector.addEventListener('click', (event) => this.clickEvent(event));
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
        onSuccess: () => {},
      });
    }
  }

  init() {
    this.onBindEvents();
  }
}

export default PostManager;

class ShowPost extends Module {
  onBindEvents() {
    this.selector.addEventListener('click', (event) => this.showPost(event));
  }

  showPost(event) {
    if (event.target.closest('.post__btn')) {
      const url = new URL(`${window.location.origin}/post.html`);
      const params = new URLSearchParams(location.search);
      params.set('id', event.target.closest('.post').getAttribute('data-id'));
      url.search = params.toString();
      window.location.href = url.toString();
    }
  }

  init() {
    this.onBindEvents();
  }
}

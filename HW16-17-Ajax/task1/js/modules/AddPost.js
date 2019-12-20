class AddPost extends Module {
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

  // eslint-disable-next-line max-statements
  addPost(e) {
    e.preventDefault();
    if (isValidTitle(this.fade.querySelector('#postTitle').value)) {
      const post = {};
      post.id = Date.now();
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

      post.time = '12 min read';
      post.imgAvatarUrl = './img/Sarah.png';
      post.mediaUrl = '';
      post.videoBtnUrl = '';
      post.imgCommentsUrl = './img/sprite.svg#a-icon-comment';
      post.imgFullStarUrl = './img/sprite.svg#Star-1';
      post.imgHalfStarUrl = './img/sprite.svg#Group';
      post.imgEmptyStarUrl = './img/sprite.svg#Star-2';
      post.imgLikeUrl = './img/sprite.svg#a-icon-like-1';
      post.countOfComments = 0;
      post.countOfFullStars = 0;
      post.countOfHalfStars = 0;
      post.countOfEmptyStars = 0;
      post.countOfLikes = 0;
      post.btn = {text: 'Read more'};
      post.socialLinks = [
        {name: 'facebook', imgUrl: './img/sprite.svg#a-icon-facebook', link: '#'},
        {name: 'dribbble', imgUrl: './img/sprite.svg#a-icon-dribbble', link: '#'},
        {name: 'instagram', imgUrl: './img/sprite.svg#a-icon-instagram', link: '#'},
      ];

      fetch('./api/create-article', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then((response) => {
          if (response.ok) {
            const url = new URL(`${window.location.origin}/post.html`);
            const params = new URLSearchParams(location.search);
            params.set('id', post.id.toString());
            url.search = params.toString();
            window.location.href = url.toString();
          }
        })
        .catch((err) => {
          this.fade.querySelector('.form__heading').insertAdjacentText('afterend', err);
        });
    } else {
      this.fade.querySelector('#postTitle').insertAdjacentText('afterend', 'Invalid input');
    }
  }

  init() {
    this.onComponentsLoading();
    this.onBindEvents();
  }
}

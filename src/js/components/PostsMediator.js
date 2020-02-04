import ShortPost from '../entities/ShortPost';

export default class PostsMediator {
  constructor(selector) {
    this.authors = {};
    this.globalSelector = selector;
  }

  addAuthor(author) {
    this.authors[author.author.author] = author;
  }

  getAuthorByName(authorName) {
    let author = {};
    for (const key in this.authors) {
      if (key === authorName) {
        author = this.authors[key];
      }
    }
    return author;
  }

  appendPost(event) {
    if (event.target.closest('.author-posts__item')) {
      const author = this.getAuthorByName(
        event.target.closest('.author-posts__item').getAttribute('data-author'),
      );
      const post = author.author.posts.find((post) => {
        return post.heading === event.target.closest('.author-posts__item').getAttribute('data-heading');
      });
      if (this.globalSelector.querySelector('.default-post')) {
        this.globalSelector.querySelector('.default-post').style.display = 'none';
      }
      if (this.globalSelector.querySelector('.post')) {
        this.globalSelector.querySelector('.post').remove();
      }
      this.globalSelector.querySelector('.posts-post').append(new ShortPost(post, post.id).asElement());
    }
  }

  showPost(event) {
    if (event.target.closest('.author-posts__item')) {
      this.globalSelector.querySelectorAll('.author-posts__item')
        .forEach((btn) => {
          btn.querySelector('.author-posts__btn').classList.remove('author-posts__btn--active');
        });
      this.globalSelector.querySelectorAll('.author-posts__item')
        .forEach((btn) => {
          if (btn.getAttribute('data-id') ===
            event.target.closest('.author-posts__item').getAttribute('data-id')) {
            btn.querySelector('.author-posts__btn').classList.add('author-posts__btn--active');
          }
        });
      this.appendPost(event);
    }
  }

  onBindEvents() {
    this.globalSelector.addEventListener('click', (event) => this.showPost(event));
  }

  appendPosts(author) {
    this.globalSelector.querySelector('.default-post').style.display = 'block';
    if (this.globalSelector.querySelector('.post')) {
      this.globalSelector.querySelector('.post').remove();
    }
    this.globalSelector.querySelectorAll('.author-posts')
      .forEach((authorElement) => {
        authorElement.remove();
      });
    this.globalSelector.querySelectorAll('.posts__item')
      .forEach((authorElement) => {
        authorElement.querySelector('.posts__btn').classList.remove('posts__btn--active');
      });
    this.globalSelector.querySelectorAll('.posts__item')
      .forEach((authorElement) => {
        if (authorElement.getAttribute('data-author') === author.author.author) {
          authorElement.querySelector('.posts__btn').classList.add('posts__btn--active');
          if (authorElement.parentElement.parentElement.classList.contains('posts-aside')) {
            authorElement.insertAdjacentElement('afterend', author.postsAsElement(true));
          } else {
            authorElement.parentElement.insertAdjacentElement('afterend', author.postsAsElement(false));
          }
        }
      });
  }

  manageAuthorsPosts(author) {
    const allAuthors = document.querySelectorAll('[data-author]');
    allAuthors.forEach((authorElement) => {
      if (authorElement.getAttribute('data-author') === author.author.author) {
        this.appendPosts(author);
      }
    });
  }

  notify(author, event) {
    if (event === 'click') {
      this.onBindEvents();
      this.manageAuthorsPosts(author);
    }
  }
}

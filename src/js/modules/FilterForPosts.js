class FilterForPosts extends Module {
  onCreate() {
    this.filterFromStorage();
  }

  onBindEvents() {
    this.input.addEventListener('keyup', () => {
      this.filterFromInput();
    });
    this.searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
    });
    this.resetBtn.addEventListener('click', () => {
      this.resetFilter();
    });
  }

  onComponentsLoading() {
    this.input = this.selector.querySelector('.search__input');
    this.searchBtn = this.selector.querySelector('.search__submit');
    this.resetBtn = this.selector.querySelector('.search__reset-btn');
    this.messageOutput = this.selector.querySelector('.search__result');
    this.container = document.querySelector('.posts-wrapper');
  }

  // eslint-disable-next-line complexity
  filter(regPhraseAuthor, regPhraseTitle) {
    let flagAuthor = false;
    let flagTitle = false;
    for (let i = 0; i < this.container.children.length; i++) {
      if (this.container.children[i]
        .querySelector('.post__info-heading')) {
        flagAuthor = regPhraseAuthor.test(this.container.children[i]
          .querySelector('.post__info-heading').innerText);
      }
      if (this.container.children[i]
        .querySelector('.post__heading')) {
        flagTitle = regPhraseTitle.test(this.container.children[i]
          .querySelector('.post__heading').innerText);
      }
      if (flagAuthor || flagTitle) {
        this.container.children[i].style.display = '';
      } else {
        this.container.children[i].style.display = 'none';
      }
    }
    this.checkResultMessage();
  }

  filterFromInput() {
    const LENGTH_FOR_START_FILTER = 2;
    const regPhraseAuthor = new RegExp(this.input.value, 'i');
    const regPhraseTitle = new RegExp(this.input.value, 'i');

    if (this.input.value.length > LENGTH_FOR_START_FILTER) {
      localStorage.setItem('filterWord', this.input.value);
      this.filter(regPhraseAuthor, regPhraseTitle);
    } else {
      this.messageOutput.innerText = '';
      for (let i = 0; i < this.container.children.length; i++) {
        this.container.children[i].style.display = '';
      }
    }
  }

  filterFromStorage() {
    const filteredWord = localStorage.getItem('filterWord');
    if (filteredWord) {
      const regPhraseAuthor = new RegExp(filteredWord, 'i');
      const regPhraseTitle = new RegExp(filteredWord, 'i');
      this.filter(regPhraseAuthor, regPhraseTitle);
      this.input.value = filteredWord;
    }
  }

  resetFilter() {
    const posts = this.container.children;
    for (let i = 0; i < posts.length; i++) {
      posts[i].style.display = '';
    }
    localStorage.removeItem('filterWord');
    this.messageOutput.innerText = '';
  }

  checkResultMessage() {
    const switcher = [].every.call(this.container.children, (post) => post.style.display = 'none');
    if (switcher) {
      this.messageOutput.innerText = 'No search results found';
    } else {
      this.messageOutput.innerText = '';
    }
  }

  init() {
    this.onComponentsLoading();
    this.onBindEvents();
    this.onCreate();
  }
}

class BlogPage extends PageBuilder {
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
    form.append(searchContainer);
    return form;
  }

  listOfPosts(posts) {
    const list = document.createDocumentFragment();
    posts.reverse().forEach((post) => {
      list.append(new ShortPost(post, post.id).asElement());
    });
    return list;
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
    fetch('./api/list', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        this.posts = response;
        this.selector.append(this.content());
      })
      .catch((err) => {
        document.querySelector('.header').insertAdjacentText('afterend', err);
      });
  }
}

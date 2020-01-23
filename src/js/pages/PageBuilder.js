class PageBuilder {
  constructor(selector, page) {
    this.selector = document.querySelector(selector);
    this.page = page;
  }
}

export default PageBuilder;

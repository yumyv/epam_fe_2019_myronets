export default class PageBuilder {
  constructor(selector, page) {
    this.selector = document.querySelector(selector);
    this.page = page;
  }
}

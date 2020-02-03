import PageBuilder from './PageBuilder';

export default class PostsPage extends PageBuilder {
  constructor(selector) {
    super(selector);
    this.id = new URLSearchParams(location.search).get('id');
    this.postApiUrl = 'http://localhost:3000/api/articles';
  }

  init() {

  }
}

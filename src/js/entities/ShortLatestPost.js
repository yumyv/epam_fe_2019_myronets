import LatestPost from './LatestPost';
import {createDOMElement} from '../functions/functions';

export default class ShortLatestPost extends LatestPost {
  image() {
    const image = createDOMElement('img', 'latest-post__img', 'latest-post__img--md');
    image.setAttribute('src', this.post.imgUrl);
    image.setAttribute('alt', 'latest post');
    return image;
  }

  content() {
    const content = createDOMElement('div', 'latest-post__wrapper');
    const link = createDOMElement('a', 'latest-post__link');
    link.setAttribute('href', this.post.link);
    const heading = createDOMElement('h3', 'latest-post__heading', 'latest-post__heading--md');
    heading.innerText = this.post.heading;
    link.append(heading);
    const postInfo = createDOMElement('div', 'latest-post__container', 'latest-post__container--md');
    postInfo.append(this.postInfo());
    content.append(link);
    content.append(postInfo);
    return content;
  }

  asElement() {
    const post = createDOMElement('article', 'latest-post', 'latest-post--md');
    post.append(this.image());
    post.append(this.content());
    return post;
  }
}

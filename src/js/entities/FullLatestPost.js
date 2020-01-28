import LatestPost from './LatestPost';
import {createDOMElement} from '../functions/functions';

class FullLatestPost extends LatestPost {
  image() {
    const image = createDOMElement('img', 'latest-post__img');
    image.setAttribute('src', this.post.imgUrl);
    image.setAttribute('alt', 'latest post');
    return image;
  }

  link() {
    const link = createDOMElement('a', 'latest-post__link');
    link.setAttribute('href', this.post.link);
    const heading = createDOMElement('h3', 'latest-post__heading');
    heading.innerText = this.post.heading;
    link.append(heading);
    return link;
  }

  text() {
    const text = createDOMElement('p', 'latest-post__text');
    text.innerText = this.post.text;
    return text;
  }

  asElement() {
    const post = createDOMElement('article', 'latest-post');
    const postInfo = createDOMElement('div', 'latest-post__container');
    postInfo.append(this.postInfo());
    post.append(this.image());
    post.append(this.link());
    post.append(this.text());
    post.append(postInfo);
    return post;
  }
}

export default FullLatestPost;

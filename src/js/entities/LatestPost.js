class LatestPost extends Post {
  postInfo() {
    const info = document.createDocumentFragment();
    const date = createDOMElement('span', 'latest-post__date', 'latest-post__element');
    date.innerText = this.post.date;
    const status = createDOMElement('span', 'latest-post__status', 'latest-post__element');
    status.innerText = this.post.time;
    const comments = createDOMElement('span', 'latest-post__comments');
    comments.innerText = this.post.countOfComments;
    info.append(date);
    info.append(status);
    info.append(makeSvgPic(this.post.imgCommentsUrl, 'latest-post__pic'));
    info.append(comments);
    return info;
  }
}

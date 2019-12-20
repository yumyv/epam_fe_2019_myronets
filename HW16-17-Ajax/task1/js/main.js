// eslint-disable-next-line complexity,max-statements
const makeContent = (content) => {
  if (document.querySelector('.post-hook')) {
    const postPage = new PostPage('.post-hook', content.pages[2]);
    postPage.init();
  }
  if (document.querySelector('.home-hook')) {
    const homePage = new HomePage('.home-hook', content.pages[0]);
    homePage.init();
  }
  if (document.querySelector('.blog-hook')) {
    const blogPage = new BlogPage('.blog-hook', content.pages[1]);
    blogPage.init();
  }
  if (document.querySelector('.portfolio-slider')) {
    const latestPortfolioSlider = new LatestPortfolioSlider('.portfolio-slider', 3000);
    latestPortfolioSlider.init();
  }
  if (document.querySelector('.add-post-btn')) {
    const addPost = new AddPost('.add-post-btn');
    addPost.init();
  }
  if (document.querySelector('.blog-hook')) {
    const showPost = new ShowPost('.blog-hook');
    showPost.init();
  }
};

fetch('./js/basicContent.json')
  .then((response) => response.json())
  .then((content) => makeContent(content));

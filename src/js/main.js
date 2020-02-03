import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import BlogPage from './pages/BlogPage';
import PostsPage from './pages/PostsPage';
import {LatestPortfolioSlider} from './modules/LatestPortfolioSlider';
import {TestimonialsSlider} from './modules/TestimonialsSlider';
import AddPost from './modules/AddPost';
import GoogleMap from './modules/GoogleMap';

const runModules = () => {
  if (document.querySelector('.portfolio-slider')) {
    const latestPortfolioSlider = new LatestPortfolioSlider('.portfolio-slider', 3000, 17);
    latestPortfolioSlider.init();
  }
  if (document.querySelector('.testimonials-slider')) {
    const testimonialsSlider = new TestimonialsSlider('.testimonials-slider', 4000, 26);
    testimonialsSlider.init();
  }
  if (document.querySelector('.add-post-btn')) {
    const addPost = new AddPost('.add-post-btn');
    addPost.init();
  }
  if (document.querySelector('.form__map')) {
    const showPost = new GoogleMap('.form__map');
    showPost.init();
  }
};

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
  if (document.querySelector('.posts-hook')) {
    const postsPage = new PostsPage('.posts-hook');
    postsPage.init();
  }
  runModules();
};

fetch('./js/basicContent.json')
  .then((response) => response.json())
  .then((content) => makeContent(content));

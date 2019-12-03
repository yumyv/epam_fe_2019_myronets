let countOfPosts = 0;
let countOfComments = 0;

const isValidInput = (arr, string) => {
  return !!(typeof (string) === 'string' &&
    arr.every((e) => {
      return typeof (e) === 'object';
    }));
};

const counterForPosts = (author, neededAuthor) => {
  if (author.toLowerCase() === neededAuthor.toLowerCase()) {
    countOfPosts++;
  }
};

const counterForComments = (comments, neededAuthor) => {
  comments.filter((elem) => {
    if (elem.author.toLowerCase() === neededAuthor.toLowerCase()) {
      countOfComments++;
    }
  });
};

const getQuantityPostsByAuthor = (listOfPosts, author) => {
  if (isValidInput(listOfPosts, author)) {
    listOfPosts.filter((e) => {
      counterForPosts(e.author, author);
      if (e.comments) {
        counterForComments(e.comments, author);
      }
    });
  } else {
    return 'Invalid input';
  }
  return `post - ${countOfPosts}, comments - ${countOfComments}`;
};

const list = [
  {
    id: 1,
    post: 'some post1',
    title: 'title 1',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
    ],
  },
  {
    id: 2,
    post: 'some post2',
    title: 'title 2',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
      {
        id: 1.3,
        comment: 'some comment3',
        title: 'title 3',
        author: 'Rimus',
      },
    ],
  },
  {
    id: 3,
    post: 'some post3',
    title: 'title 3',
    author: 'Rimus',
  },
  {
    id: 4,
    post: 'some post4',
    title: 'title 4',
    author: 'Uncle',
  },
];

document.write(getQuantityPostsByAuthor(list, 'Rimus'));

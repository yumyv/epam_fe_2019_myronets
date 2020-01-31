global.ABSPATH = __dirname;
global.INCPATH = `${ABSPATH}/libs`;

const express = require('express');
const router = express.Router();
const fs = require('fs');
const log = require(`${INCPATH}/log`)(module);

let list;

fs.readFile('./config/articles.json', 'utf8', (err, data) => {
  if (err) {
    return err;
  }
  list = data;
  list = JSON.parse(list);
});

router.route('/articles')
  .get((req, res) => {
    log.info('==Get all list articles==');
    res.end(JSON.stringify(list));
  })
  .post((req, res) => {
    log.info('==Save article==');
    list.push(req.body);
    res.end(JSON.stringify(list));
  })
  .delete((req, res) => {
    log.info('==Delete all articles==');
    list = [];
    res.end(JSON.stringify(list));
  });

router.route('/articles/:id')
  .get((req, res) => {
    log.info('==Get article by id==');
    const articleById = list.find((article) => +article.id === +req.params.id);
    res.end(JSON.stringify(articleById));
  })
  .put((req, res) => {
    log.info('==Get article by id==');
    const articleById = list.find((article) => +article.id === +req.params.id);
    articleById.text = req.body.text;
    res.end(JSON.stringify(articleById));
  })
  .delete((req, res) => {
    log.info('==Delete article by id==');
    list = list.filter((article) => +article.id !== +req.params.id);
    res.end(JSON.stringify(list));
  });

module.exports = router;

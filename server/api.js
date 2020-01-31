const log = require(`${INCPATH}/log`)(module);
const express = require('express');
const router = express.Router();
const ArticleModel = require(`${INCPATH}/mongoose`).ArticleModel;

router.route('/articles')
  .get((req, res) => {
    ArticleModel.find((err, articles) => {
      if (err) {
        log.error('Error find articles in Mongo');
        return res.send({error: err});
      } else {
        log.info('Articles finds');
        return res.end(JSON.stringify(articles));
      }
    });
  })
  .post(async (req, res) => {
    const article = new ArticleModel(req.body);
    await article.save();
    res.end(JSON.stringify(article));
  })
  .delete((req, res) => {
    ArticleModel.deleteMany({}, (err) => {
      if (err) {
        log.error('Error delete articles in Mongo');
        return res.send({error: err});
      } else {
        log.info('Deleted all articles');
        return res.end();
      }
    });
  });

router.route('/articles/:id')
  .get((req, res) => {
    ArticleModel.findById(req.params.id, (err, article) => {
      if (err) {
        log.error('Error find article in Mongo');
        return res.send({error: err});
      } else {
        log.info('Article finds');
        return res.end(JSON.stringify(article));
      }
    });
  })
  .put((req, res) => {
    const updateObj = req.body;
    ArticleModel.findByIdAndUpdate(req.params.id, updateObj, {new: true}, (err, article) => {
      if (err) {
        log.error('Error update article in Mongo');
        return res.send({error: err});
      } else {
        log.info('Article updated');
        return res.end(JSON.stringify(article));
      }
    });
  })
  .delete((req, res) => {
    ArticleModel.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        log.error('Error delete article in Mongo');
        return res.send({error: err});
      } else {
        log.info('Article deleted');
        return res.end();
      }
    });
  });

module.exports = router;

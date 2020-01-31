const mongoose = require('mongoose');
const log = require(`${INCPATH}/log`)(module);
const config = require(`${INCPATH}/config`);
Q = require('q');

mongoose.connect(config.get('db'));
const db = mongoose.connection;

db.on('error', (err) => {
  log.error('connection error:', err.message);
});
db.once('open', () => {
  log.info('Connected to DB!');
});

const Schema = mongoose.Schema;

const Article = new Schema({
  type: {type: String, default: 'picture'},
  imgUrl: {type: String, default: './img/no-img.png'},
  heading: {type: String, default: 'No heading'},
  author: {type: String, default: 'No author'},
  date: {type: String, default: new Date().toDateString()},
  text: {type: String, default: 'No text'},
  quote: {type: String, default: 'No quote'},
  time: {type: String, default: new Date().toLocaleTimeString()},
  imgAvatarUrl: {type: String, default: './img/avatar.png'},
  mediaUrl: {type: String, default: ''},
  countOfComments: {type: Number, default: 0},
  countOfStars: {type: Number, default: 0},
  countOfLikes: {type: Number, default: 0},
  socialLinks: {
    type: Array, default: [{
      name: 'facebook',
      link: '#',
    }],
  },
});

Article.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports.ArticleModel = mongoose.model('Article', Article);

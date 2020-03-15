const express = require('express');

const router = express.Router();

const verify = require('../../middleware/verify');
const homeController = require('../../controller/home.controller');
const postController = require('../../controller/post.controller');
const newPostController = require('../../controller/newPost.controller');
const tagController = require('../../controller/tag.controller');

router.get('/', verify.isSignIn, homeController.renderHomePage);

router.get('/posts', verify.isSignIn, postController.renderPostPage);

router.get('/newpost', verify.isSignIn, newPostController.renderNewPostPage);

router.get('/tags', verify.isSignIn, tagController.renderTagPage);

router.get('/tags/:id', verify.isSignIn, tagController.editTag);

router.post('/tags', verify.isSignIn, tagController.addNewTag);

router.put('/tags/:id', verify.signedIn, tagController.updateTag);

module.exports = router;
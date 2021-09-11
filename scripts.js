"use strict";
import Card from './js/components/card.js';
import User from './js/components/user.js';
import Post from './js/components/posts.js';

const root = document.getElementById("root")

const user = new User()
const post = new Post()
const article = new Card()

window.addEventListener("load", () => {
    post.addDeleteBtnListener()
    post.addEditBtnListener()
    post.getPosts().then(posts => posts.map(({ title, body, userId, id }) => {
        const articleEl = article.createArticle(id)
        const postEl = new Post(title, body, userId, id)
        user.create(userId, articleEl)
        postEl.render(articleEl)
        return articleEl
    }))
        .then(articleEl => root.append(...articleEl))
})
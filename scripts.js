"use strict";
import Card from './components/card.js';
import User from './components/user.js';
import Posts from './components/posts.js';

const root = document.getElementById("root")

const user = new User()
const posts = new Posts()
const article = new Card()

window.addEventListener("load", () => {
    posts.addDeleteBtnListener()
    posts.addEditBtnListener()
    posts.getPosts().then(posts => posts.map(({ title, body, userId, id }) => {
        const articleEl = article.createArticle(id)
        const postEl = new Posts(title, body, userId, id)
        user.createUser(userId, articleEl)
        postEl.renderPost(articleEl)
        return articleEl
    }))
        .then(articleEl => root.append(...articleEl))
})
import Card from "./card.js"
import Modal from "./modal.js"
import User from "./user.js"
import { getRequest, changeRequest } from "../api.js"
const BASE_URL = 'https://ajax.test-danit.com/api/json'
const root = document.getElementById("root")

class Post extends Card {
    constructor(title, post, userId, id) {
        super()
        this.title = title
        this.post = post
        this.userId = userId
        this.id = id
        this.name = 'Leanne Graham'
        this.email = 'Sincere@april.biz'
    }
    getPosts() {
        return getRequest(`${BASE_URL}/posts`)
    }
    createPostFetch(post) {
        const { title, text, userId, id } = post
        changeRequest(`${BASE_URL}/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                post: text,
                userId,
                id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    createPutFetch(title, text, id) {
        changeRequest(`${BASE_URL}/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                post: text,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    deletePost(postId) {
        changeRequest(`${BASE_URL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    render(targetEl) {
        this.html = `<h3 class="posts-title">${this.title}</h3>
        <p class="posts-text">${this.post}</p>
        <div class="posts-btn-container">
        <button type="button" data-id="${this.id}" class="posts-delete-btn">Удалить</button>
        <button type="button" class="posts-edit-btn">Редактировать</button>
        </div>
        `
        targetEl.insertAdjacentHTML('beforeend', this.html)
        return targetEl
    }
    renderCreatedByUserPost(post) {
        const user = new User(this.name, this.email, this.id)
        const articleEl = this.createArticle(this.id)
        user.render(articleEl)
        post.render(articleEl)
        const div = root.prepend(articleEl)
        return div
    }
    addDeleteBtnListener() {
        root.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains("posts-delete-btn")) {
                this.deletePost(e.target.dataset.id)
                e.target.closest(".posts-box").remove()
            }
        })
    }
    addEditBtnListener() {
        const modal = new Modal()
        root.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains("posts-edit-btn")) {
                e.preventDefault()
                const articleEl = e.target.closest(".posts-box");
                const postTitle = articleEl.querySelector(".posts-title").textContent
                const postText = articleEl.querySelector(".posts-text").textContent
                modal.createModal({ targetEl: articleEl, position: "beforeEnd", currentPostText: postText })
                const form = document.querySelector(".posts-modal-box");
                form.querySelector("#posts-title-input").value = postTitle
                modal.addSubmitBtnListener()
            }
        })
    }
}

export default Post
import Card from "./card.js"
import Posts from "./posts.js"
const root = document.getElementById("root")
class Modal extends Card {
    createBtn() {
        const btn = this.createElement({ tagName: "button", classNames: ["posts-showmore-btn"] })
        btn.innerText = "Добавить публикацию"
        btn.addEventListener("click", () => {
            this.createModal({ targetEl: root, position: 'afterbegin', type: "add-post", addClass: "posts-modal-box--add" })
            btn.disabled = true
            this.addSubmitBtnListener()
        })
        const div = root.before(btn)
        return div
    }
    createModal({ targetEl, position, type = "edit-post", addClass = "", currentPostText = "" }) {
        this.html = ` <form data-type="${type}" class="posts-modal-box ${addClass}">
        <label for="posts-title-input">Введите заголовок:</label>
        <input name="posts-title" id="posts-title-input" />
        <p>Введите текст:</p>
        <p><textarea class="posts-input" rows="10" cols="35" name="text">${currentPostText}</textarea></p>
        <button type="submit" class="posts-input-btn">Отправить</button>
    </form>`
        targetEl.insertAdjacentHTML(position, this.html)
        return targetEl
    }
    addSubmitBtnListener() {
        const btn = document.querySelector(".posts-input-btn")
        const addPostBtn = document.querySelector(".posts-showmore-btn")
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                const form = document.querySelector(".posts-modal-box");
                const title = form.elements['posts-title'].value;
                const text = form.querySelector('.posts-input').value;
                if (title !== "" && text !== "") {
                    if (form.dataset.type === "add-post") {
                        const post = this.createCard(title, text)
                        post.createPostFetch(post)
                        post.renderCreatedByUserPost(post)
                        form.remove()
                        addPostBtn.disabled = false
                    }
                    if (form.dataset.type === "edit-post") {
                        const parentBox = e.target.closest(".posts-box")
                        const id = parentBox.dataset.id
                        const titleEl = parentBox.querySelector(".posts-title")
                        const textEl = parentBox.querySelector(".posts-text")
                        const post = new Posts()
                        post.createPutFetch(title, text, id)
                        titleEl.textContent = title
                        textEl.textContent = text
                        form.remove()
                    }
                }
            })
        }
    }
    createCard(title, text, userId = 1, id = 1) {
        const post = new Posts(title, text, userId, id)
        return post
    }
}
const showMoreBtn = new Modal()
showMoreBtn.createBtn()

export default Modal
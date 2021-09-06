import { getRequest } from "../api.js"
const BASE_URL = 'https://ajax.test-danit.com/api/json'
class User {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id
    }
    getUsers() {
        return getRequest(`${BASE_URL}/users`)
    }
    createUsersArr() {
        return this.getUsers()
            .then(users => users.map(({ name, email, id }) => {
                const users = new User(name, email, id)
                return users
            }))
    }
    getUserById(userId) {
        return users => users.find(({ id }) => id === userId)
    }
    renderUserHtml(targetEl) {
        this.html = `<h2>${this.name}</h2>
        <a href="${this.email}">${this.email}</a>`
        targetEl.insertAdjacentHTML('afterbegin', this.html)
        return targetEl
    }
    createUser(userId, targetEl) {
        return this.createUsersArr()
            .then(this.getUserById(userId))
            .then(user => user.renderUserHtml(targetEl))
    }
}

export default User;
class Card {
    createElement({ tagName = 'div', classNames }) {
        const element = document.createElement(tagName);
        element.classList.add(classNames)
        return element;
    }
    createArticle(id) {
        const article = this.createElement({ tagName: "article", classNames: ["posts-box"] })
        article.dataset.id = id
        return article
    }
}


export default Card;
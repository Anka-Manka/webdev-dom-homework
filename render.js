const listElement = document.querySelector('.comments');

export function renderHtml(comments) {
    listElement.innerHTML = comments.map((comment, index) => {
        const classButton = comment.isLiked ? "-active-like" : "";
        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${comment.date}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">
                ${comment.text}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter" data-index="${index}">${comment.likes}</span>
                <button class="like-button ${classButton}" data-index="${index}"></button>
            </div>
        </div>
    </li>`
    }).join("");
}
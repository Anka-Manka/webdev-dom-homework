import { API } from "./api.js"

export const DOM = {
    comments: [],

    buttonElement: document.getElementById('add-button'),
    nameInputElement: document.getElementById('name-input'),
    textInputElement: document.getElementById('text-input'),
    listElement: document.getElementById('list'),
    deleteLastComment: document.querySelector('.delete-comment'),

    fetchAndRenderComments() {
        const loadingElement = document.getElementById('loading');
        loadingElement.style.display = 'block';

        API.getFromServer()
            .then((responseData) => {
                this.comments = responseData.comments.map((comment) => {
                    return {
                        id: comment.id,
                        name: comment.author.name,
                        text: comment.text,
                        date: new Date(comment.date).print(),
                        isLiked: comment.isLiked,
                        likes: comment.likes,
                    }
                })
                // comments = responseData.comments;
                this.renderComments();
                loadingElement.style.display = 'none';
            });
    },

    sendCommentsToServer(name, text) {
         API.sendToServer(this.nameInputElement.value, this.textInputElement.value)
                .then((isGood) => {
                    if (isGood) {
                        this.nameInputElement.value = "";
                        this.textInputElement.value = "";
                    }

                    return this.fetchAndRenderComments();
                })
                .then(() => {
                    const commentFormDisable = document.querySelector('.add-form');
                    commentFormDisable.style.display = 'flex';

                    const loadingMessageElement = document.getElementById('loading-message');
                    loadingMessageElement.style.display = 'none';

                    this.buttonElement.disabled = false;
                    this.buttonElement.textContent = 'Написать';
                });
    },

    renderComments() {
        this.listElement.innerHTML = this.comments.map((comment, index) => {
            const classButton = comment.isLiked ? "-active-like" : "";
            return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
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

        this.handleLikes();

        const commentsElements = document.querySelectorAll('.comment');
        for (const commentElement of commentsElements) {
            commentElement.addEventListener('click', () => {
                const index = commentElement.dataset.index
                const quotText =
                    `> ${this.comments[index].text}\n${this.comments[index].name},`
                const textArea = document.querySelector('.add-form-text')
                textArea.value = quotText
            })
        }
    },

    handleLikes() {
        document.querySelectorAll('.like-button').forEach((element) => {
            element.addEventListener('click', (event) => {
                const index = element.dataset.index;
                const comment = this.comments[index];

                event.stopPropagation();

                if (comment.isLiked) {
                    comment.isLiked = !comment.isLiked
                    comment.likes--
                } else {
                    comment.isLiked = !comment.isLiked
                    comment.likes++
                }

                this.renderComments();
            });
        })
    },

    handleFormElementsListeners() {
        this.nameInputElement.addEventListener('input', () => {
            this.buttonElement.disabled = this.nameInputElement.value === "";
        })

        this.buttonElement.addEventListener("click", () => {
            if (this.nameInputElement.value.trim() === "") {
                this.nameInputElement.classList.add("error");
                return;
            } else {
                this.nameInputElement.classList.remove("error");
            }
            if (this.textInputElement.value.trim() === "") {
                this.textInputElement.classList.add("error");
                return;
            } else {
                this.textInputElement.classList.remove("error");
            }

            const loadingMessageElement = document.getElementById('loading-message');
            loadingMessageElement.style.display = 'block';

            const commentFormDisable = document.querySelector('.add-form');
            commentFormDisable.style.display = 'none';

            this.sendCommentsToServer(this.nameInputElement.value, this.textInputElement.value)

            // API.sendToServer(this.nameInputElement.value, this.textInputElement.value)
            //     .then((isGood) => {
            //         if (isGood) {
            //             this.nameInputElement.value = "";
            //             this.textInputElement.value = "";
            //         }
            //
            //         return this.fetchAndRenderComments();
            //     })
            //     .then(() => {
            //         commentFormDisable.style.display = 'flex';
            //         loadingMessageElement.style.display = 'none';
            //         this.buttonElement.disabled = false;
            //         this.buttonElement.textContent = 'Написать';
            //     });
        });

        this.deleteLastComment.addEventListener('click', () => {
            if (this.comments.length > 0) {
                this.comments.pop();
                this.renderComments();
            }
        })
    },

    start() {
        this.buttonElement.disabled = true;

        this.fetchAndRenderComments();

        this.handleFormElementsListeners()
    }
}

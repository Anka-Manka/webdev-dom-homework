import { getComments, postComments } from "./api.js";
import { renderHtml } from "./render.js";
import { renderQuot } from "./quot.js";


const buttonElement = document.querySelector('.add-form-button');
const nameInputElement = document.querySelector('.add-form-name');
const textInputElement = document.querySelector('.add-form-text');
const deleteLastComment = document.querySelector('.delete-comment')


const fetchAndRenderComments = () => {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';
    getComments().then((responseData) => {
        comments = responseData.comments;
        renderComments();
        loadingElement.style.display = 'none';
    });
};


let comments = [];

function renderComments() {
    renderHtml(comments);
    initEventListener();
    renderQuot(comments);
};

function initEventListener() {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (event) => {

            const index = likeButtonElement.dataset.index;
            const element = comments[index];

            event.stopPropagation();

            if (element.isLiked) {
                element.isLiked = !element.isLiked
                element.likes--
            } else {
                element.isLiked = !element.isLiked
                element.likes++
            }

            renderComments();
        });
    };
};


buttonElement.disabled = true;
nameInputElement.addEventListener('input', () => {
    if (nameInputElement.value === "") {
        buttonElement.disabled = true;
        return;
    } else {
        buttonElement.disabled = false;
    }
})


buttonElement.addEventListener("click", () => {
    if (nameInputElement.value.trim() === "") {
        nameInputElement.classList.add("error");
        return;
    } else {
        nameInputElement.classList.remove("error");
    }
    if (textInputElement.value.trim() === "") {
        textInputElement.classList.add("error");
        return;
    } else {
        textInputElement.classList.remove("error");
    };

    const loadingMessageElement = document.getElementById('loading-message');
    loadingMessageElement.style.display = 'block';

    const commentFormDisable = document.querySelector('.add-form');
    commentFormDisable.style.display = 'none';

    postComments({ name: nameInputElement.value, text: textInputElement.value }).then(() => {
        return fetchAndRenderComments();
    })
        .then(() => {
            nameInputElement.value = "";
            textInputElement.value = "";
        })
        .catch((error) => {
            if (error.message !== 'Ответ сервера не был успешным') {
                console.error('Возникла проблема с  операцией fetch: ', error)
                alert('Отсутствует соединение с Интернетом, попробуйте позже')
            };
        })
        .finally(() => {
            commentFormDisable.style.display = 'flex';
            loadingMessageElement.style.display = 'none';
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
        });

    buttonElement.disabled = true;
});

deleteLastComment.addEventListener('click', () => {
    if (comments.length > 0) {
        comments.pop();
        renderComments();
    }
});

fetchAndRenderComments();
renderComments();

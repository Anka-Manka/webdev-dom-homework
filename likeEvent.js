export function initEventListener(comments) {
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
}
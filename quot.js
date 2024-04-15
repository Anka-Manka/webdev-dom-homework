export function renderQuot(comments) {
    const commentsElements = document.querySelectorAll('.comment');
    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index
            const quotText =
                `> ${comments[index].text} 
${comments[index].author.name},`
            const textArea = document.querySelector('.add-form-text')
            textArea.value = quotText
        })
    }
}
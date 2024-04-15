export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/ann-ryzhkova/comments", {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
};

export function postComments({ name, text }) {
    return fetch("https://wedev-api.sky.pro/api/v1/ann-ryzhkova/comments", {
        method: "POST",
        body: JSON.stringify({
            name: name
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            text: text
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
        }),
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 400) {
                    alert('Имя и комментарий должны быть не короче 3 символов');
                } else if (response.status === 500) {
                    alert('Сервер сломался, попробуй позже.');
                }
                throw new Error('Ответ сервера не был успешным')
            }
            return response.json();
        })
};

export const API = {
    address: "https://wedev-api.sky.pro/api/v1/ann-ryzhkova/comments",

    getFromServer() {
        let status = 0

        // const loadingElement = document.getElementById('loading');
        // loadingElement.style.display = 'block';

        return fetch(this.address, {
            method: "GET",
        })
            .then((response) => {
                status = response.status
                return response.json();
            })
            .then((responseData) => {
                if (status >= 300)
                    throw new Error(responseData.error)

                return responseData
            })
            .catch(error => {
                if (error === "Failed to fetch")
                    alert("Проверьте Ваш Интернет, ошибка запроса")
                else
                    alert(error.message)
            })
    },

    sendToServer(name, text) {
        let status = 0

        return fetch(this.address, {
            method: "POST",
            body: JSON.stringify({
                name: name.sanitize(),
                text: text.sanitize(),
                forceError: true,
            }),
        })
            .then((response) => {
                status = response.status
                return response.json();
            })
            .then((responseData) => {
                if (status >= 300)
                    throw new Error(responseData.error)

                return true
            })
            .catch(error => {
                if (error === "Failed to fetch")
                    alert("Проверьте Ваш Интернет, ошибка запроса")
                else
                    alert(error.message)

                return false
            })
    },
}

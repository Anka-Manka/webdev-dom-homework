String.prototype.sanitize = function () {
    return this.trim()
        .replaceAll("  ", " ")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
}

Date.prototype.print = function () {
    const day = this.getDate().toString().padStart(2, '0');
    const month = (this.getMonth() + 1).toString().padStart(2, '0');
    const year = this.getFullYear().toString().slice(-2);
    const hours = this.getHours().toString().padStart(2, '0');
    const minutes = this.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

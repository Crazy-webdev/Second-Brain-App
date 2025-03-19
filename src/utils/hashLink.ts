export function randomLink(len: number) {
    const options = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    const length = options.length;

    let link = '';
    for (let i = 0; i < len; i++) {
        link += options[Math.floor(Math.random() * length)];
    }
    return link;
}

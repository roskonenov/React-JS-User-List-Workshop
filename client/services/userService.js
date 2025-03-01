
const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAllUsers() {
        const result = await fetch(baseUrl);
        const data = await result.json();
        return Object.values(data);
    },
}

const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAllUsers() {
        const result = await fetch(baseUrl);
        const data = await result.json();
        return Object.values(data);
    },

    async createUser(userData) {
        const {country, city, street, streetNumber, ...postData} = userData;
        postData.address = {country, city, street, streetNumber};
        postData.createdAt = new Date().toISOString();
        postData.updatedAt = new Date().toISOString();

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        return await response.json();
    },

    async getUser(userId) {
        const result = await fetch(`${baseUrl}/${userId}`);
        return await result.json();
    }
}
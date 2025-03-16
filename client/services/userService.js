
const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAllUsers() {
        const result = await fetch(baseUrl);
        const data = await result.json();
        return Object.values(data);
    },

    async createUser(userData) {
        const postData = refactorUserData(userData);

        const result = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        return await result.json();
    },

    async getUser(userId) {
        const result = await fetch(`${baseUrl}/${userId}`);
        return await result.json();
    },

    async deleteUser(userId) {
        const result = await fetch(`${baseUrl}/${userId}`, {
            method: 'DELETE',
        });
        return await result.json();
    },

    async updateUser(userId, userData) {
        const postData = refactorUserData(userData);
        postData._id = userId;
        const result = await fetch(`${baseUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        return await result.json();
    }
}

function refactorUserData(userData) {
    const {country, city, street, streetNumber, ...refactoredData} = userData;
    
        refactoredData.address = {country, city, street, streetNumber};
        refactoredData.createdAt = userData.createdAt ? userData.createdAt[0] : new Date().toISOString();
        refactoredData.updatedAt = new Date().toISOString();
        
        return refactoredData;
}
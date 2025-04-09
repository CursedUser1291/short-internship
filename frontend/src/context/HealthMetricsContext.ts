import axios from 'axios'

const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8040/api/login', {
            username,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        localStorage.setItem('loggedIn', 'true')
        return response.data.user
    } catch (error) {
        return null

    }
}

const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') === 'true';
};

const logout = () => {
    localStorage.removeItem('loggedIn');
};

export { login, isLoggedIn, logout }
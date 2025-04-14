
import { NavigateFunction } from "react-router-dom"

export const handleLogin = async (
    username: string,
    password: string,
    login: (username: string, password: string) => Promise<any>,
    navigate: NavigateFunction,
    setError: (error: string) => void
) => {
    try {
        const user = await login(username, password)
        if (user) {
            navigate("/")
        } else {
            setError("Login failed. Please check your credentials.")
        }
    } catch (error) {
        setError("An error occurred during login.")
        console.error(error)
    }
};
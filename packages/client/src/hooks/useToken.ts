export const useToken = () => {
    const TOKEN_KEY = 'auth_token'
    const getToken = () => {
        return localStorage.getItem(TOKEN_KEY)
    }
    const setToken = (token: string) => {
        localStorage.setItem(TOKEN_KEY, token)
    }

    const removeToken = () => {
        localStorage.removeItem(TOKEN_KEY)
    }

    return {
        getToken,
        setToken,
        removeToken
    }
}
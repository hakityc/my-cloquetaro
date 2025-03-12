
const TOKEN_KEY = 'auth_token'
export const tokenUtils = {
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY)
    },
    setToken: (token: string) => {
        localStorage.setItem(TOKEN_KEY, token)
    },
    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY)
    }
}
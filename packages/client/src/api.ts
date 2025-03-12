import { AppType } from '@test-hono/server/src'
import { hc } from 'hono/client'
import { useToken } from './hooks/useToken'

export const client = hc<AppType>('http://localhost:3000', {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        // 从 localStorage 获取 token
        const { getToken } = useToken()
        const token = getToken()

        // 如果有 token，添加到请求头
        if (token) {
            init = {
                ...init,
                headers: {
                    ...init?.headers,
                    'Authorization': `Bearer ${token}`
                }
            }
        }

        const res = await fetch(input, init)
        if (!res.ok) {
            const error = await res.json()
            throw error;
        }
        return res
    },
})
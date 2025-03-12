import type { AppType } from '@test-hono/server/src'
import { hc } from 'hono/client'
import { useToken } from './hooks/useToken'

export const client = hc<AppType>('http://localhost:3000', {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const { getToken, removeToken } = useToken()
        const token = getToken()

        const request = {
            ...init,
            headers: {
                ...init?.headers,
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        }

        const res = await fetch(input, request)
        if (!res.ok) {
            const error = await res.json()
            if (res.status === 401) {
                // 清除 token
                removeToken()
                // 跳转到登录页
                window.location.href = '/login'
            }
            throw error
        }
        return res
    }
})
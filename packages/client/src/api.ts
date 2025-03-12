import type { AppType } from '@test-hono/server/src'
import { hc } from 'hono/client'
import { tokenUtils } from './utils/token'

export const client = hc<AppType>('http://localhost:3000', {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const token = tokenUtils.getToken()

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
                tokenUtils.removeToken()
                // 跳转到登录页
                window.location.href = '/login'
            }
            throw error
        }
        return res
    }
})
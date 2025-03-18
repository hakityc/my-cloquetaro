import type { AppType } from '@test-hono/server/src'
import { hc } from 'hono/client'
import { tokenUtils } from './utils/token'

let API_URL = ''

if (import.meta.env.MODE === 'development') {
    API_URL = 'http://localhost:3000'
} else {
    API_URL = 'https://my-cloquetaro.hakityc.workers.dev'
}

export const client = hc<AppType>(API_URL, {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const token = tokenUtils.getToken()

        // 使用 Headers 构造函数创建 headers 对象
        const headers = new Headers(init?.headers || {})

        // 如果不存在 Content-Type 则设置默认值
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json')
        }
        // 如果存在 token，则设置 Authorization
        if (token) {
            console.log('token is exist')
            headers.set('Authorization', `Bearer ${token}`)
        }

        const request = { ...init, headers }

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
import type { AppType } from '@test-hono/server/src'
import { hc } from 'hono/client'
import { useToken } from './hooks/useToken'

export const client = hc<AppType>('http://localhost:3000', {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const token = useToken().getToken()

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
            throw error
        }
        return res
    }
})
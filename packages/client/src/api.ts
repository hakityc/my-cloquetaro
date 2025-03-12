import { AppType } from '@test-hono/server/src'
import { hc } from 'hono/client'

export const client = hc<AppType>('http://localhost:3000', {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const res = await fetch(input, init)
        if (!res.ok) {
            const error = await res.json()
            throw error;
        }
        return res
    },
})
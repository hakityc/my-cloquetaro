import type { Context, Next } from 'hono'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your-secret-key'

export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({
            code: 401,
            message: '未登录或 token 已过期',
            data: null
        }, 401)
    }

    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, JWT_SECRET)
        await next()
    } catch (error) {
        return c.json({
            code: 401,
            message: 'token 无效',
            data: null
        }, 401)
    }
}
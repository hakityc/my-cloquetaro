// books.ts
import { Hono } from 'hono'
import { okRes } from '../common/res'

interface UserInfo {
    id: number
    username: string
    nickname: string
    avatar: string
    role: string
    email: string
    createTime: string
}

const mockUserInfo: UserInfo = {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'admin',
    email: 'admin@example.com',
    createTime: '2024-01-01 00:00:00'
}

const app = new Hono()
    .get('/', (c) => c.json('user'))
    .get('/info', (c) => {
        return c.json(okRes({ userInfo: mockUserInfo }))
    })

export default app
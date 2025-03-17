// src/index.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import books from './routes/books'
import posts from './routes/posts'
import auth from './routes/auth'
import users from './routes/users'
import { authMiddleware } from './middleware/auth'

// 定义环境变量类型（根据实际需要扩展）
type Bindings = {
  // 示例 KV 绑定
  // DB: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// 全局中间件
app.use('/*', cors())
app.use('/users/*', authMiddleware)
app.use('/users/*', authMiddleware)
app.use('/posts/*', authMiddleware)
app.use('/books/*', authMiddleware)

// 路由注册
app.route('/auth', auth)
app.route('/users', users)
app.route('/books', books)
app.route('/posts', posts)

// Cloudflare Workers 入口
export default {
  fetch: app.fetch,
  // 可选：兼容 scheduled 事件
  // scheduled: ... 
}

// 导出类型用于类型安全
export type AppType = typeof app
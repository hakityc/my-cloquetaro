import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { Hono } from 'hono'
import books from './routes/books'
import posts from './routes/posts'
import auth from './routes/auth'

const app = new Hono()
const routes = app.use('/*', cors()).route('/auth', auth).route('/books', books).route('/posts', posts)

export default app
export type AppType = typeof routes

serve(app, () => {
  console.log('Server is running on http://localhost:3000')
})
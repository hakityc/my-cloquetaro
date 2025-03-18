// offers.ts
import { Hono } from 'hono'
import { offerService } from '../services/offerService'
import { okRes } from '../common/res'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'


const app = new Hono()
    .post('/', zValidator('json', z.object({
        name: z.string(),
        redirectType: z.enum(['HTTP_REDIRECT']), // RedirectType enum,
        url: z.string(),
        // countries: z.string(),
        // payoutType: z.enum(['CPA', 'CPC']), // PayoutType enum
        // payoutAmount: z.string().optional(),
        // allowUpsells: z.boolean().optional(),
        // conversionCap: z.boolean().optional(),
        // notes: z.string().optional(),
        // preloadEnabled: z.boolean().optional(),
        // offerValues: z.string()
    })), async (c) => {
        const data = c.req.valid('json')
        const offer = await offerService.createOffer(data)
        return c.json(okRes(offer))
    }).get('/', async (c) => {
        const offers = await offerService.getAllOffers()
        return c.json(okRes(offers))
    }).get('/:id', async (c) => {
        const id = c.req.param('id')
        const offer = await offerService.getOfferById(Number(id))
        return c.json(okRes(offer))
    }).put('/:id', zValidator('json', z.object({
        name: z.string().optional(),
    })), async (c) => {
        const id = c.req.param('id')
        const data = c.req.valid('json')
        const offer = await offerService.updateOffer(Number(id), data)
        return c.json(okRes(offer))
    }).delete('/:id', async (c) => {
        const id = c.req.param('id')
        await offerService.deleteOffer(Number(id))
        return c.json(okRes({ message: 'Offer deleted successfully' }))
    })

export default app
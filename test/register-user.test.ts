import request from 'supertest'
import server from '../src/server'

describe('Register user route', () => {
    it('registers a user', async () => {
        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe2email.com',
                password: ''
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })
})
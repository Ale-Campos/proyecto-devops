import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from "../app";

describe('GET /health', () => {
    test('It should respond with a 200 status code', async () => {
        const response = await request(app).get('/health')
        expect(response.statusCode).toBe(200)
    })
})

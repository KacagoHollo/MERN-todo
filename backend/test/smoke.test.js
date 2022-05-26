const app = require('../app')
const mockserver = require('supertest');

function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    // given - more rows
    // no setup required

    // when - only one row
    const result = sum(1, 2);

    // then
    expect(result).toBe(3);
});

test('/random endpoint gives back status 404', async () => {
    // given
    const server = mockserver(app);

    // when
    const response = await server.get('/api/random')

    // then
    expect(response.status).toBe(404)
});



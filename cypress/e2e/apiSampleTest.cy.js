/**
 * 1. Get API and validate the JSON schema. 
 * 2. Get API and validate the response.
 */
chai.use(require('chai-json-schema'));

describe('API Tests', () => {
    it('Get API and validate the JSON schema', () => {
        cy.request('https://www.boredapi.com/api/activity').as('activity')
        cy.get('@activity').then(response => {
            expect(response.status).to.eq(200)
            var activityScema = {
                accessibility: { type: 'number' },
                activity: { type: 'string' },
                key: { type: 'number' },
                link: { type: 'string' },
                participants: { type: 'number' },
                price: { type: 'number' }
            }
            expect(response.body).to.be.jsonSchema(activityScema);
        })
    });
    it('Get API and validate response', () => {
        cy.request('https://www.boredapi.com/api/activity?key=6706598')
            .as('activity')
        cy.get('@activity').then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.activity).to.equal("Learn the NATO phonetic alphabet")
            expect(response.body.type).to.equal("education")
            expect(response.body.participants).to.equal(1)

        })
    })
})
describe('API test suite', () => {

    Cypress.config('baseUrl', 'https://jsonplaceholder.typicode.com/posts')

    it('Verify GET endpoint response',() => {
        cy.request({
            method: 'GET',
            url: '/',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {         
            },
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.not.be.null
                expect(response.body).to.be.an('array')
                expect(response.body).to.have.length(100)
        })
    })
    it('Verify POST endpoint response with empty request body',() => {
        cy.request({
            method: 'POST',
            url: '/',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
              },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("id").to.eq(101);
            })
    })
    it('Verify POST endpoint with id value of 102',() => {
        cy.request({
            method: 'POST',
            url: '/',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "id": "102",
              },
        }).then((requestResponse) => {
            expect(requestResponse.status).to.eq(201);
            expect(requestResponse.body).to.have.property("id").to.not.eq(100);
            })
    }); 
    it('Verify endpoint respone with multiple values',() => {
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "id": "101",
                "title": 'holla',
              },
        }).then((requestResponse) => {
            expect(requestResponse.status).to.eq(201);
            expect(requestResponse.body).to.have.property('title', 'holla');
            expect(requestResponse.body).to.have.property('id', 101)
            expect(requestResponse.body.id).to.eq(101);
            expect(requestResponse.body.title).to.eq('holla');
            })
    }); 
    
});
  
describe('API test suite', () => {

    Cypress.config('baseUrl', 'https://jsonplaceholder.typicode.com/posts')

    it('Get All Posts',() => {
        cy.request({
            method: 'GET',
            url: '/',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {         
            },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.null;
                expect(response.body).to.be.an('array');
                expect(response.body).to.have.length(100);
        });
    });
    it('Get a single Post',() => {
        cy.request({
            method: 'GET',
            url: '/4',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {         
            },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.null;
                expect(response.body.id).to.be.eq(4);
                expect(response.body).to.have.property('title');
                expect(response.body).to.have.property('body');
                expect(response.body).to.have.property('userId');
        });
    });
    it('Post a new empty Post',() => {
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
        });
    });
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
        });
    }); 
    it('Post a new Post',() => {
        const bodyDescription = "If you're here, you're likely looking to find random words. Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator, it is a word generator that will generate random words for a variety of activities or uses. Even better, it allows you to adjust the parameters of the random words to best fit your needs. The first option the tool allows you to adjust is the number of random words to be generated."; 
        
        cy.request({
            method: 'POST',
            url: '/',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "id": "100",
                "title": 'New Post',
                "body": bodyDescription, 
                "other": "random thoughts", 
            },
        }).then((requestResponse) => {
            expect(requestResponse.status).to.eq(201);
            expect(requestResponse.body).to.have.property('title', 'New Post');
            expect(requestResponse.body).to.have.property('id', 101);
            expect(requestResponse.body).to.have.property('other', "random thoughts");
            expect(requestResponse.body.id).to.eq(101);
            expect(requestResponse.body.body).to.eq(bodyDescription);
            expect(requestResponse.body.title).to.eq('New Post');
        });
    }); 
    it('Put a new Post',() => {
        cy.request({
            method: 'PUT',
            url: '/',
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
            body: {
                "id": "100",
                "title": 'New Post', 
            },
        }).then((requestResponse) => {
            expect(requestResponse.status).to.not.eq(201);

        });
    }); 
    it('Put a single Post',() => {
        cy.request({
            method: 'PUT',
            url: '/8',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "userId": "5",
                "title": "Food Blog", 
            },
        }).then((requestResponse) => {
            expect(requestResponse.status).to.eq(200);
            expect(requestResponse.body.id).to.eq(8);
            expect(requestResponse.body).to.have.property('userId', '5');
            expect(requestResponse.body).to.have.property('title', 'Food Blog');
        
        });
    }); 
    it('Put a single empty Post',() => {
        cy.request({
            method: 'PUT',
            url: '/10',
            headers: {
                'Content-Type': 'application/json',
            },
            body: { 
            },
        }).then((requestResponse) => {
            expect(requestResponse.status).to.eq(200);
            expect(requestResponse.body.id).to.eq(10);
        
        });
    }); 
    it('Delete a single Post',() => {
        cy.request({
            method: 'DELETE',
            url: '/10',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "userId": "5",
                "title": "Food Blog", 
            },
        }).then((requestResponse) => {
            expect(requestResponse.status).to.eq(200);
            expect(requestResponse.body).to.be.empty;   
        });
    });
    
});
  
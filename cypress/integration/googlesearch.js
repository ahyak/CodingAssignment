describe('Google Search Test Suite', () => {
  
  const searchResult = "duck";  
  
  it('Load Google Search Page', () => {
    cy.visit('/');
    cy.title().should('be.equal', 'Google')
   });

  //  it('search the word ducks and hit enter', () => {
  //  cy.get('input[title="Search"]').type('ducks{enter}');
  // });

  it('Search the word ducks and click enter', () => {
    cy.get('input[title="Search"]').type('ducks');
    cy.get('input[value="Google Search"]').first().click()
  });

  it('Verify that ducks were searched for in the search results', () => {
    cy.get('.yuRUbf a').each((item) => { 
      cy.wrap(item).contains(searchResult, { matchCase: false })
      //cy.get('.yuRUbf a').filter(':contains("Ducks")');
    });  
  });

  it('Verify the text under the image displayed in the search results', () => {
    cy.get('.SPZz6b h2 span').contains(searchResult, { matchCase: false })
  }); 

  // it('Click on Images for Ducks', () => {
  //   cy.get('.MUFPAc > :nth-child(2) > a').contains('Images').click()
  // });   
});
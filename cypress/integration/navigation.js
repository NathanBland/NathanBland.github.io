describe('Site Tests', () => {
  it('Should be able to open the home page', () => {
    cy.visit('/')
    cy.contains('NathanBland')
    cy.contains('Blog')
    cy.contains('GitHub')
    cy.contains('Dev.to')
    cy.contains('Twitter')
    cy.get('.profile > img')
      .should('be.visible')
  })
  it('Should be able to navigate to the Blog', () => {
    cy.contains('Blog').click()
    cy.url().should('contain', '/blog')
  })
  it('Should be able to navigate to a blog post', () => {
    cy.server()
    cy.route('GET', '**/*.md').as('post')
    cy.get('.posts-list > a').first().click()
    cy.wait('@post')
    cy.get('.post-body')
      .should('not.be.empty')
  })
})

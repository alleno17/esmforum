describe('Teste de cadastro de resposta', () => {
  it('Cadastra uma resposta e verifica se ela é exibida', () => {
    cy.visit('localhost:3000/resposta/1');

    cy.get('#textarea-resposta').type('Teste de resposta');
    cy.get('#btn-resposta').click();

    cy.contains('Teste de resposta');
  });
});
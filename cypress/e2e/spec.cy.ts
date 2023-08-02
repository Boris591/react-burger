
describe("Test", () => {
  const ingredientSelector = '[class^=ingredient-card_card]';
  beforeEach(() => {
    cy.visit('/');
  });

  it('Test Ingredient Card', function () {
    cy.get(ingredientSelector).first()
        .should('exist');
    cy.get(ingredientSelector).first().click();
    cy.get('[class^=modal_modal]').contains('Детали ингридиента').should('exist');
    cy.get('[class^=modal_close]').click();
  });

  it('Test create order', function () {
    cy.get(ingredientSelector).first()
        .should('exist');

    cy.get(ingredientSelector).first().trigger('dragstart');
    cy.get('[class^=burger-constructor_list]').trigger('drop');

    cy.get('[class^=constructor-card_main]').first()
        .should('exist');
    cy.get('button').contains('Оформить заказ').click();
    cy.get('input[name="email"]').type('boris.kr07@gmail.com');
    cy.get('input[name="password"]').type('bubacho123Z5');
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.wait(20 * 1000);
    cy.get('[class^=modal_modal]').contains('идентификатор заказа').should('exist');
  });

});



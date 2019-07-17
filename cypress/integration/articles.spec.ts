describe("Articles", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load when home page loads", () => {
    cy.get("app-article").should("have.length.greaterThan", 0);
  });

  it("should search", () => {
    cy.get("input.search").type("canvas");
    cy.get(".search-button").click();
    cy.get("app-article").should("have.length", 1);
  });

  // USER CREATED TEST
  // RUN APP WITH "NPM START"
  // IN A DIFFERENT CONSOLE WINDOW RUN CYPRESS WITH "NPX CYPRESS OPEN"
  it("should search MEAN Stack", () => {
    cy.get("input.search").type("MEAN Stack");
    cy.get(".search-button").click();
    cy.get("app-article").should("have.length", 3);
  });

  // USER CREATED TEST FOR TAGS
  it.only("should filter tags", () => {
    // check that the total number of tags is 20
    cy.get(".tags").should("have.length", 20);
    // find tags search input and type 'anim' in it
    cy.get("input[formcontrolname='tagsearch']").type('anim');
    // assert the number of tags returned
    cy.get(".tags").should("have.length", 3);
    // click on 2nd tag 'animations'
    cy.get(".tags").eq(1).contains('animations').click();
    // assert the number of selected tags is 1
    cy.get(".selected.tags > a").should("have.length", 1);
    // assert total tags is 15
    cy.get(".tags").should("have.length", 15);
    // click on the tag with routing
    cy.get(".tags").contains('routing').click();
    // assert there are 3 articles
    cy.get("app-article").should("have.length", 3);
    // BONUS
    // reset filters, check number of tags and articles

    cy.get(".button").contains('Reset Filters').click();
    cy.get(".tags").should("have.length", 20);
    cy.get("app-article").should("have.length", 25);

    // select a tag, assert it's selected
    
    cy.get(".tags").contains("testing").click();
    


    cy.get(".tags").contains("testing").should("have.class", "selected");
    // unselect that tag, assert back to default state
    cy.get(".tags").contains("testing").click().should("not.have.class", "selected");
  });
});

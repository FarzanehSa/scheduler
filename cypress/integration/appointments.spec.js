describe("Appointment", () => {

  beforeEach(() => {
    
    // 1. Reset DB
    const method = "get";
    const url = "/api/debug/reset";
    cy.request(method, url);
    // 2. Visits the root of our web server and confirm can see Monday
    cy.visit("/");
    cy.contains("Monday");
  })

  xit("should book an interview", () => {

    cy.wait(1000)
    // 1. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();
    // 2. Enters their name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones", {delay: 200});
    // 3. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    // 4. Clicks the save button
    cy.contains("Save")
      .click();
    // 5. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
    cy.wait(5000)
  });

  xit("should edit an interview", () => {

    cy.wait(1000)
    // 1. Clicks the edit button for the existing appointment

      cy.get("[alt=Edit]")
      .first()
      .invoke("show")
      .wait(5000)
      .click();
    // 2. Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Sam Smith", {delay: 200});
    cy.get("[alt='Tori Malcolm']")
      .click();
    // 3. Clicks the save button
    cy.contains("Save")
      .click();
    // 4. Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Sam Smith");
    cy.contains(".appointment__card--show", "Tori Malcolm");
    cy.wait(5000)
  });

  it("should cancel an interview", () => {
    
    cy.wait(1000)
    // 1. Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
      .first()
      .wait(2000)
      .click({force: true});
    cy.wait(2000)
    // 2. Clicks the confirm button
    cy.contains("Confirm")
      .click();
    // 3. Sees that the appointment slot is empty
    cy.contains("Deleting")
      .should("exist");
    cy.contains("Deleting")
      .should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");

  });

});
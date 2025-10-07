describe("Home page", () => {
  it("form exists", () => {
    cy.visit("http://localhost:5173/");
    cy.get("form").should("be.visible");
  });
});

describe("Form submission", () => {
  it("creates a short URL and displays it", () => {
    cy.visit("http://localhost:5173/");

    cy.get('input[type="text"]').type("https://example.com/aadfls=dkhfakf&dskfl");

    cy.get("form button[type='submit']").click();

    cy.get("p")
      .contains("Short URL")
      .should("be.visible")
      .and(($p) => {
        const text = $p.text();
        const url = text.split(" ").pop(); 
        expect(url.length).to.be.greaterThan(0); 
        expect(url).to.include("http://localhost:5173/"); 
      });

  });
});
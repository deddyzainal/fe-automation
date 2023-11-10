describe('Paginated Table Test', () => {
  it('should collect data from paginated table', () => {
    // Visit the webpage with paginated table
    cy.visit('https://testautomationpractice.blogspot.com/');

    // Function to collect data from the current table page
    const collectDataFromPage = () => {
      const data = [];

      // Implement logic to collect data from the current page
      cy.get('table tr').each((row) => {
        const rowData = [];
        cy.wrap(row)
          .find('td')
          .each((column) => {
            rowData.push(column.text().trim());
          });
        data.push(rowData);
      });

      return data;
    };

    // Get the total number of pages
    let totalPages = 4; // total number of pages

    // Iterate through the table pages
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      // Collect data from the current page
      const pageData = collectDataFromPage();
      cy.log(`Data from Page ${currentPage}: ${JSON.stringify(pageData)}`);

      // Perform assertions to verify the correctness of the collected data

      // Assertion 1: Check if there is data
      expect(pageData.length).to.be.greaterThan(0);

      // Assertion 2: Check if each row has the expected number of columns
      pageData.forEach((rowData) => {
        expect(rowData.length).to.equal(4); // number of columns
      });

      // Assertion 3: Check if a specific value is present in the data
      expect(pageData.flat()).to.include('ExpectedValue'); // Replace with the expected value

      // Click on the next page link (assuming links are like "Page 2", "Page 3", etc.)
      if (currentPage < totalPages) {
        cy.contains(`Page ${currentPage + 1}`).click();
        // wait for content to load
        cy.wait(2000);
      }
    }
  });
});

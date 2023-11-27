let inputs = [];

function generateSnippet() {
  const lineOfBusiness = document.getElementById('lineOfBusiness').value;
  const product = document.getElementById('product').value;
  const variableA = document.getElementById('variableA').value;
  const variableB = document.getElementById('variableB').value;
  // ... (other variables)

  const outputType = document.getElementById('outputType').value;

  // let javascriptSnippet = '';

  let generatedSnippet = '';
  let plaintextSnippet = '';


  if (outputType === 'contentImpression') {
    generatedSnippet = `(“ContentImpression”, {
      “Detail”: “${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”
    })`;
    plaintextSnippet = `“${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”`;
  } else if (outputType === 'customError') {
    generatedSnippet = `(“custom”, {
      “Detail”: “Error Message: ${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”
    })`;
    plaintextSnippet = `“Error Message: ${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”`;
  } else if (outputType === 'customButtonClick') {
    generatedSnippet = `(“customLink”, {
      “Detail”: “Specialty Button | ${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”
    })`;
    plaintextSnippet = `“Specialty Button | ${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”`;
  } else if (outputType === 'ACDL') {
    generatedSnippet = `adobeDataLayer.push({
      event: '${lineOfBusiness} | ${product}',
      key: '${variableA} | ${variableB}'
    });`;
    plaintextSnippet = `{event: '${lineOfBusiness} | ${product}', key: '${variableA} | ${variableB}'}`;
  } else if (outputType === 'googleDataLayer') {
    generatedSnippet = `dataLayer.push({
      dimension1: '${lineOfBusiness} | ${product}',
      dimension2: '${variableA} | ${variableB}'
    });`;
    plaintextSnippet = `dimension1: '${lineOfBusiness} | ${product}', dimension2: '${variableA} | ${variableB}'`;
  } 

  const newInput = {
    requestId: inputs.length + 1,
    snippet: generatedSnippet,
    plaintext: plaintextSnippet
  };

  inputs.push(newInput);
  displayInputs();
}

function displayInputs() {
  const snippetData = document.getElementById('snippetData');
  snippetData.innerHTML = '';

  inputs.forEach(input => {
    const row = snippetData.insertRow();
    row.insertCell().innerText = input.requestId;
    
    // Rendering the snippet as a code element
    const snippetCell = row.insertCell();
    const codeElement = document.createElement('code');
    codeElement.textContent = input.snippet;
    snippetCell.appendChild(codeElement);

    row.insertCell().innerText = input.plaintext;
  });
}

// Function to convert table data to CSV format
function convertTableToCSV() {
  const table = document.getElementById('snippetTable');
  let csvContent = 'data:text/csv;charset=utf-8,';

  const rows = table.querySelectorAll('tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('th, td');
    const rowData = Array.from(cells).map(cell => cell.textContent).join(',');
    csvContent += rowData + '\n';
  });

  return encodeURI(csvContent);
}

// Function to initiate table download as CSV
function downloadTableAsCSV() {
  const csvData = convertTableToCSV();
  const link = document.createElement('a');
  link.setAttribute('href', csvData);
  link.setAttribute('download', 'table_data.csv');
  document.body.appendChild(link);
  link.click();
}

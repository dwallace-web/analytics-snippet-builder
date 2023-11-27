let inputs = [];

function generateSnippet() {
  const lineOfBusiness = document.getElementById('lineOfBusiness').value;
  const product = document.getElementById('product').value;
  const variableA = document.getElementById('variableA').value;
  const variableB = document.getElementById('variableB').value;
  // ... (other variables)

  const outputType = document.getElementById('outputType').value;

  let javascriptSnippet = '';

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


  // const newInput = {
  //   requestId: inputs.length + 1,
  //   snippet: javascriptSnippet,
  //   plaintext: javascriptSnippet.replace(/[\{\}]|\"/g, '')
  // };
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
    row.insertCell().innerText = input.snippet;
    row.insertCell().innerText = input.plaintext;
  });
}

let inputs = [];

function generateSnippet() {
  const lineOfBusiness = document.getElementById('lineOfBusiness').value;
  const product = document.getElementById('product').value;
  const variableA = document.getElementById('variableA').value;
  const variableB = document.getElementById('variableB').value;
  // ... (other variables)

  const outputType = document.getElementById('outputType').value;

  let javascriptSnippet = '';

  if (outputType === 'contentImpression') {
    javascriptSnippet = `(“ContentImpression”, {
      “Detail”: “${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”
    })`;
  } else if (outputType === 'customError') {
    javascriptSnippet = `(“custom”, {
      “Detail”: “Error Message: ${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”
    })`;
  } else if (outputType === 'customButtonClick') {
    javascriptSnippet = `(“custom”, {
      “Detail”: “Specialty Button | ${lineOfBusiness} | ${product} | ${variableA} | ${variableB}”
    })`;
  }

  const newInput = {
    requestId: inputs.length + 1,
    snippet: javascriptSnippet,
    plaintext: javascriptSnippet.replace(/[\{\}]|\"/g, '')
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

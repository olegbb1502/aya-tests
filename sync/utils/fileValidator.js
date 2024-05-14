const fs = require("fs");

const patterns = {
  "E-List": /^E-List$/,
  "Employee": /^\s+Employee$/,
  "Department": /^\s{4}Department$/,
  "Salary": /^\s{4}Salary$/,
  "Statement": /^\s{6}Statement$/,
  "Donation": /^\s{4}Donation$/,
  "Rates": /^Rates$/,
  "Rate": /^\s+Rate$/,
  "KeyAndValue": /^\s*([^:]+):\s*(.*)$/
};

// Function to check if a line matches any pattern
function matchPattern(line) {
  for (const key in patterns) {
    if (patterns[key].test(line)) {
      return key; // Return the matched pattern key
    }
  }
  return null; // Return null if no pattern matches
}

const fileValidator = (inputData) => {
    let errors = '';
    let isValid = true;
    for (const [index, line] of inputData.split("\n").entries()) {
        if (line.trim() !== '') {
        const matchedPattern = matchPattern(line);
        if (!matchedPattern) {
            isValid = false;
            errors += `Line ${index + 1} is invalid: '${line}'\n`;
        }
        }
    }

    return isValid || errors;
}

module.exports = {
    fileValidator
}

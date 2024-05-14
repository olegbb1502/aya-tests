const fs = require('fs');

const {fileValidator} = require('./fileValidator');

const splitKeyValueLine = (line) => line.split(':').map(item => item.trim());

const countSpaces = (line) => {
    const leadingSpaces = line.match(/^\s*/)[0];
    return leadingSpaces.length;
}

const parseEmployees = (data) => {
    const eList = [];
    let currentEmployee = {};
    let currentObj = {};
    let currentLevel = null;
    let parrentSpaces = countSpaces(data[0]);

    data.forEach(item => {
        const [key, value] = splitKeyValueLine(item);
        const currentSpaces = countSpaces(item);
        if (currentSpaces >= parrentSpaces) {
            if (!value) currentLevel = key.toLowerCase();
            else {
                switch (currentLevel) {
                    case 'employee':
                        currentEmployee[key] = value;
                        break;
                    case 'department':
                        if (key === 'id') 
                            currentEmployee.department_id = value;
                        currentObj[key] = value;
                        break;
                    case 'statement':
                    case 'donation':
                        currentObj[key] = value;
                        currentObj['employee_id'] = currentEmployee.id;
                        break;
                }
            }
            parrentSpaces = currentSpaces;
        } else {
            switch (currentLevel) {
                case 'donation':
                    if (!currentEmployee.donations) {
                        currentEmployee.donations = [currentObj];
                    } else {
                        currentEmployee.donations.push(currentObj);
                    }
                    break;
                case 'department':
                    currentEmployee.department = currentObj;
                    break;
                case 'statement':
                    if (!currentEmployee.salaries) {
                        currentEmployee.salaries = [currentObj];
                    } else {
                        currentEmployee.salaries.push(currentObj);
                    }
                    break;
            }
            if (!value) currentLevel = key.toLowerCase();
            currentObj = {};
            parrentSpaces = currentSpaces;
            if (currentLevel === 'employee') {
                eList.push(currentEmployee);
                currentEmployee = {};
            }
        }
    })

    if (Object.keys(currentEmployee).length > 0) {
        eList.push(currentEmployee);
        currentEmployee = {};
    }

    return eList;
}

const parseRates = (data) => {
    const rates = [];
    let parrentSpaces = countSpaces(data[0]);
    let currentObject = {};
    data.forEach(rate => {
        const currentSpaces = countSpaces(rate);
        if (currentSpaces >= parrentSpaces) { 
            const [key, value] = splitKeyValueLine(rate);
            if (value) currentObject[key] = value;
            parrentSpaces = currentSpaces;
        } else {
            rates.push(currentObject);
            currentObject = {};
        }
    });
    
    if (Object.keys(currentObject).length > 0) rates.push(currentObject);

    return rates;
}

const parseFile = (filename) => {
    const data = fs.readFileSync(filename, 'utf8');
    const isValid = fileValidator(data);
    const res = {};
    if (isValid === true) {
        const lines = data.replace(/^\s*[\r\n]/gm, '').split('\n');
        const dataBreak = lines.indexOf('Rates');

        res.eList = parseEmployees(lines.slice(1, dataBreak));
        res.rates = parseRates(lines.slice(dataBreak+1, lines.length - 1));
    } else {
        res.error = isValid;
    }

    return res;
}

module.exports = {
    parseFile
};

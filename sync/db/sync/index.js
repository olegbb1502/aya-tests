const path = require('path');

const { parseFile } = require('../../utils/fileParser');
const { employeeSync } = require('./employeeSync');
const { rateSync, syncRateFromApi } = require('./rateSync');

const sync = async () => {
    const {
        eList,
        rates,
        errors
    } = parseFile(path._makeLong(process.env.FILE_NAME));

    if (errors) console.error(errors);
    
    if (eList.length > 0) {
        for (const employeeData of eList) {
            try {
                await employeeSync(employeeData);
            } catch (error) {
                console.error('Error processing employee:', error);
            }
        }
    }
    if (rates.length > 0) {
        for (const rate of rates) {
            try {
                await rateSync(rate);
            } catch (error) {
                console.error('Error processing employee:', error);
            }
        }
    } else {
        // ToDo: case when we don`t have rates in dump file
        await syncRateFromApi();
    }
}

sync()
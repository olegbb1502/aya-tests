const { Rate, Donate } = require('../../models');

const rateSync = async ({
  date,
  sign,
  value
}, api) => {
  try {
    const rate = await Rate.findOrCreate(
      {
        where: {
          date: date,
          value: value
        },
        defaults: {
          id: null,
          date: new Date(date),
          sign: sign,
          value: parseFloat(value)
        }
      }
    );

    console.log(`Rate: ${rate.id} Data inserted successfully!`);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Case when we don`t have rates in file
const syncRateFromApi = async () => {
  // const donates = await Donate.findAll();

  return true;
}

module.exports = {
  rateSync,
  syncRateFromApi
}

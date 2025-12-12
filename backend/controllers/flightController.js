const flights = require("../data/flights");

exports.searchFlights = (req, res) => {
  const { from, to, date } = req.query;

  const results = flights.filter(
    f => f.from.toLowerCase() === from.toLowerCase() &&
         f.to.toLowerCase() === to.toLowerCase() &&
         f.date === date
  );

  res.json(results);
};

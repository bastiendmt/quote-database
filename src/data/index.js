const elastic = require("../elastic");
const quotes = require("../quotes.json");

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type,
  },
}[
  ({
    index: {
      _index: elastic.index,
      _type: elastic.type,
    },
  },
  {
    author: "quote author",
    quote: "quote",
  })
];

async function populateDatabase() {
  const docs = [];
  for (const quote of quotes) {
    docs.push(esAction);
    docs.push(quote);
  }
  return elastic.esclient.bulk({ body: docs });
}

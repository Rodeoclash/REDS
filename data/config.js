module.exports = {
  domain: 'http://www.domain.com.au',
  suburbs: ['Brunswick', 'Northcote', 'Fitzroy', 'Coburg'],
  importance: {
    distance: 4,
    price: 2,
    bedrooms: 0.5
  },
  database: {
    development: {
      username: null,
      password: null,
      database: "main",
      host: "localhost",
      dialect: "sqlite",
      storage: __dirname + "crawler.sqlite3",
      logging: false
    }
  },
  listing: {
    type: 'new',
    'old': {
      selector: '.s-listing:not([id*=tsTopSpot])',
      regex: {
        price: /^\d+/,
        bed: /\d\sbed/,
        bath: /\d\sbath/,
        parking: /\d\sparking/
      },
      selectors: {
        price: '.pricepoint',
        address: '.feat-wrap h3 a',
        title: '.description h5',
        description: '.description p:not([class=contact])',
        uri: 'a:contains("More details")',
        features: '.features span'
      }
    },
    'new': {
      selector: '.listing-new:not([data-hash])',
      regex: {
        price: /^\d+/,
        bed: /\d\sbed/,
        bath: /\d\sbath/,
        parking: /\d\sparking/
      },
      selectors: {
        price: '.pricepoint',
        address: '.address',
        //title: '.description h5',
        //description: '.description p:not([class=contact])',
        uri: 'a.link-block',
        features: '.listing-features'
      }
    }
  }
  
};
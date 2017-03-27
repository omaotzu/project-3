const rp = require('request-promise');

function properties(req, res){
  rp({
    method: 'GET',
    url: 'http://api.zoopla.co.uk/api/v1/property_listings.json',
    qs: {
      area: req.query.area,
      listing_status: 'rent',
      keywords: 'residential',
      minimum_beds: req.query.minimum_beds,
      maximum_beds: req.query.maximum_beds,
      api_key: process.env.ZOOPLA_API_KEY
    },
  // const baseUrl ='http://api.zoopla.co.uk/api/v1/property_listings.json\?';
  // const apiKey = process.env.ZOOPLA_API_KEY;
  // // const area = 'wapping';
  // console.log(req.query.area);
  // rp({
  //   method: 'GET',
  //   url: `${baseUrl}area=${req.query.area}&listing_status=rent&minimum_beds=${req.query.minimum_beds}&maximum_beds=${req.query.maximum_beds}&keywords=residential&api_key=${apiKey}`,
    json: true
  })
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}

function selectedProp(req, res) {
  rp({
    method: 'GET',
    url: 'http://api.zoopla.co.uk/api/v1/property_listings.json',
    qs: {
      listing_id: req.query.listing_id.split(','),
      api_key: process.env.ZOOPLA_API_KEY
    },
    qsStringifyOptions: { arrayFormat: 'repeat' }, // talk about this in your presentation! :D
    json: true
  })
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}


module.exports = {
  properties,
  selectedProp
};

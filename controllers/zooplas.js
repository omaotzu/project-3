const rp = require('request-promise');

function properties(req, res){
  const baseUrl ='http://api.zoopla.co.uk/api/v1/property_listings.json\?';
  const apiKey = process.env.ZOOPLA_API_KEY;
  // const area = 'wapping';
  console.log(req.query.area);
  rp({
    method: 'GET',
    url: `${baseUrl}area=${req.query.area}&listing_status=rent&minimum_beds=${req.query.minimum_beds}&maximum_beds=${req.query.maximum_beds}&keywords=residential&api_key=${apiKey}`,
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
  const baseUrl ='http://api.zoopla.co.uk/api/v1/property_listings.json\?';
  const apiKey = process.env.ZOOPLA_API_KEY;
  console.log(req.query.listing_id);
  //listing_id=42734646
  rp({
    method: 'GET',
    url: `${baseUrl}listing_id=${req.query.listing_id}&api_key=${apiKey}`,
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

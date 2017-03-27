const rp = require('request-promise');

function properties(req, res){
  const baseUrl ='http://api.zoopla.co.uk/api/v1/property_listings.json\?';
  const apiKey = process.env.ZOOPLA_API_KEY;
  const area = 'wapping';

  rp({
    method: 'GET',
    url: `${baseUrl}area=${area}&listing_status=rent&keywords=residential&api_key=${apiKey}`,
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

  rp({
    method: 'GET',
    url: `${baseUrl}listing_id=42734646&api_key=${apiKey}`,
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

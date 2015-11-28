// Initialize map
var map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 55.86, lng: -4.24 },
  zoom: 8
});

// Get parameters from Search by Criteria
var hash = window.location.hash.substring(1);
var hashSplit = hash.split('&');
var params = {};

for (var i = 0; i < hashSplit.length; ++i) {
  var paramSplit = hashSplit[i].split('=');
  var paramKey = paramSplit[0];
  var paramValue = paramSplit[1];
  
  params[paramKey] = paramValue;
  $('#' + paramKey + '_value').val(paramValue);
}

// Get parameters from Search by Name
var rq = JSON.parse(sessionStorage.getItem('kwds'));
getData(rq.terms, rq.co);

// Functions

// Ratings through the years chart
function drawChart(data) {
  var tableData = google.visualization.arrayToDataTable(data);
  var options = {
    title: 'Some Restaurant data',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { format: '' }
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(tableData, options);
}

//terms=keyword to search for,location=city,street,post code etc,limit=how many results you want,
//sortby=0=Best matched (default), 1=Distance, 2=Highest Rated.,radius_filter=radius in which to look for restaurants
function getData(terms, coordinates, loc, limit, sortby, radius_filter) {
  terms = terms.toLowerCase();
  terms = terms.replace(/ /g,'-').replace(/[^\w-]+/g,'');

  var auth = {               
    consumerKey: "dkfap0uAB8Sr7XL7VUi3qQ",
    consumerSecret: "lj03Y4N8AFOv_zBfGBz5vLeoaKU",
    accessToken: "8jGK6Ta_wYKb9LPvYgoiAjUjaYC13M86",
    accessTokenSecret: "IvU2j7kmlp2TO-1SSsPhDHe6NcE",
    serviceProvider: { signatureMethod: "HMAC-SHA1" }
  };          

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  var parameters = [];
  parameters.push(['term', terms]);
  parameters.push(['location', loc || 'Glasgow']);
  if (coordinates != null) parameters.push(['cll',coordinates]);
  parameters.push(['limit', limit || 20]);
  parameters.push(['sort', sortby || 0]);
  parameters.push(['radius_filter', radius_filter || 1000]);
  parameters.push(['callback', 'cb']);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  var msg = {
    action: 'http://api.yelp.com/v2/search',
    method: 'GET',
    parameters: parameters
  };

  OAuth.setTimestampAndNonce(msg);
  OAuth.SignatureMethod.sign(msg, accessor);

  var parameterMap = OAuth.getParameterMap(msg.parameters);
  $.ajax({
    url: msg.action,
    data: parameterMap,
    dataType: 'jsonp',
    async: false,
    jsonpCallback: 'cb',
    success: function(data) {
      populate(data.businesses);
      //workdata=data.businesses;       
      //call map  population function here function(data.businesses);                    
    }
  });

}

function populate(restaurantData) {
  console.log(restaurantData);

  var infowindows = [];
  var markers = [];
  var fakeData = [];

  for (var i = 0; i < restaurantData.length; ++i) {
    fakeData.push([]);

    fakeData[i].push(['Year', 'Rating']);
    for (var j = 0; j < 16; ++j) {
      fakeData[i].push([2000 + j, Math.floor(Math.random() * 501) / 100]);
    }

    var venueData = restaurantData[i];
    var restaurantName = venueData.name;
    var number = venueData.phone;
    var categories = venueData.categories;//array of object each of them with a name
    var url = venueData.url;

    var vLocation = venueData.location;
    var location = {
      address: vLocation.address,
      cc: vLocation.cc,
      city: vLocation.city,
      country: vLocation.country_code,
      distance: vLocation.distance,
      formattedAddress: vLocation.display_address
    };

    var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">' + restaurantName +'</h1>' +
                '<div id="bodyContent">'+
                '<p><b>Contact:</b>' + number +
                '<b>Address:</b>'+ location.address + 
                location.cc +
                location.city +
                location.country +
                '<b>Distance from current location:</b>' + location.distance
                '<b>Web page:</b>'+ url +'</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';

    var infoWindow = new google.maps.InfoWindow({content: contentString});
    infowindows.push(infoWindow);
    
    var marker = new google.maps.Marker({
      position: {
        lat: venueData.location.coordinate.latitude,
        lng: venueData.location.coordinate.longitude
      },
      map: map,
      title: restaurantName
    });
    markers.push(marker);
    
    //TODO: alex - ask Nasko not sure why it is not working
    markers[i].addListener('click', function(i, data) {
      for (var j = 0; j < restaurantData.length; j++) infowindows[j].close();
      infowindows[i].open(map, markers[i]);

      drawChart(data);
    }.bind(this, i, fakeData[i]));
  }
}

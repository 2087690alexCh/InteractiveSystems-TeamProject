var map;
var restaurantData;
var loc='Glasgow';
var limit=20;
var sortby=0;
var radius_filter=1000;

map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 55.86, lng: -4.24  },
  zoom: 8
});

$(document).ready(function(){
	var rq=JSON.parse(sessionStorage.getItem('kwds'));
	get_data(rq.terms,rq.co,rq.loc);

});
//terms=keyword to search for,location=city,street,post code etc,limit=how many results you want,
//sortby=0=Best matched (default), 1=Distance, 2=Highest Rated.,radius_filter=radius in which to look for restaurants
        function get_data(terms,coordinates){
	    terms=terms.toLowerCase();
	    terms=terms.replace(/ /g,'-').replace(/[^\w-]+/g,'');
            var auth = {               
                consumerKey : "dkfap0uAB8Sr7XL7VUi3qQ",
                consumerSecret : "lj03Y4N8AFOv_zBfGBz5vLeoaKU",
                accessToken : "8jGK6Ta_wYKb9LPvYgoiAjUjaYC13M86",
                accessTokenSecret : "IvU2j7kmlp2TO-1SSsPhDHe6NcE",
                serviceProvider : {
                    signatureMethod : "HMAC-SHA1"
                }
            };          

            var accessor = {
                consumerSecret : auth.consumerSecret,
                tokenSecret : auth.accessTokenSecret
            };
            parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', loc]);
            if(coordinates!=null)parameters.push(['cll',coordinates]);
            parameters.push(['limit',limit]);
            parameters.push(['sort',sortby]);
            parameters.push(['radius_filter',radius_filter]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

            var msg = {
                'action' : 'http://api.yelp.com/v2/search',
                'method' : 'GET',
                'parameters' : parameters
            };

            OAuth.setTimestampAndNonce(msg);
            OAuth.SignatureMethod.sign(msg, accessor);

            var parameterMap = OAuth.getParameterMap(msg.parameters); 
            $.ajax({
                'url' : msg.action,
                'data' : parameterMap,
                'dataType' : 'jsonp',
                'async':'false',
                'jsonpCallback' : 'cb',                
                'success' : function(data) {
		    populate(data.businesses);
                    //workdata=data.businesses;		    
                    //call map  population function here function(data.businesses);                    
                }
            });            
        }

function populate(data){
		console.log(data);
		restaurantData = data;
			
		var venueData;
		
		var restaurantName;
		var number;
		var categories;
		var location={};
		var markers=[];
		var infowindows = [];
		for (var i=0;i<restaurantData.length;i++){
			venueData = restaurantData[i];
			restaurantName = venueData.name;
			number = venueData.phone;
			categories=venueData.categories;//array of object each of them with a name
			location.address = venueData.location.address;	
			location.cc = venueData.location.cc;
			location.city = venueData.location.city;
			location.country = venueData.location.country_code;
			location.distance = venueData.location.distance;
			location.formattedAddress = venueData.location.display_address;
			url = venueData.url;
			
			console.log(venueData);
			console.log(restaurantName);
			console.log(number);
			console.log(categories);
			console.log(location.address);
			console.log(location.cc);
			console.log(location.city);
			console.log(location.country);
			console.log(location.distance);
			console.log(location.formattedAddress);
			console.log(url);
			
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
	
			infowindows[i] = new google.maps.InfoWindow({
			    content: contentString
			  });
			
			  markers[i] = new google.maps.Marker({
			    position: {lat: venueData.location.coordinate.latitude, lng: venueData.location.coordinate.longitude  },
			    map: map,
			    title: restaurantName
			  });
			  //TODO: alex - ask Nasko not sure why it is not working
			  markers[i].addListener('click', function(i) {
				  infowindows[i].open(map, markers[i]);
				  for (var j=0;j<restaurantData.length;j++){
					  if (i!=j)
						  infowindows[j].close();
				  }
			  }.bind(this, i));
		
		}
	}
	

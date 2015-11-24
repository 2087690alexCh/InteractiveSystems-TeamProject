var map;
var restaurantData;

	function initMap() {
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 55.86, lng: -4.24  },
	    zoom: 8
	  });
	  
	}
	
$(document).ready(function(){
	$.get("https://api.foursquare.com/v2/venues/search?ll=55.86,-4.24&oauth_token=S4ARV15BGVPVEXK1DQMQENJBDBSQA5CFGZFYTC4P5ZN1K0VS&v=20151122",function(data){
		console.log(data);
		restaurantData = data;
		
		
		var venueData;
		
		var restaurantName;
		var number;
		var categories;
		var location={};
		var markers=[];
		var infowindows = [];
		for (var i=0;i<restaurantData.response.venues.length;i++){
			venueData = restaurantData.response.venues[i];
			restaurantName = venueData.name;
			number = venueData.contact.formattedPhone;
			categories=venueData.categories;//array of object each of them with a name
			location.address = venueData.location.address;	
			location.cc = venueData.location.cc;
			location.city = venueData.location.city;
			location.country = venueData.location.country;
			location.distance = venueData.location.distance;
			location.formattedAddress = venueData.location.formattedAddress;
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
			    position: {lat: venueData.location.lat, lng: venueData.location.lng  },
			    map: map,
			    title: restaurantName
			  });
			  //TODO: alex - ask Nasko not sure why it is not working
			  markers[i].addListener('click', function(i) {
				  infowindows[i].open(map, markers[i]);
			  }.bind(this, i));
		
		}
	});
	
	
});
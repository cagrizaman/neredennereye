if (Meteor.isClient) {
  jQuery.fn.extend({
    uff: function() {
        jQuery(this).each(function() {
            var e = jQuery.extend(true, {}, jQueryUFF);
            e.Init(jQuery(this))
        });
        return jQuery(this)
    }
})

//   L.Icon.Default.imagePath = 'packages/fuatsengul_leaflet/1.0.1/web.browser/packages/fuatsengul\:leaflet/images/';
  
  Meteor.startup(function(){
  
  GoogleMaps.load({v:'3',libraries:'geometry,places'});

//OLD LEAFLET MAP

//     var map = L.map('map').setView([41.015137, 28.979530], 10);

//     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

  

// var neredenIcon = L.icon({
//     iconUrl: 'neredenmarker.png',

//     iconSize:     [60, 50], 
//     iconAnchor:   [14, 50],
// });

//   L.marker([41.015137, 28.979530], {icon: neredenIcon}).addTo(map);


//   var nereyeIcon = L.icon({
//     iconUrl: 'nereyemarker.png',

//     iconSize:     [60, 50], 
//     iconAnchor:   [14, 50],
// });

//   L.marker([41.125137, 29.979530], {icon: nereyeIcon}).addTo(map);
    

// var pointA = new L.LatLng(41.015137, 28.979530);
// var pointB = new L.LatLng(41.125137, 29.979530);
// var pointList = [pointA, pointB];

// var Polyline= new L.Polyline(pointList, {
// color: '#D49A6A',
// weight: 6,
// opacity: 0.9,
// smoothFactor: 1
// });
// Polyline.addTo(map);
// map.fitBounds(Polyline.getBounds());

     

      });


Template.map.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(41.0, 28.9631),
        zoom:12
      };
    }
  }
});

Template.template_survey.rendered=function(){
    $("#input_date").datepicker( {
    format: "mm-yyyy",
    startView: "months", 
    minViewMode: "months"
});

  };


  Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
       var neredenCustom = {
                    url:'neredenmarker.png',
                    size: new google.maps.Size(60,50),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(14,50)
    };
     var marker = new google.maps.Marker({
              position: new google.maps.LatLng(41.000,29.0),
              map: map.instance,
              icon: neredenCustom
        });
  
    var defaultBounds = map.instance.getBounds();

    var input = document.getElementById('nereden');
    var options = {
      bounds: defaultBounds,
      types: ['geocode']
};

autocomplete = new google.maps.places.Autocomplete(input, options);

  });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

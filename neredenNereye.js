Places = new Mongo.Collection("places");


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
  
  Meteor.startup(function(){
    TAPi18n.setLanguage("tr");
    GoogleMaps.load({v:'3',libraries:'geometry,places'});

     

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

  Template.template_survey.events({
    'submit form':function(event){
      event.preventDefault();
      var coord1=event.target.nereden_data.value;
      var coord2=event.target.nereye_data.value;
      var name1 = event.target.nereden.value;
      var name2 = event.target.nereye.value;
      var num= event.target.kackisi.value;
      var month=event.target.nezaman1.value;
      var year = event.target.nezaman2.value;
      var options=event.target.neden.selectedOptions;
      var reasons_value=[];
       for (i=0;i<options.length;i++){
          reasons_value.push({name:options[i].text,value:options[i].value});
       }

       var data_entry={from:{coord:coord1,name:name1}, to:{coord:coord2,name:name2}, num:num,date:{month:month,year:year}, reasons:reasons_value};
       Places.insert(data_entry);
       location.reload();
       // @TODO: Add form data into places database. 
    }

  });


Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
       var neredenCustom = {
                    url:'neredenmarker.png',
                    size: new google.maps.Size(60,50),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(14,50)
       };
       var nereyeCustom = {
                    url:'nereyemarker.png',
                    size: new google.maps.Size(60,50),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(14,50)
       };

  
     var neredenMarker=null;
     var nereyeMarker = null;
     var line=null;
     var defaultBounds = map.instance.getBounds();

     var input = document.getElementById('nereden');
      var options = {
      bounds: defaultBounds,
      types: ['geocode']
      };

    

     var input2 = document.getElementById('nereye');
     
    function markNereden(){
      if(neredenMarker != null){
        neredenMarker.setMap(null);
      }
      var place = autocomplete.getPlace();
      var marker = new google.maps.Marker({
              position: place.geometry.location,
              map: map.instance,
              icon: neredenCustom
        });
       neredenMarker=marker;
       map.instance.panTo(place.geometry.location);

       if(nereyeMarker!=null){
       setTimeout(drawPath(),1000);
       }

     }

      function markNereye(){
      if(nereyeMarker != null){
        nereyeMarker.setMap(null);
      }
      var place = autocomplete2.getPlace();
      var marker = new google.maps.Marker({
              position: place.geometry.location,
              map: map.instance,
              icon: nereyeCustom


        });
       nereyeMarker=marker;
       map.instance.panTo(place.geometry.location);
       setTimeout(drawPath(),1000);

     }
       var lineSymbol = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 4,
          strokeColor: '#000'
        };

     
      function drawPath(){
        if(line!=null){
          line.setMap(null);
          window.clearInterval(0);

        }
              line = new google.maps.Polyline({
                path: [neredenMarker.getPosition(),nereyeMarker.getPosition()],
                strokeColor: '#669999',
                strokeOpacity: .7,
                strokeWeight: 1,
                icons: [{
                  icon: lineSymbol,
                  offset: '100%'
                }],
                map: map.instance
              });

              animateCircle();
               }

      function animateCircle() {

          var count = 0;
          window.setInterval(function() {
            count = (count + 1) % 200;

            var icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
        }, 20);
    }

   autocomplete = new google.maps.places.Autocomplete(input, options);
   autocomplete2= new google.maps.places.Autocomplete(input2, options);
   google.maps.event.addListener(autocomplete, 'place_changed', function() {
    markNereden();
    $('#nereden').trigger('change');
    $('#nereden_data').val(neredenMarker.getPosition());
  });
    google.maps.event.addListener(autocomplete2, 'place_changed', function() {
    markNereye();
        $('#nereye').trigger('change');
        $('#nereye_data').val(nereyeMarker.getPosition());


  });

  });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

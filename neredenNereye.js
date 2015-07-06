if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  L.Icon.Default.imagePath = 'packages/fuatsengul_leaflet/1.0.1/web.browser/packages/fuatsengul\:leaflet/images/';
  
  Meteor.startup(function(){
    var map = L.map('map').setView([41.015137, 28.979530], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([41.015137, 28.979530]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
  })
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

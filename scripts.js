var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/ayushjoshi1380/cla60tfra000715nzx88vusa7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhN3V2eTVqMDFieTNvbndyd3N1Y3gwMyJ9.VAix39NKk-7ykIybjc4FrA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhN3V2eTVqMDFieTNvbndyd3N1Y3gwMyJ9.VAix39NKk-7ykIybjc4FrA',

}).addTo(map);

var popup = L.popup({
          closeButton: false,
          autoClose: false
        })
        .setLatLng([47.25, -122.44])
        .setContent('<p>Click on the map to add a start / end point</p>')
        .openOn(map);

var control = L.Routing.control({
         waypoints: [
         ],
          routeWhileDragging: true,
          units:'imperial',
          collapsible: true,
          router: L.Routing.mapbox('pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhN3V2eTVqMDFieTNvbndyd3N1Y3gwMyJ9.VAix39NKk-7ykIybjc4FrA'),

     }).addTo(map);

     function createButton(label, container) {
         var btn = L.DomUtil.create('button', '', container);
         btn.setAttribute('type', 'button');
         btn.innerHTML = label;
         return btn;
     }

     map.on('click', function(e) {
         var container = L.DomUtil.create('div'),
             startBtn = createButton('Start from this location', container),
             destBtn = createButton('Go to this location', container);

         L.popup()
             .setContent(container)
             .setLatLng(e.latlng)
             .openOn(map);
             L.DomEvent.on(startBtn, 'click', function() {
                     control.spliceWaypoints(0, 1, e.latlng);
                     map.closePopup();
                 });
                 L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });
      });

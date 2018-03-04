/**
* Page Loader
*/
$(window).load(function() {
  'use strict';
  $(".loader-item").delay(700).fadeOut();
  $("#pageloader").delay(1200).fadeOut("slow");
  // load map
  init_map();
});


/* ==============================================
Parallax Calling
=============================================== */


(function($) {
  'use strict';
  $(document).ready(function() {
  $(window).bind('load', function () {
      parallaxInit();
      //console.log('window load');
    });
    function parallaxInit() {
      testMobile = isMobile.any();
      if (testMobile == null || testMobile == false)
      {
        $('.home').parallax("-50%", 0.5);
      }
    };
    //console.log('document ready');
    parallaxInit();
  });

  //Mobile Detect
  var testMobile;
  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      Touch: function() {
        return Modernizr.touch;
      },
      WinTabletIE : function() {
        //alert(navigator.userAgent.toLowerCase().indexOf("windows nt"));
        //alert(navigator.userAgent.toLowerCase().indexOf("touch"));
        return (navigator.userAgent.toLowerCase().indexOf("windows nt") != -1 && navigator.userAgent.toLowerCase().indexOf("touch") != -1);
      },
      WinTablet : function(){
        return (navigator.userAgent.toLowerCase().indexOf("windows nt") != -1 && Modernizr.touch.toString() == 'true');
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) || isMobile.WinTabletIE() || isMobile.WinTablet();
      }
  };
}(jQuery));



/* ==============================================
Home Super Slider (images)
=============================================== */
/**/
 $('.slides_fade').superslides({
    animation: 'fade',
    play : false
});

 /*
 * Google ma and address change
 **/
 function changeLocation(location) {
  var addressToShow = '.' + location;
  var linkToActive = '.' + location + '-link';
  $('.loc').addClass('hidden');
  $('.contact-locations li a').removeClass('active');
  $(addressToShow).removeClass('hidden');
  $(linkToActive).addClass('active');
 }


/* ==============================================
Contact map
=============================================== */
/**/

/* auto complete */
/* Google Map on index.html Page */
var StartPlace = '', EndPlace = '';
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var isset = 0; /* use to check map is set for which city/country */
var maploded = -1;
var pbmap = {
  'mumbai' : 'Unit G-05, Liberty Tower, Plot No. K 10, Behind Reliable Plaza, Thane-Belapur Rd, Gavate Wadi, MIDC, Airoli, Navi Mumbai 400 708',
  'munich' : 'InterProducTec Consulting GmbH Co KG, Gollierstr. 70 80339 München, Germany',
  'newyork' : 'Broadway, WeWork 19th Floor, New York, NY'
}


function init_map() {
  var myOptions = {
        zoom:11,
        center:new google.maps.LatLng(19.169440, 73.001304),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
  var iconBase = 'images/'
     marker = new google.maps.Marker({
       map: map,
       position: new google.maps.LatLng(19.169440, 73.001304),
       icon: iconBase + 'Map-Marker-Marker-Outside-Chartreuse-icon.png'
     });
  var styles = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#120d19"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#efefef"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dedede"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#7a7a7a"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#7a7a7a"
        },
        {
          "lightness": 25
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#7a7a7a"
        },
        {
          "lightness": 70
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f2f2f2"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#353535"
        }
      ]
    }
  ];
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

     var isDraggable = w > 480 ? true : false;
     var mapOptions = {
         draggable: isDraggable,
         scrollwheel: false
     };
  map.setOptions({minZoom:3, scrollwheel: false,zoomControl: false, draggable: true, disableDefaultUI:true, styles: styles, disableDoubleClickZoom: true});
  infowindow = new google.maps.InfoWindow({content:"<b>InterProducTec</b><br/>Unit G-05, Liberty Tower, Plot No. K 10,<br/> Behind Reliable Plaza, Thane-Belapur Rd,<br/> Gavate Wadi, MIDC, Airoli,<br/> Navi Mumbai. 400 708" });
  google.maps.event.addListener(marker, "click", function(){infowindow.open(map,marker);});
  infowindow.open(map,marker);
  // Set custom styles on map
  // map.setOptions({styles: styles});
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  EndPlace = pbmap.newyork;
  return false;
};

pbmap.loadMumbai = function(){
  isset = 2;
  console.log('load mumbai function is called ');
  infowindow.close();
  infowindow = new google.maps.InfoWindow({content:"<b>InterProducTec</b><br/>Unit G-05, Liberty Tower, Plot No. K 10,<br/> Behind Reliable Plaza, Thane-Belapur Rd,<br/> Gavate Wadi, MIDC, Airoli,<br/> Navi Mumbai. 400708." });
  newLocation = new google.maps.LatLng(19.169440, 73.001304);
  marker.setPosition( newLocation );
  map.setCenter(newLocation);
  setTimeout(function(){infowindow.open(map,marker);},800);
  directionsDisplay.setMap();
  directionsDisplay = new google.maps.DirectionsRenderer();

}

pbmap.loadMunich = function(){
  isset = 1;
  console.log('load munich function is called ');
  infowindow.close();
  infowindow = new google.maps.InfoWindow({content:"<b>InterProducTec Consulting GmbH Co KG</b><br/>GmbH, Gollierstraße 70,<br/> 80339 Munich, Germany." });
  newLocation = new google.maps.LatLng(48.1370556,11.5339397);
  marker.setPosition( newLocation );
  map.setCenter(newLocation);
  setTimeout(function(){infowindow.open(map,marker);},800);
  directionsDisplay.setMap();
  directionsDisplay = new google.maps.DirectionsRenderer();

}

pbmap.loadNewyork = function(){
  isset = 0;
  console.log('load newyork function is called ');
  infowindow.close();
  infowindow = new google.maps.InfoWindow({content:"<b>InterProducTec Consulting</b><br/>222 Broadway, WeWork 19th Floor, <br/>New York, NY 10038." });
  newLocation = new google.maps.LatLng(40.710968,-74.0084713);
  marker.setPosition( newLocation );
  map.setCenter(newLocation);
  setTimeout(function(){infowindow.open(map,marker);},800);
  directionsDisplay.setMap();
  directionsDisplay = new google.maps.DirectionsRenderer();

}
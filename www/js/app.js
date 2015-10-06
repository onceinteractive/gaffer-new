// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app  = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller("PlayerController", function($scope, $cordovaMedia, $ionicLoading, $ionicPlatform, $cordovaSocialSharing) {
    var media = null;
    var self = null;

    $scope.play = function($event, src) {
      /**if( media ){
         media.pause();
      }**/
      self = $event.currentTarget;
      media = new Media(src, onSuccess, null, null);
      media.play();
      self.classList.toggle('flipped');
    }

    var mediaStatusCallback = function(status) {
      if(status == Media.MEDIA_STARTING) {
          $ionicLoading.show({template: 'Loading...'});
      }else {
          $ionicLoading.hide();
      }
    }
    var onSuccess = function(){
        self.classList.toggle('flipped');
    }
    $scope.pictureURL = '/android_asset/www/img/taffer.jpg';

    $scope.action = function(src) {
        $cordovaSocialSharing.share( "You got Taffer: http://jontaffer.com", "You got Taffer", "https://pbs.twimg.com/profile_images/436271490149793792/AuLC2kV4.jpeg", "https://jontaffer.com");
    }


});

app.directive('backImg', function($ionicLoading,$ionicPlatform) {
    return {
      restrict: 'EA',
      link: function($scope, $elem, $attrs) {
                  var url = $attrs.backImg;
                        $elem.css({
                            'background-image': 'url(' + url +')',
                            'background-size' : 'cover',
                            'background-position' : 'center',
                            'background-repeat' : 'no-repeat',
                            'width': '100%',
                            'height': '30vh',
                            'padding' : '0',
                            'margin' : '0',
                            'top' : '0',
                            /**
                            'display' : 'block',
                            'position' : 'relative',
                            'display' : 'block',
                           'position' : 'relative',
                            'top' : '0',
                            'left' : '0',
                            'margin-left' : '0',**/
                        });

      }
    };
});
/**
app.directive('flippy', function($ionicLoading,$ionicPlatform) {
    return {
      restrict: 'EA',
      link: function($scope, $elem, $attrs) {
                alert($elem);

      }
    };
});
**/
/**
app.directive("flip", function(){

  function setDim(element, width, height){
    element.style.width = width;
    element.style.height = height;
  }

  var cssString =
    "<style> \
    .flip {float: left; overflow: hidden} \
    .flipBasic { \
    position: absolute; \
    -webkit-backface-visibility: hidden; \
    backface-visibility: hidden; \
    transition: -webkit-transform .5s; \
    transition: transform .5s; \
    -webkit-transform: perspective( 800px ) rotateY( 0deg ); \
    transform: perspective( 800px ) rotateY( 0deg ); \
    } \
    .flipHideBack { \
    -webkit-transform:  perspective(800px) rotateY( 180deg ); \
    transform:  perspective(800px) rotateY( 180deg ); \
    } \
    .flipHideFront { \
    -webkit-transform:  perspective(800px) rotateY( -180deg ); \
    transform:  perspective(800px) rotateY( -180deg ); \
    } \
    </style> \
    ";

  document.head.insertAdjacentHTML("beforeend", cssString);


  return {
    restrict : "E",
    controller: function($scope, $element, $attrs, $ionicLoading,$ionicPlatform){
      var media = null;
      var self = this;
      self.front = null,
      self.back = null;

      function showFront(){
        self.front.removeClass("flipHideFront");
        self.back.addClass("flipHideBack");
      }

      function showBack(){
        self.back.removeClass("flipHideBack");
        self.front.addClass("flipHideFront");
      }

      self.init = function(){
        self.front.addClass("flipBasic");
        self.back.addClass("flipBasic");

        showFront();
        self.front.on("click", showBack);
        self.back.on("click", showFront);
      }

      $scope.flip = function(src) {
                media = new Media(src, onSuccess, null, mediaStatusCallback);
                media.play();
        }
        var mediaStatusCallback = function(status) {
              if(status == Media.MEDIA_STARTING) {
                  $ionicLoading.show({template: 'Loading...'});
              }else {
                  $ionicLoading.hide();
              }
        }
        var onSuccess = function(){
             showFront();
        }

    },

    link : function(scope,element,attrs, ctrl){

      var width = attrs.flipWidth || "100px",
        height =  attrs.flipHeight || "100px";

      element.addClass("flip");

      if(ctrl.front && ctrl.back){
        [element, ctrl.front, ctrl.back].forEach(function(el){
          setDim(el[0], width, height);
        });
        ctrl.init();
      }
      else {
        console.error("FLIP: 2 panels required.");
      }

    }
  }

});

app.directive("flipPanel", function( ){
  return {
    restrict : "E",
    require : "^flip",
    //transclusion : true,
    link: function(scope, element, attrs, flipCtr){
      if(!flipCtr.front) {flipCtr.front = element;}
      else if(!flipCtr.back) {flipCtr.back = element;}
      else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});
/**
app.directive('flippy', function($ionicLoading,$ionicPlatform) {
    return {
      restrict: 'EA',
      link: function($scope, $elem, $attrs) {
                var media = null;
        var options = {
          flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
          timingFunction: 'ease-in-out',
        };

        // setting flip options
        angular.forEach(['flippy-front', 'flippy-back'], function(name) {
          var el = $elem.find(name);
          if (el.length == 1) {
            angular.forEach(['', '-ms-', '-webkit-'], function(prefix) {
              angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration/1000 + 's ' + options.timingFunction);
            });
          }
        });

        $scope.flip = function(src) {
            media = new Media(src, onSuccess, null, mediaStatusCallback);
                    media.play();
          $elem.toggleClass('flipped');
        }
        var mediaStatusCallback = function(status) {
                      if(status == Media.MEDIA_STARTING) {
                          $ionicLoading.show({template: 'Loading...'});
                      }else {
                          $ionicLoading.hide();
                      }
                }

                var onSuccess = function(){
                    $elem.toggleClass('flipped');
                }

      }
    };
});
**/

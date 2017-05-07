(function(){
    angular
        .module('app')
        .controller('EditCompanyController', function($scope, $timeout){
            $scope.editItem = {};
            $scope.locationAutocompletes = [];
            
            firebase.database().ref('/companies1/' + getId('id')).once('value').then(function(snapshot){
                $scope.editItem = snapshot.val();
                $scope.$apply();
            });      
            
            for(var i = 0; i <= 4; i++){
                (function(){
                var obj = {};
                obj.getGeolocation = function(){
                    var place = obj.autocomplete.getPlace();
                    console.log(place);
                    console.log(place.geometry.location.lat(), place.geometry.location.lng());
                    obj.location = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: place.formatted_address};
                };
                obj.input = document.getElementById('company-loc' + (i + 1));
                obj.autocomplete = new google.maps.places.Autocomplete(obj.input, {types: ['establishment']});
                obj.autocomplete.addListener('place_changed', obj.getGeolocation);
                $scope.locationAutocompletes.push(obj);
                })();
            }
            $scope.updateCompany = function(){
                var locations = [];
                $scope.locationAutocompletes.forEach(function(item){
                    if(item.location){
                        locations.push(item.location)
                    }
                })
                firebase.database().ref('companies1/' + getId('id')).update({
                        category: $scope.editItem.category,
                        description: $scope.editItem.description,
                        locations: locations,
                        title: $scope.editItem.title,
                    });
                $timeout(function(){window.location.href = 'manage-companies.html'}, 2000)
            };
            
            
            function getId(variable){
               var query = window.location.search.substring(1);
               var vars = query.split("&");
               for (var i=0;i<vars.length;i++) {
                       var pair = vars[i].split("=");
                       if(pair[0] == variable){return pair[1];}
               }
               return(false);
            }
            
            
            
        });
})();
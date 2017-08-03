(function(){
    angular
        .module('app')
        .controller('UploadCompanyController', function($scope, $timeout){
            $scope.locationAutocompletes = [];
            $scope.addCompany = function (item) {
                var storage = firebase.storage();
                var storageRef = storage.ref('images/' + item.title + '.jpeg');
                var locations = []
                $scope.locationAutocompletes.forEach(function(item){
                    if(item.location){
                        locations.push(item.location)
                    }
                })
                storageRef.putString(itemFile, 'base64').then(function (snapshot) {
                    console.log('success')
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url);
                        // firebase.database().ref('companies1/' + uuid()).set({ company: item.title, skip: true })
                        item.image = url;
                        item.locations = locations; 
                        firebase.database().ref('companies1/' + uuid()).set(item)
                    })
                })
                $timeout(function(){window.location.href = "index.html"}, 2000)
            }
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
                })()
            }
            
            
        function uuid() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
        });
})();
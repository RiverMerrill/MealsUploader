var itemFile;
var app = angular.module('app', ['firebase', 'ngMaterial']);

app.controller('MainController', MainController);

function MainController($scope, $firebaseArray, $mdDialog, $mdMedia) {
   $scope.coupon = {};
   $scope.company = {};
   var ref = new Firebase('https://mealsdealssteals.firebaseio.com/coupons')
   $scope.data = $firebaseArray(ref);
   console.log($scope.data)
   var ref2 = new Firebase('https://mealsdealssteals.firebaseio.com/companies')
   $scope.companies = $firebaseArray(ref2);
   console.log($scope.companies);
   $scope.addItem = function(item) {
      var temp = new Firebase('https://mealsdealssteals.firebaseio.com/coupons/');
      var db = $firebaseArray(temp);
      item.image = itemFile;
      db.$add(item);
   }
   $scope.addCompany = function(item){
      console.log(item);
      var temp = new Firebase('https://mealsdealssteals.firebaseio.com/companies');
      var db = $firebaseArray(temp);
      item.image = itemFile;
      db.$add(item);
   }
   $scope.removeItem = function(index) {
      $scope.data.$remove(index);
   }
   $scope.home = function(){
      window.location.href = 'index.html'
   }
   $scope.showAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
         $mdDialog.alert()
         .parent(angular.element(document.querySelector('#popupContainer')))
         .clickOutsideToClose(true)
         .title('This is an alert title')
         .textContent('You can specify some description text in here.')
         .ariaLabel('Alert Dialog Demo')
         .ok('Got it!')
         .targetEvent(ev)
      );
   };
}


















function previewFile() {
   var preview = document.querySelector('img');
   var file = document.querySelector('input[type=file]').files[0];
   var reader = new FileReader();
   reader.addEventListener("load", function() {
      preview.src = reader.result;
      itemFile = reader.result;
   }, false);

   if (file) {
      reader.readAsDataURL(file);
   }
}

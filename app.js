var itemFile;
var app = angular.module('app', ['firebase', 'ngMaterial', 'ngDialog']);

app.controller('MainController', MainController);

function MainController($scope, $firebaseArray, $mdDialog, $mdMedia, ngDialog) {
    $scope.emails = emails;
    if(!localStorage.getItem('resetCache')){
        localStorage.setItem('resetCache', 'true');
        window.location.reload()
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
    $scope.editCoupon = function (item) {
        ngDialog.open({ template: 'popupTmpl.html', className: 'ngdialog-theme-default', controller: 'MainController', scope: $scope });
        $scope.editItem = item;
        if (item.image[0] !== 'h' && item.image[0] !== 'd' ) {
            console.log(item.image[0]);
            item.image = 'data:image/jpeg;base64,' + item.image;
        }
        console.log($scope.editItem.$id);
        $scope.updateItem = function () {
            // var storage = firebase.storage();
            // var storageRef = storage.ref('couponImages/' + item.title + '.jpeg');
            // storageRef.putString(itemFile, 'base64').then(function (snapshot) {
                // storageRef.getDownloadURL().then(function (url) {
                    // console.log(url);
                    // $scope.editItem.image = url;
                    firebase.database().ref('coupons/' + uuid()).set({
                        company: $scope.editItem.company,
                        description: $scope.editItem.description,
                        oneTime: $scope.editItem.oneTime,
                        title: $scope.editItem.title,
                        image: $scope.editItem.image
                    });
                    firebase.database().ref('coupons/' + $scope.editItem.$id).remove();
                    // firebase.database().ref('coupons/' +)
                    // window.location.href = "index.html"
                // })
            // })
            ngDialog.close();
        }
        console.log(item);
    };
    $scope.data = {};
    // var storage = firebase.storage();
    // var storageRef = storage.ref('images/image1.jpg')
    // storageRef.child('images/image1.jpg').getDownloadURL().then(function (url) {
    //     console.log(url)
    // }).catch(function (error) {
    //     // Handle any errors
    // });
    $scope.coupon = {};
    $scope.company = {};
    $scope.data = localStorage.getItem('coupons');
    // $scope.companies = localStorage.getItem('companies');
    var ref = new Firebase('https://mealsdealssteals.firebaseio.com/coupons')
    $scope.data = $firebaseArray(ref);
    var ref2 = new Firebase('https://mealsdealssteals.firebaseio.com/companies1')
    $scope.companies = $firebaseArray(ref2);
    console.log($scope.companies);
    $scope.saveLocal = function () {
        var coupons = [];
        var companies = [];
        $scope.data.forEach(function (item) {
            coupons.push(item);
        })
        $scope.companies.forEach(function (item) {
            coupons.push(item);
        })
        localStorage.setItem('coupons', coupons);
        localStorage.setItem('companies', companies);
        console.log(localStorage.getItem('coupons'))
    }
    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }


    $scope.addItem = function (item) {
        var temp = new Firebase('https://mealsdealssteals.firebaseio.com/coupons/');
        var db = $firebaseArray(temp);
        item.image = itemFile;
        db.$add(item);

    }
    $scope.newAddItem = function (item) {
        var storage = firebase.storage();
        var storageRef = storage.ref('couponImages/' + item.title + '.jpeg');
        storageRef.putString(itemFile, 'base64').then(function (snapshot) {
            console.log('success')
            storageRef.getDownloadURL().then(function (url) {
                console.log(url);
                item.image = url;
                firebase.database().ref('coupons/' + uuid()).set(item);
                // window.location.href = "index.html"
            })
        })
    }
    $scope.addCompany = function (item) {
        var storage = firebase.storage();
        var storageRef = storage.ref('images/' + item.title + '.jpeg');
        storageRef.putString(itemFile, 'base64').then(function (snapshot) {
            console.log('success')
            storageRef.getDownloadURL().then(function (url) {
                console.log(url);
                // firebase.database().ref('companies1/' + uuid()).set({ company: item.title, skip: true })
                item.image = url;
                firebase.database().ref('companies1/' + uuid()).set(item)
                // window.location.href = "index.html"
            })
        })
        // console.log(item);
        // var temp = new Firebase('https://mealsdealssteals.firebaseio.com/companies');
        // var db = $firebaseArray(temp);
        // var temp2 = new Firebase('https://mealsdealssteals.firebaseio.com/coupons/');
        // var db2 = $firebaseArray(temp2);
        // db2.$add({ company: item.title, skip: true })
        // item.image = itemFile;
        // db.$add(item);
    }
    $scope.removeItem = function (index, item) {
        firebase.database().ref('coupons/' + item.$id).remove()
        console.log(item);
    }
    $scope.removeCompany = function (index, item) {
        firebase.database().ref('companies1/' + item.$id).remove()
        console.log(item);
    }
    $scope.home = function () {
        window.location.href = 'index.html'
    }
    $scope.showAlert = function (ev) {
        alert = $mdDialog.alert({
            title: 'Attention',
            textContent: 'This is an example of how easy dialogs can be!',
            ok: 'Close'
        });

        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
    };
}


















function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
        itemFile = reader.result.substring(reader.result.indexOf(',') + 1);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

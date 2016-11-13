(function() {
  'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListCheckOffServiceProvider'];
function Config(ShoppingListCheckOffServiceProvider) {
  ShoppingListCheckOffServiceProvider.defaults.toBuyList = [
    {name: "ice-creams", quantity: "2"},
    {name: "chairs", quantity: "4"},
    {name: "carpet", quantity: "1"},
    {name: "pillows", quantity: "2"},
    {name: "table", quantity: "1"}
  ];
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyList();

  toBuy.checkOff = function(item) {
      ShoppingListCheckOffService.checkOff(item);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtList();
}

function ShoppingListCheckOffService(toBuyList) {
  var service = this;

  service.toBuyList = toBuyList;
  service.alreadyBoughtList = [];

  service.getToBuyList = function() {
    return service.toBuyList;
  };

  service.getAlreadyBoughtList = function() {
    return service.alreadyBoughtList;
  };

  service.checkOff = function(item) {
    service.alreadyBoughtList.push(item);

    var idx = service.toBuyList.indexOf(item);
    if (idx > -1) {
      service.toBuyList.splice(idx, 1);
    }
  };
}

function ShoppingListCheckOffServiceProvider() {
  var provider = this;

  provider.defaults = {
    toBuyList: []
  };

  provider.$get = function() {
    var service = new ShoppingListCheckOffService(provider.defaults.toBuyList);
    return service;
  };
}

})();

//use google places to autocomplete address
appDirectives.directive('addressSelector', [function () {
    return {
        restrict: 'E',
        scope: {
            address: '=',
            directiveControl: '='
        },
        templateUrl: 'templates/address-selector.html',
        link: function (scope, element, attrs) {
            //get google service
            scope.addressAutoCompleteSerice = new google.maps.places.AutocompleteService();

            scope.resetPredictions = function () {
                scope.predictions = null;
            };
            
            if (scope.directiveControl) {
                scope.directiveControl.resetPredictions = scope.resetPredictions;
            }
            
            //find addresses list to autocomplete, return to view model
            scope.fillAddresses = function (address) {
                if (address.trim() === '') {
                    scope.resetPredictions();
                    return;
                }

                //find and return
                var options = {
                    input: address,
                    componentRestrictions: {country: "nz"}
                };
                scope.addressAutoCompleteSerice.getPlacePredictions(options, function (predictions, status) {
                    if (status != google.maps.places.PlacesServiceStatus.OK) {
                        scope.resetPredictions();
                        return;
                    }

                    scope.predictions = predictions;
                });
            };

            //chose address from list, reset list
            scope.setAddressValue = function (address) {
                scope.address.value = address;
                scope.resetPredictions();
            }
        }
    };
}]);
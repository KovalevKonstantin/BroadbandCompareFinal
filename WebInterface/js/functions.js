function enableAddressAutocomplete($scope) {
    if ($('#addr-check').length > 0) {
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete((document.querySelector('#addr-check')), {types: ['geocode']});
        autocomplete.addListener('place_changed', fillInAddress);

        function fillInAddress() {
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();
            $scope.setAddressValue(place.formatted_address);
            $('.addr-input div.error').hide();
        }
    }
}
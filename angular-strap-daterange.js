	 /**
     * @note form validation (check that from date is before to date)
     */
    angular.module('obiWan').directive('laterthan', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, elem, attrs, ngModel) {

                if(!ngModel) { return; }

                attrs.$observe('laterthan', function (val) {

                    if ( !attrs.required ) { return; }

                    elem.removeClass("changeAlert");
                    this.updateDateSettings(val);
                });

                this.updateDateSettings = function ( newVal ) {
                    if ( !newVal ) { return; }

                    var _newFromDate;
                    if (typeof newVal === "string" && newVal.match(/^[0-9]+$/) != null) {
                        _newFromDate = new Date(parseInt(newVal, 10));
                    } else {
                        // Hack to deal with angular wrapping the date description in extra set of ""
                        var _string = newVal.replace('"', '').replace('"', '');
                        _newFromDate = new Date(_string);
                    }

                    // always update the minimum to-date
                    var _newToMinDate = new Date( _newFromDate.valueOf() + 1 * 864e5 );
                    attrs.$set('minDate', _newToMinDate);

                    if ( !ngModel.$viewValue ) { ngModel.$viewValue = _newFromDate; }

                    if ( ngModel.$viewValue.valueOf() - _newFromDate.valueOf()  > 8640000  )  {
                        return;
                    }

                    ngModel.$render = function() {
                        // This assumes dates are in MM/DD/YYYY format.
                        this.convertToPrettyDate = function ( date ) {
                            var _conv = new Date(date);
                            var _date = _conv.getDate().toString().length > 1 ? _conv.getDate() : "0"+_conv.getDate();
                            return (_conv.getMonth()+1) + "/" + _date + "/" + _conv.getFullYear();
                        };

                        elem.val(this.convertToPrettyDate(_newToMinDate));
                        elem.addClass("changeAlert");
                    };

                    // ngModel.$modelValue = _newToMinDate;
                    // ngModel.$viewValue = _newToMinDate;
                    ngModel.$setViewValue(_newToMinDate);
                    ngModel.$render();
                };
            }
        };
    });

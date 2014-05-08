	 /**
     * @note form validation (check that from date is before to date)
     */
    angular.module('theApp').directive('laterthan', ["$datepicker", function($datepicker) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, elem, attrs, ngModel) {

                if(!ngModel) { return; }

                attrs.$observe('laterthan', function (val) {
                    if (attrs.changedclass) {
                        elem.removeClass(attrs.changedclass);
                    }
                    this.updateDateSettings(val);
                });

                // This assumes dates are in MM/DD/YYYY format. Tweak as necessary.
                this.convertToPrettyDate = function ( date ) {
                    var _conv = new Date(date);
                    var _date = _conv.getDate().toString().length > 1 ? _conv.getDate() : "0"+_conv.getDate();
                    return (_conv.getMonth()+1) + "/" + _date + "/" + _conv.getFullYear();
                };

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

                    // always update the minimum to date
                    var _newToMinDate = new Date( _newFromDate.valueOf() + 1 * 864e5 );
                    attrs.$set('minDate', _newToMinDate);

                    if ( ngModel.$viewValue.valueOf() - _newFromDate.valueOf()  > 8640000  )  {
                        return;
                    }

                    ngModel.$render = function() {
                        ngModel.$setViewValue(_newToMinDate);
                        elem.val(this.convertToPrettyDate(_newToMinDate));
                        if (attrs.changedclass) {
                            elem.addClass(attrs.changedclass);
                        }
                    };

                    ngModel.$modelValue = _newToMinDate;
                    ngModel.$setViewValue(_newToMinDate);
                };
            }
        };
    }]);
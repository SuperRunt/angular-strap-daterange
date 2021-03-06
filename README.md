date range directive for angular-strap datepicker
==================================================

This directive lets you compare two angular-strap datepicker fields, for use when you have a to- and from-date in same scope.
<br><br>
This directive observes the from-date. The datepicker minDate will always be set to the from-date + 1 day.
If the from-date gets set to after the to-date, the to-date gets updated to from-date + 1 day. If the to-date is updated
by the directive, the field 'flashes' to alert the user to this update.
<br><br>
Easily implemented by adding laterthan="{{fromDate}}" to the to-date form field together with the bs-datepicker directive.
If you would like to add a class to the form field that gets automatically updated, you can add it with
changedclass="<classname>". I like to pulse the border in a different color. You can see an example of that in the example.html.

```
<input type="text" class="form-control date" readonly="true" ng-model="searchParams.fromDate" data-min-date="today" bs-datepicker required />
<input type="text" class="form-control date" readonly="true" ng-model="searchParams.toDate" data-min-date="{{toMinDate}}" laterthan="{{searchParams.fromDate}}" changedclass="changeAlert" bs-datepicker required />
```

Bower install:
```
bower install angular-strap-daterange
```
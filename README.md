q_library
=========
---
This is a quick JavaScript library for common tasks I use.
If you are interseted in it or have a comment please don't hesitate to contact me.
Below is a breakdown of the library.

### Arrays and Objects List-

#### Months:
An array of the full month text. 
~~~javascript
var January = q.months[0]; // Returns "January"
~~~

#### Short Months:
An array of Abbreviated month names starting with "Jan"
~~~javascript
var shortJanuary = q.shortMonths[0]; // Returns "Jan"
~~~

#### Days:
An array of the Full day names starting with "Sunday"
~~~javascript
var Sunday = q.days[0]; // Returns "Sunday"
~~~

#### Short Days:
An array of Abbreviated day names starting with "Sun"
~~~javascript
var shortSunday = q.shortDays[0]; // Returns "Sun"
~~~

#### Key Codes:
An object of common keys and there codes
~~~javascript
var enter = q._keys_.Enter; // Returns 13

var shift = q._keys_.Shift; // Returns 16
~~~

### Function List-
#### q.getTime()
getTime() Takes no arguments. Returns string of current time. getTime() is best used in a timer with setInterval()

~~~javascript
var currentTime = getTime(); // returns string of time h:m:s am/pm
~~~

#### q.getDate(option)
getDate(option) Takes one argument as a string to format the returned string.
##### options
* "m/d/year" 
* "month day, year"
* "month(text)"
* "month(abbr)"
* "day(text)"
* "day(abbr)"

If the option string does not match on of the above options this function returns a new Date().

If the option is left blank it will default to "m/d/year".

~~~javascript
var today = q.getDate(); // Returns Numeric date, "10/9/2014"
var today = q.getDate("month day, year"); // Returns full month name numeric day and numeric full year, "October 9, 2014"
~~~

#### q.goToTop(options)
goToTop(options) Takes an object containing the speed of the scroll in miliseconds 

~~~javascript
Button.addEventListener( "click", q.goToTop({ speed: 500 }) );
~~~

#### q.store(name, input)
store(name, input) Takes two arguments name and input. The name argument is a string name for the input to be stored. The input argument is an object or string of data. If input is an object it will be created into a string using  JSON.stringify. If Storage is available in your browser it will be added to your sessionStorage. If not you will get a return of false;

~~~javascript
q.store("userName", "Timmy Taylor"); // stores "Timmy Taylor" under the name of "userName"
~~~

#### q.getStorage(name)
getStorage(name) Takes one argument. The name argument is a string of the name to get. If storage is available it returns the data in storage. If not it will return false.

~~~javascript
var userName = q.getStorage("userName"); // Returns data or false;
~~~

#### q.setUpTable(tableId, dataSet)
setUpTable(tableId, dataSet): Takes in an id for the table to that will be modified and a flat object containing key:value data. This data is then added to the table with the id provided as new rows with two columns. One with the key and one with the value.

~~~javascript
var dataSet = {"date" : "Dec 5, 2014", "time": "12:40 pm"};
q.setUpTable("tableId", dataSet);
~~~


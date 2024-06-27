(function() {
    'use strict';
    /****
     * The q library is for quick implementation of some basic development procedures.
     */
    var q = {
        name: "q library",
        description: "The q library is for quick implementation of some basic development procedures.",
        version: "0.1",
        dependancies: "none"
    };
    /****
     * Long month names
     */
    q.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    /****
     * Long day names
     */
    q.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    /****
     * Short day names
     */
    q.shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    /****
     * Short month names
     */
    q.shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    /****
     * key codes
     */
    q._keys_ = {
        'Backspace': 8,
        'Tab': 9,
        'Enter': 13,
        'Shift': 16,
        'Ctrl': 17,
        'Alt': 18,
        'Pause': 19,
        'Capslock': 20,
        'Esc': 27,
        'Pageup': 33,
        'Pagedown': 34,
        'End': 35,
        'Home': 36,
        'Leftarrow': 37,
        'Uparrow': 38,
        'Rightarrow': 39,
        'Downarrow': 40,
        'Insert': 45,
        'Delete': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        'a': 65,
        'b': 66,
        'c': 67,
        'd': 68,
        'e': 69,
        'f': 70,
        'g': 71,
        'h': 72,
        'i': 73,
        'j': 74,
        'k': 75,
        'l': 76,
        'm': 77,
        'n': 78,
        'o': 79,
        'p': 80,
        'q': 81,
        'r': 82,
        's': 83,
        't': 84,
        'u': 85,
        'v': 86,
        'w': 87,
        'x': 88,
        'y': 89,
        'z': 90,
        '0numpad': 96,
        '1numpad': 97,
        '2numpad': 98,
        '3numpad': 99,
        '4numpad': 100,
        '5numpad': 101,
        '6numpad': 102,
        '7numpad': 103,
        '8numpad': 104,
        '9numpad': 105,
        'Multiply': 106,
        'Plus': 107,
        'Minus': 109,
        'Dot': 110,
        'Slash1': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'equal': 187,
        'Comma': 188,
        'Slash': 191,
        'Backslash': 220
    };
    /**
     * getTime(): Takes no peramiters. Returns string of current
     * time. getTime() is best used in a timer with setInterval().
     *
     * @returns {String} returns string of time h:m:s am/pm
     */
    q.getTime = function() {
        var d, h, m, s, t, ampm;
        d = new Date();
        h = d.getHours();
        m = d.getMinutes();
        s = d.getSeconds();
        if (h > 12) {
            h = h - 12;
            ampm = "PM";
        }
        else {
            ampm = "AM";
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        t = h + ":" + m + ":" + s + " " + ampm;
        return t;
    };
    /**
     * getDate(option): Takes in string representation of desired
     * date string to be returned.
     * Options are "m/d/year", "month day, year", "month(text)",
     * "month(abbr)", "day(text)", "day(abbr)" all others will return
     * new Date(); If no option is set "m/d/year" is assumed.
     *
     * @param {String} option
     * @returns {String}
     */
    q.getDate = function(option) {
        var _D = new Date();

        var m, d, y, day;

        m = _D.getMonth();
        d = _D.getDate();
        day = _D.getDay();
        y = _D.getFullYear();

        if (option) {
            switch (option) {
                case "m/d/year":
                    return (m + 1) + "/" + d + "/" + y;
                case "month day, year":
                    return q.months[m] + " " + d + ", " + y;
                case "month(text)":
                    return q.months[m];
                case "month(abbr)":
                    return q.shortMonths[m];
                case "day(text)":
                    return q.days[day];
                case "day(abbr)":
                    return q.shortDays[day];
                default:
                    return _D;
            }
        }
        else {
            return (m + 1) + "/" + d + "/" + y;
        }
    };

    /**
     * goToTop(options): Takes in an object of the speed to use
     * {speed: 300} is nice. If options is left out it will default
     * to {speed: 500}. When added to an event the function will
     * scroll the window to the top at your desired speed.
     *
     * @param {Object} options speed is only option
     * @returns {Boolean}
     */
    q.goToTop = function(options) {

        //set options to default if improper input is provided
        options = options || {
            speed: 500
        };
        if (!(options.speed) || isNaN(options.speed)) {
            options.speed = 500;
        }

        // Get body tag
        var body = document.getElementsByTagName("body");
        // Get html tag
        var html = document.getElementsByTagName("html");
        // set the scrollTop
        var top = body[0].scrollTop || html[0].scrollTop;
        // Set the scrollLeft
        var left = body[0].scrollLeft || html[0].scrollLeft;
        // check to see if the page is at the top    
        if (top > 0) {
            // Start a timer to slow the scroll to the top
            var timerHandle = window.setInterval(function() {
                // Calculate the scroll amount required per tick.
                var scrollAmountPerTick = top / options.speed * 10;
                // Subtract the amount from the top.
                top -= scrollAmountPerTick;
                // Scroll to the same coordinate left and the new top
                window.scrollTo(left, top);
                // Check if the page is at the top
                if (top < 1) {
                    // Set top to zero
                    top = 0;
                    // remove the interval timer so it will be able to scroll down again
                    window.clearInterval(timerHandle);
                }
            }, 10); // the 10 is the time to call the interval
        }
        else {

            return false;
        }
    };

    /**
     * warnDev is shorcut to console.warn()
     *
     * @param {String|Object} input
     */
    q.warnDev = function(input) {
        console.warn(input);
    };

    /**
     * store(name, input): Takes the name of the item to store and
     * the input to store. The input must be a string or object. If
     * input is an object it will be created into a string using
     * JSON.stringify. If Storage is available in your browser it
     * will be added to your sessionStorage. If not you will get a
     * return of false;
     *
     * @param {String} name
     * @param {String|object} input
     * @returns {Boolean}
     */
    q.store = function(name, input) {
        var string;
        switch (typeof(input)) {
            case "string":
                string = input;
                break;

            case "object":
                string = JSON.stringify(input);
                break;
            default:
                q.warnUser("This must be a string: " + input);
                break;
        }
        if (typeof(Storage) !== "undefined" && typeof(string) !== "undefinded") {
            // Yes! localStorage and sessionStorage support!
            sessionStorage.setItem(name, string);
            return true;
        }
        else {
            // Soon to implement cookies
            return false;
        }

    };
    /**
     * getStorage takes in the name of the item to retrieve and checks
     * for the availablity of storage. If storage is available it
     * returns the data in storage. If not it will return false.
     *
     *
     * @param {String} name String name of stored data
     * @returns {String|Boolean} Returns data as string or object or
     * if Storage is not available it returns false
     */
    q.getStorage = function(name) {
        if (typeof(Storage) !== "undefined") {
            // Yes! localStorage and sessionStorage support!
            var data = sessionStorage.getItem(name);

            if (typeof(data) === "object") {
                data = JSON.parse(data);
            }

            return data;
        }
        else {
            // Soon to implement cookies
            return false;
        }
    };

    /**
     * setUpTable(tableId, dataSet): Takes in an id for the table to
     * that will be modified and a flat object containing key:value
     * data. This data is then added to the table with the id
     * provided as new rows with two columns. One with the key and
     * one with the value.
     *
     * @param {String} tableId String of tables unique id
     * @param {Object} dataSet 2d object of key value data...see example
     *
     * @example dataSet = {"date" : "Dec 5, 2014", "time": "12:40 pm"}
     */
    q.setUpTable = function(tableId, dataSet) {
        function populateTable(id, input) {
            var row, data;
            row = document.createElement("tr");
            data = [document.createElement("td"), document.createElement("td")];
            for (var i = 0; i < data.length; i++) {
                data[i].innerHTML = input[i];
                row.appendChild(data[i]);
            }
            document.getElementById(id).appendChild(row);
        };
        for (var key in dataSet) {
            populateTable(tableId, [key, dataSet[key]]);
        }
    };
    /**
     * addEvent(element, event, callBack):
     * Checks for addEventListener or attachEvent and adds
     * the event to the element accodingly along with the callBack
     *
     * @param {DOM element} element DOM element IE: window, document,
     * or elements retrieved using document.getElementById('ID-HERE')
     *
     * @param {String} event event name IE: "click"
     * @param {Function} callBack function passed to be completed on
     * the fire of the event
     */
    q.addEvent = function(element, event, callBack) {
        if (element.addEventListener) {
            element.addEventListener(event, function(e) {
                callBack(e);
            });
        }
        else {
            element.attachEvent(event, function(e) {
                callBack(e);
            });
        }
    };

    /**
     * limitText(text, limit): Takes in string of text to limited
     * and number of words to limit to as a number. Retruns limited
     * string with elipsis.
     *
     * @param {string} text String of text to be limited
     * @param {number} limit Number of words to limit to.
     * @returns {String} Retruns string of limited text with elipsis
     */
    q.limitText = function(text, limit) {
        var words = text.split(' '),
            wordsStart = words.length,
            newWords = words.slice(0, limit);

        if (wordsStart > limit) {
            return newWords.join(' ') + " ...";
        }
        else {
            return newWords.join(' ');
        }
    };
    /**
     * get(url, data, success): Takes in url as string for where to send request,
     * data to be passed in url (See example), success as a function to process
     * the response text. Get request is sent to url with added data and
     * response text is sent to success function when done. Assumes JSON returned;
     *
     * @param {String} url String of request destination
     * @param {String} data url encoded string
     * @param {Function} success Function to process returned json
     * @returns {undefined} Returns nothing
     * @example data = "name=Jeff, Lname=Roberts";
     */
    q.get = function(url, data, success) {
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("post", url + "?" + data, true);
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                if (typeof(success) === "function") {
                    success(JSON.parse(xmlhttp.responseText));
                }
                else {
                    q.warnDev(JSON.parse(xmlhttp.responseText));
                }
            }
        };
    };
    /**
     * post(url, data, success): Takes in url as string for where to send request,
     * data to be passed  (See example), success as a function to process
     * the response text. Post request is sent to url along with data and
     * response text is sent to success function when done. Assumes JSON returned;
     *
     * @param {type} url String of request destination
     * @param {type} data url encoded string
     * @param {type} success Function to process returned json
     * @returns {undefined} Returns nothing
     * @example data = "name=Jeff, Lname=Roberts";
     */
    q.post = function(url, data, success) {
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("post", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                if (typeof(success) === "function") {
                    success(JSON.parse(xmlhttp.responseText));
                }
                else {
                    q.warnDev(JSON.parse(xmlhttp.responseText));
                }

            }
        };

    };
    /**
     * getXML(url, success): Takes in string of url to get xml document. Takes in a
     * function to process the xml document response.
     *
     * @param {String} url String url to xml document
     * @param {Function} success function that will process the returned document
     * @returns {undefined} retruns nothing
     *
     */
    q.getXML = function(url, success) {
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("get", url, true);
        xmlhttp.responseType = "document";
        xmlhttp.send(null);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                if (typeof(success) === "function") {
                    success(xmlhttp.responseXML);
                }
                else {
                    q.warnDev(xmlhttp.responseXML);

                }

            }
        };
    };

    /**
     * Assign the library to the window object
     */
    window.quick = q, window.q = q;
})();

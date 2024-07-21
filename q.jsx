(function() {
    'use strict';

    const q = {
        name: "q library",
        description: "The q library is for quick implementation of some basic development procedures.",
        version: "0.1",
        dependencies: "none"
    };

    q.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    q.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    q.shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    q.shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

    q.getTime = function() {
        const d = new Date();
        let h = d.getHours();
        const m = d.getMinutes().toString().padStart(2, '0');
        const s = d.getSeconds().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        return `${h}:${m}:${s} ${ampm}`;
    };

    q.getDate = function(option) {
        const _D = new Date();
        const m = _D.getMonth();
        const d = _D.getDate();
        const day = _D.getDay();
        const y = _D.getFullYear();

        switch (option) {
            case "m/d/year":
                return `${m + 1}/${d}/${y}`;
            case "month day, year":
                return `${q.months[m]} ${d}, ${y}`;
            case "month(text)":
                return q.months[m];
            case "month(abbr)":
                return q.shortMonths[m];
            case "day(text)":
                return q.days[day];
            case "day(abbr)":
                return q.shortDays[day];
            default:
                return `${m + 1}/${d}/${y}`;
        }
    };

    q.goToTop = function(options = { speed: 500 }) {
        if (isNaN(options.speed)) {
            options.speed = 500;
        }

        const scrollToTop = () => {
            const top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top > 0) {
                window.scrollBy(0, -top / options.speed * 10);
                setTimeout(scrollToTop, 10);
            }
        };

        scrollToTop();
    };

    q.warnDev = console.warn;

    q.store = function(name, input) {
        const string = typeof input === "object" ? JSON.stringify(input) : input;

        if (typeof Storage !== "undefined" && string !== undefined) {
            sessionStorage.setItem(name, string);
            return true;
        } else {
            return false;
        }
    };

    q.getStorage = function(name) {
        if (typeof Storage !== "undefined") {
            const data = sessionStorage.getItem(name);
            return data ? (data.startsWith("{") || data.startsWith("[")) ? JSON.parse(data) : data : null;
        } else {
            return false;
        }
    };

    q.setUpTable = function(tableId, dataSet) {
        const table = document.getElementById(tableId);
        if (!table) {
            return;
        }

        Object.entries(dataSet).forEach(([key, value]) => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = key;
            cell2.textContent = value;
        });
    };

    q.addEvent = function(element, event, callBack) {
        if (element.addEventListener) {
            element.addEventListener(event, callBack);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, callBack);
        }
    };

    q.limitText = function(text, limit) {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + " ..." : text;
    };

    q.get = function(url, data, success) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `${url}?${data}`, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                success(JSON.parse(xmlhttp.responseText));
            }
        };
    };

    q.post = function(url, data, success) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                success(JSON.parse(xmlhttp.responseText));
            }
        };
    };

    q.getXML = function(url, success) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.responseType = "document";
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                success(xmlhttp.responseXML);
            }
        };
    };

    window.quick = q;
    window.q = q;
})();

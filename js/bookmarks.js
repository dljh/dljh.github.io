var bookmarks = (function() {

  var all = [{
    letter: "PH",
    name: "Pi-hole",
    url: "http://pi.hole/admin/index.php",
    timeStamp: 1546453100455
  }, {
    letter: "SO",
    name: "Sonarr",
    url: "http://destiny:8989/",
    timeStamp: 1546453101749
  }, {
    letter: "DE",
    name: "Deluge",
    url: "https://henlin.lw814.usbx.me/deluge/",
    timeStamp: 1546453102199
  }, {
    letter: "RA",
    name: "Radarr USBX",
    url: "http://henlin.lw814.usbx.me/radarr/",
    timeStamp: 1546453102671
  }, {
    letter: "SU",
    name: "Sonarr USBX",
    url: "http://henlin.lw814.usbx.me/sonarr/",
    timeStamp: 1546453103110
  }, {
    letter: "JA",
    name: "Jackett",
    url: "http://henlin.lw814.usbx.me/jackett/",
    timeStamp: 1546453103560
  }, {
    letter: "OM",
    name: "Ombi",
    url: "http://henlin.lw814.usbx.me/ombi/",
    timeStamp: 1546453104010
  }, {
    letter: "PL",
    name: "Plex",
    url: "http://henlin.lw814.usbx.me:12275",
    timeStamp: 1546453104460
  }, {
    letter: "TA",
    name: "Tautulli",
    url: "http://henlin.lw814.usbx.me/tautulli/",
    timeStamp: 1546453104910
  }, {
    letter: "FB",
    name: "Facebook",
    url: "https://www.facebook.com/",
    timeStamp: 1546453105349
  }, {
    letter: "GOT",
    name: "r/gameofthrones/",
    url: "https://www.reddit.com/r/gameofthrones/",
    timeStamp: 1546453105844
  }, {
    letter: "BX",
    name: "Box",
    url: "https://app.box.com/login/",
    timeStamp: 1546453106272
  }, {
    letter: "TFL",
    name: "TFL Map",
    url: "http://content.tfl.gov.uk/standard-tube-map.pdf",
    timeStamp: 1546453106734
  }, {
    letter: "PRG",
    name: "r/Pathfinder_RPG/",
    url: "https://www.reddit.com/r/Pathfinder_RPG/",
    timeStamp: 1546453107194
  }, {
    letter: "AZ",
    name: "Amazon",
    url: "https://www.amazon.co.uk/",
    timeStamp: 1546453107633
  }, {
    letter: "YT",
    name: "Youtube",
    url: "https://www.youtube.com/",
    timeStamp: 1546453108071
  }, {
    letter: "CO",
    name: "Contacts",
    url: "https://contacts.google.com/",
    timeStamp: 1546453108501
  }, {
    letter: "GIT",
    name: "Github",
    url: "https://github.com/",
    timeStamp: 1546453108926
  }, {
    letter: "AN",
    name: "r/Android/",
    url: "https://www.reddit.com/r/Android/",
    timeStamp: 1546453109355
  }, {
    letter: "V",
    name: "r/videos/",
    url: "https://www.reddit.com/r/videos/",
    timeStamp: 1546453109840
  }, {
    letter: "GM",
    name: "Gmail",
    url: "https://mail.google.com/",
    timeStamp: 1546453110265
  }, {
    letter: "CAL",
    name: "Calendar",
    url: "https://www.google.com/calendar/",
    timeStamp: 1546453110885
  }, {
    letter: "R",
    name: "Reddit",
    url: "https://www.reddit.com/",
    timeStamp: 1546453111491
  }, {
    letter: "DR",
    name: "Drive",
    url: "https://drive.google.com/drive/",
    timeStamp: 1546453111953
  }, {
    letter: "ANA",
    name: "Analytics",
    url: "https://analytics.google.com/",
    timeStamp: 1546453112357
  }, {
    letter: "COS",
    name: "r/chromeos/",
    url: "https://www.reddit.com/r/chromeos/",
    timeStamp: 1546453112797
  }];

  var get = function(timeStamp) {
    var _singleBookmark = function() {
      var found = false;
      for (var i = 0; i < all.length; i++) {
        if (all[i].timeStamp === timeStamp) {
          found = all[i];
        };
      };
      return found;
    };
    var _allBookmarks = function() {
      var action = {
        none: function(array) {
          return helper.sortObject(array, "timeStamp");
        },
        name: function(array) {
          return helper.sortObject(array, "name");
        },
        letter: function(array) {
          return helper.sortObject(array, "letter");
        }
      };
      return action[state.get().bookmarks.sort](all);
    };
    if (timeStamp && typeof timeStamp == "number") {
      return _singleBookmark(timeStamp);
    } else {
      return _allBookmarks();
    };
  };

  var restore = function(data) {
    if ("bookmarks" in data) {
      all = data.bookmarks;
    };
  };

  var add = function(override) {
    var options = {
      letter: null,
      name: null,
      url: null,
      timeStamp: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    };
    var newBookmark = {
      letter: options.letter,
      name: options.name,
      url: options.url,
      timeStamp: options.timeStamp
    };
    all.push(newBookmark);
  };

  var edit = function(override) {
    var options = {
      bookmarkData: null,
      timeStamp: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    };
    for (var i = 0; i < all.length; i++) {
      if (all[i].timeStamp === options.timeStamp) {
        all[i] = options.bookmarkData;
      };
    };
  };

  var remove = function(timeStamp) {
    for (var i = 0; i < all.length; i++) {
      if (all[i].timeStamp === timeStamp) {
        all.splice(all.indexOf(all[i]), 1);
      };
    };
  };

  var init = function() {
    if (data.load()) {
      restore(data.load());
    };
  };

  // exposed methods
  return {
    all: all,
    init: init,
    get: get,
    add: add,
    edit: edit,
    remove: remove
  };

})();

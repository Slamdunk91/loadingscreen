var sequences = {
  INIT_CORE: "INIT_CORE",
  INIT_BEFORE_MAP_LOADED: "INIT_BEFORE_MAP_LOADED",
  MAP: "MAP",
  INIT_AFTER_MAP_LOADED: "INIT_AFTER_MAP_LOADED",
  INIT_SESSION: "INIT_SESSION"
};
var debug = false;

$(document).ready(function () {
  var progress = $('#progress');
  var output = {
    value: $('.value', progress),
    progress: $('.bar-progress', progress),
    name: $('.name', progress)
  };

  var video = $('video:first');
  var player = video.get(0);
  var control = {
    volumeToggle: $('#volume-toggle')
  };

  // Server massages
  window.addEventListener('message', function (event) {
    if (event.data.eventName === 'loadProgress') {
      updateProgress(event.data.loadFraction);
    }
    /*else if (event.data.eventName === 'initFunctionInvoking') {
      updateProgressName(event.data.type);
    }*/
  });

  // Video player
  player.volume = getConfig('videoVolume', 0.5);
  player.muted = getConfig('videoMuted', false);
  control.volumeToggle.toggleClass('mute', player.muted);

  video.on('timeupdate', function () {
    // Always hidden
    /*if (parseInt(player.currentTime) >= 12) {
      progress.fadeIn();
    } else {
      progress.hide();
    }*/

    if (parseInt(player.currentTime) === parseInt(player.duration)) {
      player.currentTime = 24;
      player.play();
    }
  });

  // Controls
  control.volumeToggle.on('click', function () {
    var mute = !player.muted;
    player.muted = mute;
    control.volumeToggle.toggleClass('mute', mute);
    setConfig('videoMuted', mute);
  });

  // Mouse
  var pointer = $('#cursor');
  $(document).on('mousemove', function (event) {
    pointer.css({
      top: event.pageY + 'px',
      left: event.pageX + 'px'
    });
  });

  // Fonctions
  function updateProgress(ratio) {
    var percent = parseInt(ratio * 100);
    output.value.html(percent);
    output.progress.width(percent + '%');
  }

  function updateProgressName(type) {
    if (typeof sequences[type] != 'undefined') {
      output.name.text(sequences[type]);
    }
  }

  // Debug mode
  if (debug) {
    var count = 0.0;
    var update = function () {
      count += 0.01;
      if (count >= 1) {
        clearInterval(interval);
      }
      updateProgress(count);
    };
    var interval = setInterval(update, 250);
  }
});

function getConfig(key, defaultValue) {
  var value = localStorage.getItem(key);
  if (value === null) {
    value = defaultValue;
  }

  if (value === "true") {
    value = true;
  } else if (value === "false") {
    value = false;
  }

  return value;
}

function setConfig(key, value) {
  localStorage.setItem(key, value);
}
var sequences = {
  INIT_CORE: "INIT_CORE",
  INIT_BEFORE_MAP_LOADED: "INIT_BEFORE_MAP_LOADED",
  MAP: "MAP",
  INIT_AFTER_MAP_LOADED: "INIT_AFTER_MAP_LOADED",
  INIT_SESSION: "INIT_SESSION"
};

$(document).ready(function () {
  var progress = $('#progress');
  var output = {
    value: $('.value', progress),
    progress: $('.bar-progress', progress),
    name: $('.name', progress)
  };

  var video = $('video:first');
  var player = video.get(0);
  var source = $('source:first', video).get(0);
  var control = {
    volumeToggle: $('#volume-toggle')
  };

  // Server messages
  window.addEventListener('message', function (event) {
    if (event.data.eventName === 'loadProgress') {
      updateProgress(event.data.loadFraction);
    }
    /*else if (event.data.eventName === 'initFunctionInvoking') {
      updateProgressName(event.data.type);
    }*/
  });

  // Video player
  source.src = CONFIG.video;
  player.volume = getConfig('videoVolume', CONFIG.defaults.volume);
  player.muted = getConfig('videoMuted', CONFIG.defaults.muted);
  control.volumeToggle.toggleClass('mute', player.muted);

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

  // Functions
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
  if (CONFIG.debug) {
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

$(document).ready(function() {
    $("#range-outer").on("input", function() {
        var value = $(this).val(); 
        var containerWidth = $(this).outerWidth(); 
        var backgroundWidth = (value / 100) * containerWidth; 
    
        $("#range-background").css("width", `${backgroundWidth}px`);
        $("#range-pointer").css("left", `calc(${backgroundWidth}px * 0.991)`);
    });
    
    $("#range-outer").on("mouseenter", function() {
        $("#range-pointer").css("opacity", `100%`);
        $("#range-background").css("background-color", "pink");
    });
    
    $("#range-outer").on("mouseleave", function() {
        $("#range-pointer").css("opacity", `0%`);
        $("#range-background").css("background-color", "white");
    });
    
    $("#range-outer-volume").on("input", function() {
        var value = $(this).val(); 
        var containerWidth = $(this).outerWidth(); 
        var backgroundWidth = (value / 100) * containerWidth; 
    
        if(value == 0) {
            $("#volume-icon").removeClass("fa-volume-low fa-volume-high").addClass("fa-volume-off");
        } else if (value == 100) {
            $("#volume-icon").removeClass("fa-volume-low fa-volume-off").addClass("fa-volume-high");
        } else {
            $("#volume-icon").removeClass("fa-volume-off fa-volume-high").addClass("fa-volume-low");
        }
    
        $("#range-background-volume").css("width", `${backgroundWidth}px`);
        $("#range-pointer-volume").css("left", `calc(${backgroundWidth}px * 0.85)`);
    });
    
    $(document).on("keydown", function(event) {
        var volumeSlider = $("#range-outer-volume");
        var currentValue = parseInt(volumeSlider.val());
        var increment = 5; 
    
        switch (event.keyCode) {
            case 38: 
                var newValueUp = Math.min(100, currentValue + increment);
                volumeSlider.val(newValueUp).trigger("input");
                break;
            case 40: 
                var newValueDown = Math.max(0, currentValue - increment);
                volumeSlider.val(newValueDown).trigger("input");
                break;
        }
    });

    $("#range-outer-volume").on("mouseenter", function() {
        $("#range-pointer-volume").css("opacity", `100%`);
        $("#range-background-volume").css("background-color", "pink");
    });
    
    $("#range-outer-volume").on("mouseleave", function() {
        $("#range-pointer-volume").css("opacity", `0%`);
        $("#range-background-volume").css("background-color", "white");
    });    

    var value = $("#range-outer-volume").val(); 
    var containerWidth = $("#range-outer-volume").outerWidth(); 
    var backgroundWidth = (value / 100) * containerWidth; 
    
    switch (true) {
        case (value == 0):
            $("#volume-icon").removeClass("fa-volume-low fa-volume-high").addClass("fa-volume-off");
            break;
        case (value == 100):
            $("#volume-icon").removeClass("fa-volume-low fa-volume-off").addClass("fa-volume-high");
            break;
        default:
            $("#volume-icon").removeClass("fa-volume-off fa-volume-high").addClass("fa-volume-low");
    }
    

    $("#range-background-volume").css("width", `${backgroundWidth}px`);
    $("#range-pointer-volume").css("left", `calc(${backgroundWidth}px * 0.85)`);

    var audio = $("#audio")[0]; 
    var rangeOuterVolume = $("#range-outer-volume");

    audio.volume = $("#range-outer-volume").val() / 100;

    rangeOuterVolume.on("input", function() {
        var value = $(this).val(); 
        var volume = value / 100; 

        audio.volume = volume;
    });

    var playButton = $("#playButton");

    var isPlaying = false;

    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playButton.removeClass("fa-circle-pause").addClass("fa-circle-play");
        } else {
            audio.play();
            isPlaying = true;
            playButton.removeClass("fa-circle-play").addClass("fa-circle-pause");
        }
    }

    audio.addEventListener("ended", function() {
        isPlaying = false;
        playButton.removeClass("fa-circle-pause").addClass("fa-circle-play");
        if (replayActive) {
            audio.currentTime = 0;
            audio.play();
            isPlaying = true;
            playButton.removeClass("fa-circle-play").addClass("fa-circle-pause");
        }
    });
    
    
    playButton.on("click", function() {
        togglePlayPause();
    });
    
    $(document).on("keydown", function(event) {
        if (event.keyCode === 32) {
            togglePlayPause();
            event.preventDefault();
        }
    });

    var duration = audio.duration;

    var timeEnd = $("#time-end");
    var minutesEnd = Math.floor(duration / 60);
    var secondsEnd = Math.floor(duration % 60);
    timeEnd.text(minutesEnd + ":" + (secondsEnd < 10 ? "0" : "") + secondsEnd);

    var rangeOuter = $("#range-outer");
    var timeStart = $("#time-start");   

    audio.addEventListener("timeupdate", function() {
        var currentTime = audio.currentTime;

        var minutesStart = Math.floor(currentTime / 60);
        var secondsStart = Math.floor(currentTime % 60);
        timeStart.text(minutesStart + ":" + (secondsStart < 10 ? "0" : "") + secondsStart);
    });

    var isRangeSliderDragging = false;

    audio.addEventListener("timeupdate", function() {
        if (!isRangeSliderDragging) {
            var progress = (audio.currentTime / audio.duration) * 100;
            rangeOuter.val(progress);
            updateRangeBackground();
        }
    });
    
    rangeOuter.on("input", function() {
        isRangeSliderDragging = true;
        updateRangeBackground();
    });
    
    rangeOuter.on("change", function() {
        isRangeSliderDragging = false;
        var value = $(this).val();
        var currentTime = (value / 100) * audio.duration;
        audio.currentTime = currentTime;
        updateRangeBackground();
    });
    
    function updateRangeBackground() {
        var value = rangeOuter.val(); 
        var containerWidth = rangeOuter.outerWidth(); 
        var backgroundWidth = (value / 100) * containerWidth; 
    
        $("#range-background").css("width", `${backgroundWidth}px`);
        $("#range-pointer").css("left", `calc(${backgroundWidth}px * 0.991)`);
    }
    
    var replayActive = false;

    function toggleReplayState() {
        replayActive = !replayActive;
        var replayIcon = $("#replay");
        if (replayActive) {
            replayIcon.removeClass("text-gray-300").addClass("text-pink-200");
        } else {
            replayIcon.removeClass("text-pink-200").addClass("text-gray-300");
        }
    }

    $("#replay").on("click", function() {
        toggleReplayState();
    });

    var shuffleActive = false;

    function toggleShuffleState() {
        shuffleActive = !shuffleActive;
        var shuffleIcon = $("#shafle");
        if (shuffleActive) {
            shuffleIcon.removeClass("text-gray-300").addClass("text-pink-200");
        } else {
            shuffleIcon.removeClass("text-pink-200").addClass("text-gray-300");
        }
    }

    $("#shafle").on("click", function() {
        toggleShuffleState();
    });

    $(document).keydown(function(e) {
        if (e.keyCode == 37) {
            rewindAudio(5); 
        }
      
        else if (e.keyCode == 39) {
            forwardAudio(5); 
        }
    });
    
    function rewindAudio(seconds) {
        var newTime = audio.currentTime - seconds;
        if (newTime < 0) {
            newTime = 0;
        }
        audio.currentTime = newTime;
        updateRangeBackground();
    }
    
    function forwardAudio(seconds) {
        var newTime = audio.currentTime + seconds;
        if (newTime > audio.duration) {
            newTime = audio.duration;
        }
        audio.currentTime = newTime;
        updateRangeBackground();
    }

});

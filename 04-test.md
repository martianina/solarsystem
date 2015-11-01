---
layout: page
title: Test
permalink: test.html
group: navigation
css:
    - css/quiz.css
js:
    - js/ios-drag-drop.js
    - js/quiz.js
---

## Test Yourself
Match the names with the images.

<script>
window.onload = function init() {
    // Quizzes have to in order to match with answerers.
    //
    // config = { // default values
    //     trailMode: false,
    //     alertResult: true,
    //     randomDestination: true,
    //     infoWrong: '',
    //     answerId: 'answerDiv', // needs to be unique
    //     questionId: 'questionDiv', // needs to be unique
    //     answerItems: '.dragDropSmallBox',
    //     destinationClass: 'destinationBox',
    // };
    var quiz1 = new dragDropQuiz({
        trailMode: false,
        alertResult: true,
        infoWrong: 'You can catch-up on the Solar System <a href="solar-system.html">here</a> and small bodies <a href="small-bodies.html">here</a>',
        answerId: 'answerDiv1',
        questionId: 'questionDiv1',
    });
    var quiz2 = new dragDropQuiz({
        trailMode: false,
        alertResult: true,
        randomDestination: false,
        infoWrong: 'You can catch-up on the Solar System <a href="solar-system.html">here</a>.',
        answerId: 'answerDiv2',
        questionId: 'questionDiv2',
        answerItems: '.draggable',
        destinationClass: 'destinationBox',
    });
};

var iosDragDropShim = { enableEnterLeave: true };
</script>

<div id="overlay" onclick='showNotice()'></div>

<div class="dragScriptContainer">
    <div id="answerDiv1">
        <div class="dragDropSmallBox">Sun</div>
        <div class="dragDropSmallBox">Mercury</div>
        <div class="dragDropSmallBox">Venus</div>
        <div class="dragDropSmallBox">Earth</div>
        <div class="dragDropSmallBox">Mars</div>
        <div class="dragDropSmallBox">Jupiter</div>
        <div class="dragDropSmallBox">Saturn</div>
        <div class="dragDropSmallBox">Uranus</div>
        <div class="dragDropSmallBox">Neptune</div>
        <div class="dragDropSmallBox">Asteroid</div>
        <div class="dragDropSmallBox">Comet</div>
        <div class="dragDropSmallBox">Meteor</div>
    </div>
    <div id="questionDiv1">
        <div class="col">
            <div class="imgContainer"><img src="img/130/sun.jpg" alt="Our Sun"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/mercury.jpg" alt="Mercury"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/venus.jpg" alt="Venus"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/earth.jpg" alt="Earth"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/mars.jpg" alt="Mars"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/jupiter.jpg" alt="Jupiter"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/saturn.jpg" alt="Saturn"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/uranus.jpg" alt="Uranus"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/neptune.jpg" alt="Neptune"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/asteroid.jpg" alt="Asteroid"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/comet.jpg" alt="Comet"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="imgContainer"><img src="img/130/ISS-meteor.jpg" alt="Meteor"></div>
            <div class="destinationBox"></div>
        </div>
    </div>
</div>

### Model the Solar System
Model the solar system by dragging the images to the corresponding places:

<div class="dragScriptContainer">
    <div id="answerDiv2">
        <div class="draggable"><img src="img/130/sun.jpg" alt="Our Sun"></div>
        <div class="draggable"><img src="img/130/mercury.jpg" alt="Mercury"></div>
        <div class="draggable"><img src="img/130/venus.jpg" alt="Venus"></div>
        <div class="draggable"><img src="img/130/earth.jpg" alt="Earth"></div>
        <div class="draggable"><img src="img/130/mars.jpg" alt="Mars"></div>
        <div class="draggable"><img src="img/130/jupiter.jpg" alt="Jupiter"></div>
        <div class="draggable"><img src="img/130/saturn.jpg" alt="Saturn"></div>
        <div class="draggable"><img src="img/130/uranus.jpg" alt="Uranus"></div>
        <div class="draggable"><img src="img/130/neptune.jpg" alt="Neptune"></div>
    </div>
    <div id="questionDiv2">
        <div id="p1" class="destinationBox"></div>
        <div id="p2" class="destinationBox"></div>
        <div id="p3" class="destinationBox"></div>
        <div id="p4" class="destinationBox"></div>
        <div id="p5" class="destinationBox"></div>
        <div id="p6" class="destinationBox"></div>
        <div id="p7" class="destinationBox"></div>
        <div id="p8" class="destinationBox"></div>
        <div id="p9" class="destinationBox"></div>
    </div>
</div>

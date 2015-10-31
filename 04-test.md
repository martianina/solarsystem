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
var quizConfig = {
    trailMode: false,
    alertResult: true,
    infoWrong: 'You can catch up on the Solar System <a href="/solar-system.html">here</a>.'
};
window.onload = function init() {
    var quiz1 = new dragDropQuiz(quizConfig);
};

var iosDragDropShim = { enableEnterLeave: true };
</script>

<div id="overlay" onclick='showNotice()'></div>

<div id="dragScriptContainer">
    <div id="answerDiv">
        <div class="dragDropSmallBox" id="a1">Sun</div>
        <div class="dragDropSmallBox" id="a2">Mercury</div>
        <div class="dragDropSmallBox" id="a3">Venus</div>
        <div class="dragDropSmallBox" id="a4">Earth</div>
        <div class="dragDropSmallBox" id="a5">Mars</div>
        <div class="dragDropSmallBox" id="a6">Jupiter</div>
        <div class="dragDropSmallBox" id="a7">Saturn</div>
        <div class="dragDropSmallBox" id="a8">Uranus</div>
        <div class="dragDropSmallBox" id="a9">Neptune</div>
    </div>
    <div id="questionDiv">
        <div class="col">
            <div class="dragDropSmallBox" id="q1"><img src="img/250/sun.jpg" alt="Our Sun"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q2"><img src="img/250/mercury.jpg" alt="Mercury"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q3"><img src="img/250/venus.jpg" alt="Venus"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q4"><img src="img/250/earth.jpg" alt="Earth"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q5"><img src="img/250/mars.jpg" alt="Mars"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q6"><img src="img/250/jupiter.jpg" alt="Jupiter"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q7"><img src="img/250/saturn.jpg" alt="Saturn"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q8"><img src="img/250/uranus.jpg" alt="Uranus"></div>
            <div class="destinationBox"></div>
        </div>
        <div class="col">
            <div class="dragDropSmallBox" id="q9"><img src="img/250/neptune.jpg" alt="Neptune"></div>
            <div class="destinationBox"></div>
        </div>
    </div>
</div>

function showNotice (data) {
    el = document.getElementById("overlay");
    result = document.getElementById("result");
    data = "<div id='result'>" + data + "</div>";
    el.innerHTML = data;
    el.style.visibility = (el.style.visibility === "visible") ? "hidden" : "visible";
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random.html
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Returns a random number between min (inclusive) and max (exclusive)
// http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random.html
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Jonas Raoni Soares Silva
// http://jsfromhell.com/array/shuffle [rev. #1]
function arrayShuffle (v) {
    for (var j, x, i = v.length; i; j = getRandomInt(0, i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
}

// http://stackoverflow.com/questions/18230217/javascript-generate-a-random-number-within-a-range-using-crypto-getrandomvalues?rq=1
function getRandomInt(min, max) {
    // Create byte array and fill with 1 random number
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInt(min, max);
    return min + (byteArray[0] % range);
}

function shuffleDom (div, skip) {
    if (skip === undefined) {
        skip = 1;
    }
    var i, j, nums = [];
    var children = div.children;
    for (i = 0; i < children.length/skip; i++) {
        nums[i] = i;
    }
    nums = arrayShuffle(nums);

    for (i = 0; i < children.length/skip; i++) {
        if (children[nums[i]*skip]) {
            div.appendChild(children[nums[i]*skip]);

            for (j = 1; j < skip; j++) {
                div.appendChild(children[nums[i]*skip]);
            }
        }
    }
}

// http://code.tutsplus.com/tutorials/the-basics-of-object-oriented-javascript--net-7670
function addEvent (to, type, fn) {
    if (document.addEventListener) {
        to.addEventListener(type, fn, false);
    } else if (document.attachEvent) {
        to.attachEvent('on'+type, fn);
    } else {
        to['on'+type] = fn;
    }
}

function DragDropQuiz (config) {
    'use strict';
    var self = this;
    self.config = {
        trailMode: (typeof config.trailMode === "undefined") ? false : config.trailMode,
        alertResult: (typeof config.alertResult === "undefined") ? true : config.alertResult,
        randomDestination: (typeof config.randomDestination === "undefined") ? true : config.randomDestination,
        infoWrong: config.infoWrong || '',
        answerId: config.answerId || 'answerDiv', // needs to be unique
        questionId: config.questionId || 'questionDiv', // needs to be unique
        answerItems: config.answerItems || '.dragDropSmallBox',
        destinationClass: config.destinationClass || 'destinationBox',
    };
    self.numAnswerd = 0;
    self.numOfQuestions = 0;
    self.answerDiv = document.getElementById(self.config.answerId);
    self.answerItems = document.querySelectorAll('#' + self.config.answerId + ' ' + self.config.answerItems);
    self.destinationBox = document.querySelectorAll('#' + self.config.questionId + ' .'+ self.config.destinationClass);

    // Prepare Functions

    self.dragStartEvent = function (e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.id);
        this.style.backgroundColor = '#999';
    };

    self.dragEndEvent = function (e) {
        this.style.backgroundColor = '';
    };

    self.dragOverEvent = function (e) {
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    };

    self.dragEnterEvent = function (e) {
        this.classList.add('over');
        return false;
    };

    self.dragLeaveEvent = function (e) {
        this.classList.remove('over');
    };

    self.dropEvent = function (e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        this.classList.remove('over');
        var dragged = document.getElementById(e.dataTransfer.getData('text/plain'));

        // this.questionId === this.parentNode.parentNode.id
        if (dragged !== null && dragged.questionId === this.questionId && e.target.className === self.config.destinationClass) {
            // show correct answers immediately
            if (self.config.trailMode === true) {
                dragged.classList.remove('correctAnswer');
                dragged.classList.remove('wrongAnswer');
                if (dragged.anwserNum === this.questionNum) {
                    dragged.classList.add('correctAnswer');
                } else {
                    dragged.classList.add('wrongAnswer');
                }
            }
            this.appendChild(dragged); // move element

            // show results when done
            if (self.config.alertResult === true) {
                if (dragged.anwserNum === this.questionNum) {
                    dragged.correctAnswer = true;
                } else {
                    dragged.correctAnswer = false;
                }

                // if already answered don't do anything
                if (dragged.answerd === false) {
                    self.numAnswerd++;
                    dragged.answerd = true;
                }

                // when all questions are answered show results
                if (self.numOfQuestions === self.numAnswerd) {
                    var correct = 0;
                    for (var i = 0; i < self.answerItems.length; i++) {
                        if (self.answerItems[i].correctAnswer === true) {
                            correct++;
                        }
                    }
                    if (correct <= self.numOfQuestions/2) {
                        showNotice('<p>You got ' + correct + ' out of ' + self.numOfQuestions + ' correct!</br>' + self.config.infoWrong + '</p>');
                    } else {
                        showNotice('<p>Congratulations! You got ' + correct + ' out of ' + self.numOfQuestions + ' correct!</p>');
                    }
                }
            }
        }

        return false;
    };

    self.dropAnswerBackEvent = function (e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        var textData = document.getElementById(e.dataTransfer.getData('text/plain'));

        if (textData !== null && textData.answerId === this.id) {
            textData.classList.remove('correctAnswer');
            textData.classList.remove('wrongAnswer');
            this.classList.remove('over');
            this.appendChild(textData); // replace element

            textData.answerd = false;
            self.numAnswerd--;
        }

        return false;
    };

    // Run Functions
    shuffleDom(self.answerDiv);
    if (self.config.randomDestination === true) {
        shuffleDom(document.getElementById(self.config.questionId));
    }

    for (var i = 0; i < self.answerItems.length; i++) {
        var ela = self.answerItems[i];
        ela.setAttribute('draggable', 'true');
        ela.id = config.answerId+'-'+(i+1); // create unique id's
        ela.questionId = self.config.questionId;
        ela.answerId = self.config.answerId;
        ela.correctAnswer = false;
        ela.anwserNum = i+1;
        ela.answerd = false;
        self.numOfQuestions++;

        addEvent(ela, 'dragstart', self.dragStartEvent);
        addEvent(ela, 'dragend', self.dragEndEvent);
    }

    for (var j = 0; j < self.destinationBox.length; j++) {
        var el = self.destinationBox[j];
        el.questionId = self.config.questionId;
        el.questionNum = j+1;

        addEvent(el, 'dragover', self.dragOverEvent);
        addEvent(el, 'dragenter', self.dragEnterEvent);
        addEvent(el, 'dragleave', self.dragLeaveEvent);
        addEvent(el, 'drop', self.dropEvent);
    }

    addEvent(self.answerDiv, 'dragover', self.dragOverEvent);
    addEvent(self.answerDiv, 'dragenter', self.dragEnterEvent);
    addEvent(self.answerDiv, 'dragleave', self.dragLeaveEvent);
    addEvent(self.answerDiv, 'drop', self.dropAnswerBackEvent);
}

function showNotice (data) {
    el = document.getElementById("overlay");
	result = document.getElementById("result");
    data = "<div id='result'>" + data + "</div>";
    el.innerHTML = data;
	el.style.visibility = (el.style.visibility === "visible") ? "hidden" : "visible";
}

// Jonas Raoni Soares Silva
// http://jsfromhell.com/array/shuffle [rev. #1]
function shuffle (v) {
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
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
    nums = shuffle(nums);

    for (i = 0; i < children.length/skip; i++) {
        div.appendChild(children[nums[i]*skip]);

        for (j = 1; j < skip; j++) {
            div.appendChild(children[nums[i]*skip]);
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

function dragDropQuiz (config) {
    var self = this;
    this.numOfQuestions = 0;
    this.numAnswerd = 0;
    this.addEvent = addEvent;
    this.shuffleDom = shuffleDom;
    this.config = {
        trailMode: (typeof config.trailMode === "undefined") ? false : config.trailMode,
        alertResult: (typeof config.alertResult === "undefined") ? true : config.alertResult,
        randomDestination: (typeof config.randomDestination === "undefined") ? true : config.randomDestination,
        infoWrong: config.infoWrong || '',
        answerId: config.answerId || 'answerDiv', // needs to be unique
        questionId: config.questionId || 'questionDiv', // needs to be unique
        answerItems: config.answerItems || '.dragDropSmallBox',
        destinationClass: config.destinationClass || 'destinationBox',
    };

    this.answerDiv = document.getElementById(self.config.answerId);
    this.answerItems = document.querySelectorAll('#' + self.config.answerId + ' ' + self.config.answerItems);
    this.destinationBox = document.querySelectorAll('#' + self.config.questionId + ' .'+ self.config.destinationClass);

    self.shuffleDom(self.answerDiv);
    if (self.config.randomDestination === true) {
        self.shuffleDom(document.getElementById(self.config.questionId));
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

        self.addEvent(ela, 'dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', this.id);
            this.style.backgroundColor = '#999';
        });

        self.addEvent(ela, 'dragend', function (e) {
            this.style.backgroundColor = '';
        });
    }

    for (var j = 0; j < self.destinationBox.length; j++) {
        var el = self.destinationBox[j];
        el.questionId = self.config.questionId;
        el.questionNum = j+1;

        self.addEvent(el, 'dragover', function (e) {
            if (e.preventDefault) e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        });

        self.addEvent(el, 'dragenter', function (e) {
            this.classList.add('over');
            return false;
        });

        self.addEvent(el, 'dragleave', function () {
            this.classList.remove('over');
        });

        self.addEvent(el, 'drop', function (e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();

            this.classList.remove('over');
            var dragged = document.getElementById(e.dataTransfer.getData('text/plain'));

            // this.questionId === this.parentNode.parentNode.id
            if (dragged !== null && dragged.questionId === this.questionId && e.target.className === self.config.destinationClass)
            {
                // show correct awnsers imediatly
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

                    // if already answerd don't do anything
                    if (dragged.answerd === false) {
                        self.numAnswerd++;
                        dragged.answerd = true;
                    }

                    // when all questions are awnsered show results
                    if (self.numOfQuestions === self.numAnswerd)
                    {
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
        });
    }

    self.addEvent(self.answerDiv, 'dragover', function (e) {
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    });

    self.addEvent(self.answerDiv, 'dragenter', function (e) {
        this.classList.add('over');
        return false;
    });

    self.addEvent(self.answerDiv, 'dragleave', function (e) {
        this.classList.remove('over');
    });

    self.addEvent(self.answerDiv, 'drop', function (e) {
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
    });
}

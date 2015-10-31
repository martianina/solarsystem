function showNotice (data) {
    el = document.getElementById("overlay");
	result = document.getElementById("result");
    data = "<div id='result'>" + data + "</div>";
    el.innerHTML = data;
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
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
    this.config = {
        trailMode: config.trailMode || false,
        alertResult: config.alertResult || true,
        infoWrong: config.infoWrong || '',
        answerId: config.answerId || 'answerDiv',
        questionId: config.questionId || 'questionDiv',
        answerItems: config.answerItems || '.dragDropSmallBox',
        destinationClass: config.destinationClass || 'destinationBox',
    };

    this.answerDiv = document.getElementById(self.config.answerId);
    this.answerItems = document.querySelectorAll('#' + self.config.answerId + ' ' + self.config.answerItems);
    this.destinationBox = document.querySelectorAll('#' + self.config.questionId + ' .'+ self.config.destinationClass);

    shuffleDom(self.answerDiv);
    shuffleDom(document.getElementById(self.config.questionId), 2);

    for (var i = 0; i < self.answerItems.length; i++) {
        var el = self.answerItems[i];

        el.setAttribute('draggable', 'true');
        el.correctAnswer = false;
        el.answerd = false;
        self.numOfQuestions++;

        addEvent(ela, 'dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.dropEffect = 'move';
            e.dataTransfer.setData('Text', this.id);
            this.style.backgroundColor = '#999';
        });

        addEvent(ela, 'dragend', function (e) {
            this.style.backgroundColor = '';
        });
    }

    for (var j = 0; j < self.destinationBox.length; j++) {
        var el = self.destinationBox[j];

        addEvent(el, 'dragover', function (e) {
            if (e.preventDefault) e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        });

        addEvent(el, 'dragenter', function (e) {
            this.classList.add('over');
            return false;
        });

        addEvent(el, 'dragleave', function () {
            this.classList.remove('over');
        });

        addEvent(el, 'drop', function (e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            var dragged = document.getElementById(e.dataTransfer.getData('Text'));

            this.classList.remove('over');

            if (e.target.className === self.config.destinationClass)
            {
                var prev = this.previousSibling;
                while(prev && prev.nodeType != 1) {
                    prev = prev.previousSibling;
                }
                var answerId = dragged.id.replace(/[^0-9]/g,'');
                var questionId = prev.id.replace(/[^0-9]/g,'');

                // show correct awnsers imediatly
                if (self.config.trailMode === true) {
                    dragged.classList.remove('correctAnswer');
                    dragged.classList.remove('wrongAnswer');
                    if (answerId === questionId) {
                        dragged.classList.add('correctAnswer');
                    } else {
                        dragged.classList.add('wrongAnswer');
                    }
                }
                e.target.appendChild(dragged);

                // show results when done
                if(self.config.alertResult === true) {
                    // console.log('answerd?', dragged.answerd);
                    if (answerId === questionId) {
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
                    // console.log(self.numAnswerd + '=' + self.numOfQuestions);
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

    addEvent(self.answerDiv, 'dragover', function (e) {
        if (e.preventDefault) e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    });

    addEvent(self.answerDiv, 'dragenter', function (e) {
        this.classList.add('over');
        return false;
    });

    addEvent(self.answerDiv, 'dragleave', function (e) {
        this.classList.remove('over');
    });

    addEvent(self.answerDiv, 'drop', function (e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        var textData = document.getElementById(e.dataTransfer.getData('Text'));
        textData.classList.remove('correctAnswer');
        textData.classList.remove('wrongAnswer');
        this.classList.remove('over');
        this.appendChild(textData);

        textData.answerd = false;
        self.numAnswerd--;

        return false;
    });
}

// window.onload = dragDropQuiz(quizConfig);

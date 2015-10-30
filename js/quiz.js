var answerDiv = document.getElementById('answerDiv');
var answerItems = document.querySelectorAll('#answerDiv .dragDropSmallBox');
var destinationBox = document.querySelectorAll('.destinationBox');

// Jonas Raoni Soares Silva
// http://jsfromhell.com/array/shuffle [rev. #1]
shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

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


function dragDropQuiz () {
    shuffleDom(answerDiv);
    shuffleDom(questionDiv, 2);

    var addEvent = (function () {
      if (document.addEventListener) {
        return function (el, type, fn) {
          if (el && el.nodeName || el === window) {
            el.addEventListener(type, fn, false);
          } else if (el && el.length) {
            for (var i = 0; i < el.length; i++) {
              addEvent(el[i], type, fn);
            }
          }
        };
      } else {
        return function (el, type, fn) {
          if (el && el.nodeName || el === window) {
            el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
          } else if (el && el.length) {
            for (var i = 0; i < el.length; i++) {
              addEvent(el[i], type, fn);
            }
          }
        };
      }
    })();

    for (var i = 0; i < answerItems.length; i++) {
        var el = answerItems[i];

        el.setAttribute('draggable', 'true');

        addEvent(el, 'dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('Text', this.id);
        });
    }

    for (var j = 0; j < destinationBox.length; j++) {
        var el = destinationBox[j];

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

            if (e.target.className === 'destinationBox')
            {
                var prev = this.previousSibling;
                while(prev && prev.nodeType != 1) {
                    prev = prev.previousSibling;
                }
                var answerId = dragged.id.replace(/[^0-9]/g,'');
                var questionId = prev.id.replace(/[^0-9]/g,'');
                dragged.classList.remove('correctAnswer');
                dragged.classList.remove('wrongAnswer');
                if (answerId === questionId){
                    dragged.classList.add('correctAnswer');
                } else {
                    dragged.classList.add('wrongAnswer');
                }

                e.target.appendChild(dragged);
            }

            return false;
        });
    }

    addEvent(answerDiv, 'dragover', function (e) {
            if (e.preventDefault) e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        });

    addEvent(answerDiv, 'dragenter', function (e) {
        this.classList.add('over');
        return false;
    });

    addEvent(answerDiv, 'dragleave', function () {
        this.classList.remove('over');
    });

    addEvent(answerDiv, 'drop', function (e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        var textData = document.getElementById(e.dataTransfer.getData('Text'));
        textData.classList.remove('correctAnswer');
        textData.classList.remove('wrongAnswer');
        this.classList.remove('over');

        this.appendChild(textData);
        return false;
    });
}

window.onload = dragDropQuiz;

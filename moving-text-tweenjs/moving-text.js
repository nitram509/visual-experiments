function getCoordinates(element) {
  if (element) {
    return {
      x: element.offsetLeft,
      y: element.offsetTop
    };
  }
  return {x: -1, y: -1};
}

function convertToAbsolute(element, x, y) {
  if (element) {
    element.style.position = 'absolute';
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  }
}

function createMovingTextApp() {

  var _anim = {

    xElements: [
      {
        animElement: undefined,
        x: 0,
        y: 0
      }
    ],

    step: 0,
    dir: 1,
    elements: [],
    dstElements: [],
    src: [],
    dst: []
  };

  return {
    addSourceElements: function (elements) {
      elements.forEach(function (item) {
        _anim.elements.push(item);
        _anim.src.push(getCoordinates(item));
      });
    },
    addDestinationElements: function (elements) {
      elements.forEach(function (item) {
        _anim.dst.push(getCoordinates(item));
        _anim.dstElements.push(item);
      });
    },
    anim: _anim
  };
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function convertText2SingleElements(elementId) {
  var textElement = document.getElementById(elementId);
  var text = textElement.textContent.trim();
  var textNodes = [];
  for (var i = 0; i < text.length; i++) {
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(text[i]));
    textNodes.push(span);
  }
  removeAllChildren(textElement);
  textNodes.forEach(function (item) {
    textElement.appendChild(item);
  });
  return textNodes;
}

function copyChildNodesInvisible(sourceId, targetId) {
  var sourceChilds = document.getElementById(sourceId).childNodes;
  var target = document.getElementById(targetId);
  var textNodes = [];
  for (var i = 0; i < sourceChilds.length; i++) {
    var clone = sourceChilds[i].cloneNode(true)
    clone.style.visibility = 'hidden';
    target.appendChild(clone);
    textNodes.push(clone);
  }
  return textNodes;
}

var MovingText = createMovingTextApp();

function init() {
  MovingText.addSourceElements(convertText2SingleElements('text1'));
  MovingText.addDestinationElements(copyChildNodesInvisible('text1', 'text2'));
  MovingText.anim.xElements = [];
  for (var i = 0; i < MovingText.anim.elements.length; i++) {
    var e = MovingText.anim.elements[i];
    var x = MovingText.anim.src[i].x;
    var y = MovingText.anim.src[i].y;
    convertToAbsolute(e, x, y);

    (function () {
      var elem = {
        animElement: e,
        x: MovingText.anim.src[i].x,
        y: MovingText.anim.src[i].y
      }
      MovingText.anim.xElements.push(elem);

      var updateCallback = function () {
        this.animElement.style.left = this.x + 'px';
        this.animElement.style.top = this.y + 'px';
      }

      var delay = i % ((MovingText.anim.src.length / 4) | 0) * 50;
      var animTime = 2000;

      var tween = new TWEEN.Tween(elem)
         .to({
           x: MovingText.anim.dst[i].x,
           y: MovingText.anim.dst[i].y
         }, animTime)
         .delay(delay)
         .onUpdate(updateCallback)
         .easing(TWEEN.Easing.Sinusoidal.InOut)
         .start();

      var tweenBack = new TWEEN.Tween(elem)
         .to({
           x: MovingText.anim.src[i].x,
           y: MovingText.anim.src[i].y
         }, animTime)
         .delay(delay)
         .onUpdate(updateCallback)
         .easing(TWEEN.Easing.Sinusoidal.InOut);

      tween.chain(tweenBack);
      tweenBack.chain(tween);
    })();

  }
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

init();
animate();

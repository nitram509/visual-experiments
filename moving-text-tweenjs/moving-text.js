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

//      {
//        animElement: undefined,
//        srcElement: undefined,
//        dstElements: undefined,
//        x: 0,
//        y: 0
//      }
  var _elements = []

  return {
    setSourceElements: function (elements) {
      var len = Math.max(_elements.length, elements.length);
      for (var i = 0; i < len; i++) {
        _elements[i] = _elements[i] || {};
        _elements[i].srcElement = elements[i];
      }
    },
    setDestinationElements: function (elements) {
      var len = Math.max(_elements.length, elements.length);
      for (var i = 0; i < len; i++) {
        _elements[i] = _elements[i] || {};
        _elements[i].dstElement = elements[i];
      }
    },
    elements: _elements
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
  MovingText.setSourceElements(convertText2SingleElements('text1'));
  MovingText.setDestinationElements(copyChildNodesInvisible('text1', 'text2'));
  for (var i = 0; i < MovingText.elements.length; i++) {
    var elem = MovingText.elements[i];

    var srcCoordinates = getCoordinates(elem.srcElement);
    var dstCoordinates = getCoordinates(elem.dstElement);
    elem.x = srcCoordinates.x;
    elem.y = srcCoordinates.y;
    elem.animElement = elem.srcElement;

    var updateCallback = function () {
      this.animElement.style.left = this.x + 'px';
      this.animElement.style.top = this.y + 'px';
    }

    var delay = 50 + ((Math.sin((Math.PI * i)/10) * 25) | 0);
    var animTime = 1000;

    var tween = new TWEEN.Tween(elem)
       .to({
         x: dstCoordinates.x,
         y: dstCoordinates.y
       }, animTime)
       .delay(delay)
       .onUpdate(updateCallback)
       .easing(TWEEN.Easing.Sinusoidal.InOut)
       .start();

    var tweenBack = new TWEEN.Tween(elem)
       .to({
         x: srcCoordinates.x,
         y: srcCoordinates.y
       }, animTime)
       .delay(delay)
       .onUpdate(updateCallback)
       .easing(TWEEN.Easing.Sinusoidal.InOut);

    tween.chain(tweenBack);
    tweenBack.chain(tween);
  }

  (function convertAllElementsToAbsolute() {
    for (var i = 0; i < MovingText.elements.length; i++) {
      var elem = MovingText.elements[i];
      convertToAbsolute(elem.srcElement, elem.x, elem.y);
    }
  })();
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

init();
animate();
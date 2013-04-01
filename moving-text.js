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
    dir: 1,
    elements: [],
    src: [],
    dst: []
  }

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
      });
    },
    anim: _anim
  };
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
  while (textElement.firstChild) {
    textElement.removeChild(textElement.firstChild);
  }
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
  for (var i = 0; i < MovingText.anim.elements.length; i++) {
    var e = MovingText.anim.elements[i];
    var x = MovingText.anim.src[i].x;
    var y = MovingText.anim.src[i].y;
    convertToAbsolute(e, x, y);
  }
}

function startAnimation() {

}

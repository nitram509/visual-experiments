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
    step: 0,
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
  MovingText.addDestinationElements(copyChildNodesInvisible('text1', 'text2'))
  removeAllChildren(document.getElementById('text2'));
  for (var i = 0; i < MovingText.anim.elements.length; i++) {
    var e = MovingText.anim.elements[i];
    var x = MovingText.anim.src[i].x;
    var y = MovingText.anim.src[i].y;
    convertToAbsolute(e, x, y);
  }
}

function animationFrame() {
  var len = MovingText.anim.elements.length;
  var step = MovingText.anim.step;
  var src = MovingText.anim.src;
  var dst = MovingText.anim.dst;
  for (var i = 0; i < len; i++) {
    var e = MovingText.anim.elements[i];
    var a = (Math.cos(Math.PI * step / 30) + 1) / 2;
    var z = 1 - a;
    var x = src[i].x * a + dst[i].x * z;
    var y = src[i].y * a + dst[i].y * z;
    e.style.left = x + 'px';
    e.style.top = y + 'px';
  }
}

function animate() {
  if (!(0 <= MovingText.anim.step && MovingText.anim.step <= 30)) {
    MovingText.anim.dir *= -1;
  }
  MovingText.anim.step += MovingText.anim.dir;
  animationFrame();
  setTimeout(animate, 50);
}

init();
animate();
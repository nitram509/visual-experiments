function createModel() {
  return {
    anim: {
      dir: 1,
      src: [],
      dst: []
    }
  };
}

function convertText2SingleElements(elementId) {
  var textElement = document.getElementById('text1');
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


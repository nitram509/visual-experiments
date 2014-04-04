// require: RequestAnimationFrame.js

function display(number) {
  var ps = $('#thanks-animation').find('p');
  var pslen = $('#thanks-animation').find('p').length;
  var middle = 300 / 2 - 14;
  var duration = 1000;
  var delay = duration / pslen;


  for (var i = 0; i < pslen; i++) {
    var pos = -1;

    if (i * delay <= number) {
      var offs = number;
      while (offs > (i * delay + duration)) {
        offs -= duration;
      }
      pos = offs - i * delay;
    }

    if (pos > 0) {
      var y = Math.cos(pos * Math.PI / duration) * middle + middle;
      ps[i].style.top = y + 'px';

      var fontsize = Math.sin(pos * Math.PI / duration) * (1);
      ps[i].style['-webkit-transform'] = 'scale(' + (1 + fontsize) + ', ' + (1 + fontsize) + ')';
      ps[i].style['-moz-transform'] = 'scale(' + (1 + fontsize) + ', ' + (1 + fontsize) + ')';
      ps[i].style['transform'] = 'scale(' + (1 + fontsize) + ', ' + (1 + fontsize) + ')';

      var opacity = Math.min(Math.sin(pos * Math.PI / duration) + 0.1, 1);
      ps[i].style['opacity'] = '' + opacity;

    } else {
      ps[i].style['opacity'] = '0';
    }
  }
}

var x = 0;
var stop = false;

function anim() {
  x += 1;
  display(x);
  if (!stop) {
    requestAnimationFrame(anim);
  }
}
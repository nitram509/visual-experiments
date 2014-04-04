(function () {

  var TODO_INPUT_ROW_SELECTOR = 'div.todo-item-container';

  var todoItem = $($(TODO_INPUT_ROW_SELECTOR)[0]).clone();
  var todoItemHeight = 0;

  var fadingDuration = 800;

  setTimeout(function updateHeightAfterRendering() {
    todoItemHeight = $(TODO_INPUT_ROW_SELECTOR).height();
  }, 1);

  var counter = 2;

  $('.btn-add').click(function (event) {
     var clone = todoItem.clone();
    (function prepareNewNodeAndAppendToItemListPanel() {
      clone.find('input').attr('placeholder', 'todo ' + counter++ + ' ...');
      clone[0].style.height = '0px';
      clone[0].style.opacity = '0';
      $("#todo-item-panel").append(clone);
      event.preventDefault();
    })();
    setTimeout(function fadeInAndSlideInTheNewInputDefered() {
      clone.fadeTo(fadingDuration, 1);
      clone[0].style.height = todoItemHeight + 'px';
      clone.find('input')[0].focus();
      registerDeleteHandler();
    }, 1);
  });

  function registerDeleteHandler() {
    $('.btn-delete').click(function (event) {
      var parent = $(event.target).parent().parent();

      function fadeOutAndSlideUp(){
        parent[0].style.height = '0px';
        parent.fadeTo(fadingDuration, 0);
      }

      function detachFromDomAfterCssAnimationIsDone() {
        parent.detach();
      }

      fadeOutAndSlideUp();
      setTimeout(detachFromDomAfterCssAnimationIsDone, 1050);

      event.preventDefault();
    });
  }

})();
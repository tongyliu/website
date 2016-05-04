var $textarea = $('#msg-input');
var $container = $textarea.parent(); 

var LABEL_HEIGHT = 36;

$textarea.on('focus', function() {
  autosize($textarea);
});

$textarea.on('autosize:resized', function() {
  $container.height($textarea.height() + LABEL_HEIGHT);
});

(function($) {

  $('.selectable').click(function(event) {
    event.preventDefault();

    var $link = $(event.target);
    var $this = $(event.currentTarget);

    var id = $this.attr('id');
    var targetId = id + '_value';

    var value = $link.html().trim();
    value = value.split('&lt;').join('<'); // Unescape HTML character

    $('#' + targetId).val(value);
  });

  $('#submit').click(function(event) {
    event.preventDefault();

    var values = [];
    var areAllInputesFilled = true;

    $('#form').find('input').each(function(i, el) {
      var $this = $(this);
      var id = $this.attr('id');
      
      var key = id.split('_value').join('');
      var value = $this.val().trim();

      if (!value) areAllInputesFilled = false;

      values.push(key + '=' + value);
    });

    if (!areAllInputesFilled) {
      alert('Please, fill all inputs.');
      return;
    }

    var url = 'results.html?';
    url += values.join('&');
    window.location = url;
  });

})(jQuery);

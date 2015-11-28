(function($) {

  $('.selectable').each(function(index) {
    var id = $(this).attr('id');
    var targetId = id + '_value';

    var $firstLink = $(this).find('a').eq(0);
    var value = $firstLink.html().trim();
    value = value.split('&lt;').join('<');
    
    $('#' + targetId).val(value);
  });

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
    $('#form').find('input').each(function(i, el) {
      var $this = $(this);
      var id = $this.attr('id');
      
      var key = id.split('_value').join('');
      var value = $this.val().trim();

      values.push(key + '=' + value);
    });

    var url = 'results.html#';
    url += values.join('&');
    window.location = url;
  });

})(jQuery);

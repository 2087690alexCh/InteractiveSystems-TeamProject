(function($) {

  $('.selectable').on('click', function(event) {
    event.preventDefault();

    var $link = $(event.target);
    var $this = $(event.currentTarget);

    var id = $this.attr('id');
    var targetId = id + '_value';

    var value = $link.html().trim();
    value = value.split('&lt;').join('<'); // Unescape HTML character

    $('#' + targetId).val(value);
  });

})(jQuery);

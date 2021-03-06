(function($) {
  // Convenience functions for converting letter-case
  const kebabCaseToCamelCase = (s) => s.replace(/-([a-z])/g, g => g[1].toUpperCase());
  const camelCaseToKebabCase = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  $.fn.formParams = function() {
    return $(this).serializeArray().reduce((query, param) => {
        return Object.assign(query, { [kebabCaseToCamelCase(param.name)] : param.value });
    }, {});
  };
  $.fn.loadForm = function(params) {
    let $self = this;
    Object.keys(params).forEach(param => {
      let $field = $self.find(`*[name="${camelCaseToKebabCase(param)}"]`),
        val = params[param];
      if ($field.is(':checkbox')) {
        $field.prop('checked', val);
      } else {
        $field.val(val);
      }
    });
  };
  $.fn.populateDropdown = function(data, options) {
    options = options || {};
    let textField = options.textField || 'textField';
    let valField = options.valField || 'valField';
    return this.empty().append(data.map(item => {
      let text, val;
      if (!$.isPlainObject(item)) {
        text = item;
        val = item;
      } else {
        text = options.textFn ? options.textFn.call(null, item) : item[textField];
        val = options.valFn ? options.valFn.call(null, item) : item[valField];
      }
      return $('<option>').text(text).val(val);
    }));
  };
  $.fn.populateTable = function(data, fields) {
    this.find('tbody').empty().append(data.map((item, row) => {
      return $('<tr>').attr('scope', 'row').append(fields.map((field, index) => {
        return $('<td>').text(index === 0 ? (row + 1) : item[field]);
      }));
    }));
    return this;
  };
  $.fixBootstrapMultisort = function() {
    let $button = $('.multi-sort'),
      $modal = $('div[id^="sortModal_"].modal'),
      $toolbar = $modal.find('.modal-dialog #toolbar');
    // Wrap the button in a button group element.
    $button.addClass('btn-secondary').wrap($('<div>').addClass('btn-group'));
    // Fix modal title alignment.
    $modal.find('.modal-dialog .modal-content .modal-header .modal-title').css({ position: 'absolute', lineHeight: 1 });
    // Fix the icons.
    $button.find('.fa.glyphicon-sort').removeClass('glyphicon-sort').addClass('fa-sort').css('width', '1em');
    $toolbar.find('i.glyphicon-plus').removeClass('glyphicon-plus').addClass('fa-plus');
    $toolbar.find('i.glyphicon-minus').removeClass('glyphicon-minus').addClass('fa-minus');
  };
})(jQuery);

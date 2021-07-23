var updateTotalValue = function (ele) { 
    var itemCost = parseFloat($(ele).find('.cost input').val());
    var itemQty = parseFloat($(ele).find('.quantity input').val());
  
    // total cost of item(s) is cost of item times quantity of item(s)
    var lineTotalValue = itemCost * itemQty;
    $(ele).children('.total').html(lineTotalValue); // injects into DOM
  
    return lineTotalValue;
  }
  
  var sum = function (acc, x) {return acc + x; };
  
  var updateCartTotalValue = function () {
    var totalLineValueArray = [];
  
    $('tbody tr').each(function (i, ele) {
      var lineTotal = updateTotalValue(ele);
      totalLineValueArray.push(lineTotal);
    });
  
    var shoppingCartTotal = totalLineValueArray.reduce(sum);
    $('#shoppingCartValue').html(shoppingCartTotal);
  }
  
  $(document).ready(function () {
    updateCartTotalValue();
  
    // adds event handler on click event
    $('.btn.cancel').on('click', function (event) {
      $(this).closest('tr').remove();
      updateCartTotalValue();
    });
  
    var timeout;
    $('tr input').on('input', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        updateCartTotalValue();
      }, 1000);
    });
  
    $('#addItem').on('submit', function (event) {
      event.preventDefault();
      var name = $(this).children('[name=name]').val();
      var cost = $(this).children('[name=cost]').val();
      var quantity = $(this).children('[name=quantity]').val();
  
      $('tbody').append('<tr>' + 
      '<td class="name">' + name + '</td>' +
      '<td class="cost"><input type="number" value="' + cost + '" /></td>' +
      '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
      '<td class="total"></td>' +
      '<td><button class="btn btn-danger btn-sm cancel">Delete</button></td>' +
      '</tr>');
  
      updateCartTotalValue();
      $(this).children('[name=name]').val('');
      $(this).children('[name=cost]').val('');
      $(this).children('[name=quantity]').val('');
    });
  
    $(document).on('click', '.btn.cancel', function (event) {
      $(this).closest('tr').remove();
      // if list empty inject zero into total value
      var numOfItems = $('tbody tr');
      if (numOfItems.lenght == 0) {
        $('#shoppingCartValue').html('0');
      }
      updateCartTotalValue();
    });
    var timeout;
    $(document).on('input', 'tr input', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        updateCartTotalValue();
      }, 1000);
    });
  });
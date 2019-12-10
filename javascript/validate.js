$(document).ready(function() {
 
  $('#first_form').submit(function(e) {
    e.preventDefault();
    var first_name = $('#name').val();
    
    var email = $('#email').val();
    
 
    $(".error").remove();
 
    if (first_name.length < 1) {
      $('#name').after('<span class="error">This field is required</span>');
    }
    
    if (email.length < 1) {
      $('#email').after('<span class="error">This field is required</span>');
    } else {
      var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
      var validEmail = regEx.test(email);
      if (!validEmail) {
        $('#email').after('<span class="error">Enter a valid email</span>');
      }
    }
    
  });
 
});
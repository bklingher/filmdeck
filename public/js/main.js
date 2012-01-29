$(function() {
  $('#upload-btn').click(function(e) {
    $('#upload-btn').button('loading');
  });

  $('.error').hide();
  $('#signup-btn').click(function signup(e) {
    $('#signup-btn').button('loading');

    var $err = $('#signup-error').hide();

    var name = $("input#signup-username").val();
    var email = $("input#signup-email").val();
    var password = $("input#signup-password").val();
    var err = ''
    if (name == "") {
      err = 'Please enter a username.';
      $("input#signup-username").focus();
    } else if (email == "") {
      err = 'Please enter a valid email.';
      $("input#email").focus();
    } else if (password.length < 7) {
      err = 'The password must be at least 7 characters.';
      $("input#email").focus();
    }

    if (err != '') {
      $err.show();
      $err.html(err);
      $('#signup-btn').button('reset');
      e.preventDefault();
    }
    this.click(signup);
  });


  $("#sign-in-form").submit(function(event) {

    event.preventDefault(); 

    var $form = $( this ),
        user = $form.find('input[placeholder="Username"]').val(),
        pass = $form.find('input[placeholder="Password"]').val(),
        url = $form.attr('action');

    $.post(url, { username: user, password: pass },
      function(data) {
          var content = $(data).find('#content');
          console.log(content);
          console.log(data);
      }
    );
  });
});

$(function(){
    
  

  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="messageInfo">
            <div class="messageInfo__userName">
              ${message.user_name}
            </div>
            <div class="messageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="message__content">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="messageBox" data-message-id=${message.id}>
         <div class="messageInfo">
          <div class="messageInfo__userName">
            ${message.user_name}
          </div>
          <div class="messageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <p class="message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html);      
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $(".Form__submit").attr('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false)
    });
  });
});

 
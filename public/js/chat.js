var socket = io();

function scrollToBottom(){
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight(); 

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function(){
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No error');
        }
    })
})

socket.on('disconnet', function(){
    console.log('Disconnected from server!');
})

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {message,formattedTime});

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-location-template').html();
    var html = Mustache.render(template, {message,formattedTime});

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('updateUserList', function(userList){
    var ol = $('<ol></ol>');

    userList.forEach(function(user){
        ol.append($('<li></li>').text(user));
    })

    $('#users').html(ol);
})

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var textField = $('#message-form input');
    socket.emit('createMessage', {
        text:textField.val()
    }, function(){
        textField.val('');
    })
})

var sendLocationButton = $('#send-location');
sendLocationButton.on('click', function(){
    if(!navigator.geolocation) return alert('Your browser doesn\'t support geolocation');
    sendLocationButton.attr('disabled','disabled').text('Sending location....');
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {lat: position.coords.latitude, lng: position.coords.longitude});
        sendLocationButton.removeAttr('disabled').text('Send location');
    }, function(){
        alert("Unable to fetch location");
        sendLocationButton.removeAttr('disabled').text('Send location');
    });  
})
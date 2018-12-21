var socket = io();
var $ = jQuery;

socket.on('connect', function(){
    console.log('Connected to server!');
})

socket.on('disconnet', function(){
    console.log('Disconnected from server!');
})

socket.on('newMessage', function(message){
    console.log('newMessage', message); 
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var textField = $('#message-form input');
    socket.emit('createMessage', {
        from:'User',
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
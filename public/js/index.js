var socket = io();

socket.on('connect', function(){
    console.log('Connected to server!');
})

socket.on('disconnet', function(){
    console.log('Disconnected from server!');
})

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {message,formattedTime});

    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-location-template').html();
    var html = Mustache.render(template, {message,formattedTime});

    $('#messages').append(html);
})

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var textField = $('#message-form input');
    if(textField.val() === "") return;
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
var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message'); 

describe('generateMessage' ,() => {
    it('should generate correct message object' , () => {
        var from = "hardik";
        var text = "blah blah";
        var message = generateMessage(from,text);

        expect(message).toMatchObject({from,text});
        expect(typeof message.createdAt).toBe('number');
    });
})

describe('generateLocationMessage', () => {

    it('should generate correct geolocation message', () => {
        var from = 'hardik';
        var lat = 49.2;
        var lng = 23.1;
        var url = `https://www.google.com/maps?q=${lat},${lng}`;

        var message = generateLocationMessage(from,lat,lng);
        expect(message).toMatchObject({from,url});
        expect(typeof message.createdAt).toBe('number');
    });
})
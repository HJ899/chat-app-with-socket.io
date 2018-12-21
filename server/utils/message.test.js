var expect = require('expect');

var {generateMessage} = require('./message'); 

describe('generateMessage' ,() => {
    it('should generate correct message object' , () => {
        var from = "hardik";
        var text = "blah blah";
        var message = generateMessage(from,text);

        expect(message).toMatchObject({from,text});
        expect(typeof message.createdAt).toBe('number');
    })
})
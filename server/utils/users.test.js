const expect = require('expect');
const {Users} = require('./users')
describe('Users' , () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:'1',
            name:'a',
            room:'room1'
        },{
            id:'2',
            name:'b',
            room:'room2'
        },{
            id:'3',
            name:'c',
            room:'room1'
        }]
    })

    it('should add a new user', () => {
        var users = new Users();

        var user = users.addUser(123,'def','abc');
        expect(users.users).toMatchObject([user]);
    });

    it('should return names for room1', () => {
        var userList = users.getUsers('room1');
        expect(userList).toMatchObject(['a','c']);
    });

    it('should return names for room2', () => {
        var userList = users.getUsers('room2');
        expect(userList).toMatchObject(['b']);
    });

    it('should remove a user', () => {
        var id = '1';
        var user = users.removeUser(id);
        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var id = '11';
        var user = users.removeUser(id);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var id = '1';
        var user = users.getUser(id);
        expect(user.id).toBe(id);
    });

    it('should not find user', () => {
        var id = '5';
        var user = users.getUser(id);
        expect(user).toBeFalsy();
    });
})
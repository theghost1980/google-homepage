const helloWorld = function() {
    return '';
}
describe('Hello World', function() {
    it('says hello world', function(){
        expect(helloWorld()).toEqual('Hello, World!');
    });
});
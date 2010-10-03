describe("KeyBindings", function() {
  beforeEach(function() {
    handler = function(){
      console.log('called');
    }
  });

  afterEach(function() {
    KeyBindings.clear();
    KeyBindings.bindings = {};
  });

  it('binds single keys', function(){
    spyOn(window, 'handler');
    KeyBindings.add({
      'g': handler
    });

    fireEvent($('html')[0], 'keydown', null, {keyCode: 71}); 
    
    expect(handler).toHaveBeenCalled();
  });

  it('binds a series of keys', function() {
    spyOn(window, 'handler');
    KeyBindings.add({
      'g-i': handler
    });

    fireEvent($('html')[0], 'keydown', null, {keyCode: 71}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 73}); 
  
    expect(handler).toHaveBeenCalled();
  });

  it('binds keys in conjuction with modifiers', function() {
    spyOn(window, 'handler');
    KeyBindings.add({
      'shift-g': handler
    });

    fireEvent($('html')[0], 'keydown', null, {keyCode: 71, shiftKey: true}); 
    expect(handler).toHaveBeenCalled();
    
  });

  it('does not call handler if modifier is bound but not pressed', function() {
    spyOn(window, 'handler');
    KeyBindings.add({
      'shift-g': handler
    });

    fireEvent($('html')[0], 'keydown', null, {keyCode: 71, shiftKey: false}); 
    expect(handler).not.toHaveBeenCalled();
    
  });

  it('can bind to the konami code', function() {
    spyOn(window, 'handler');
    KeyBindings.add({
      'up-up-down-down-left-right-left-right-b-a-enter': handler
    });

    fireEvent($('html')[0], 'keydown', null, {keyCode: 38, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 38, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 40, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 40, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 37, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 39, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 37, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 39, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 66, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 65, shiftKey: false}); 
    fireEvent($('html')[0], 'keydown', null, {keyCode: 13, shiftKey: false}); 
    
    expect(handler).toHaveBeenCalled();
    
  });
  

});

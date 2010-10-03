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
  

});

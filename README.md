# Note:
This is a young project and has not been cross browser tested. I made it mainly for use in Greasemonkey, but I will test it and make it better as soon as I need to.

# How it works
You can bind single keys like this:

    KeyBindings.add({
      'g': function(e) {
        //take action here
      }
    });

Or bind to a sequence of keys, for instance pressing 'gi' in gmail will take you to your inbox:

    KeyBindings.add({
      'g-i': function(e){
        //take action here
      }
    });

Or specify modifiers (shift, ctrl, alt):

    KeyBindings.add({
      'shift-g': function() {

      }
    });

# Good for easter eggs

    KeyBindings.add({
      'up-up-down-down-left-right-left-right-b-a-enter': function() {
        goToSecretThing();
      }
    });



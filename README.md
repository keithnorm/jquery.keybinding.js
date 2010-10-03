# Note:
This is a young project and has not been cross browser tested. I made it mainly for use in Greasemonkey, but I will test it and make it better as soon as I need to.

# How it works
You can bind single keys like this:

    KeyBinding.add({
      'g': function(e) {
        //take action here
      }
    });

Or bind to a sequence of keys, for instance pressing 'gi' in gmail will take you to your inbox:

    KeyBinding.add({
      'g-i': function(e){
        //take action here
      }
    });

Or specify modifers (shift, ctrl, alt):

    KeyBinding.add({
      'shift-g': function() {

      }
    });


# TODO
Bindings for special characters isn't supported yet so binding 'shift-#' doesn't work yet. 



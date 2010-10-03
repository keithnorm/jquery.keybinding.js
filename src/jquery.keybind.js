var KeyBindings;

(function($){
  KeyBindings = {
    
    bindings: {},
    ignoreEventsOn: ['input', 'textarea', 'select'],
    modifiers: {'shift': 'shiftKey', 'alt': 'altKey', 'ctrl': 'ctrlKey'},
    pressedKeys: [],
    specialKeys: {'left': 37, 'up':38, 'right': 39, 'down': 40, '!': 49, '@': 50, '#': 51,
                  '$': 52, '%': 53, '^': 54, '&': 55, '*': 56, '(': 57, ')': 48, '_': 0,
                  '-': 109, 'enter': 13, 'space': 32},

    add: function(eventMap) {
      $.extend(this.bindings, this._mapKeyBindings(eventMap));         
    },

    clear: function() {
      this.pressedKeys = [];
    },

    process: function(e){
      var eventTargetTagName = e.target.tagName.toLowerCase();
      if($.inArray(eventTargetTagName, this.ignoreEventsOn) != -1)
        return;
      
      this.pressedKeys.push(e.which);
      var binding = this.bindings[this.pressedKeys.join('')]
      if(binding && this._checkBindingModifiers(binding, e)){
        binding.handler.call($(document), e);
        this.clear();
      }
    },

    _charCode: function(key) {
      if(this.specialKeys[key])
        return this.specialKeys[key];
      return key.toUpperCase().charCodeAt(0);
    },

    _checkBindingModifiers: function(binding, e) {
      var self = this;
      var modifiers = binding.modifiers;
      return (modifiers.length == 0 || $.inArray(false, $.map(modifiers, function(modifier, el){
        return e[self.modifiers[modifier]];
      })) == -1);
    },
    
    _mapKeyBindings: function(eventMap) {
      var self = this;
      for(var key in eventMap){
        var modifiers = [];
        var keys = $.map(key.split('-'), function(key, i){
          if(self.modifiers[key]){
            modifiers.push(key);
            return null;
          }
          else
            return self._charCode(key);

        });
        eventMap[keys.join('')] = {
          handler: eventMap[key],
          modifiers: modifiers
        }

      }
      return eventMap;
    }
  };

  $.extend(KeyBindings, 
    { debounce: function (func, threshold, execAsap) {
      var timeout;
      return function debounced () {
        var obj = this, args = arguments;
        function delayed () {
          if (!execAsap)
            func.apply(obj, args);
          timeout = null; 
        };
 
        if (timeout)
          clearTimeout(timeout);
        else if (execAsap)
          func.apply(obj, args);
 
        timeout = setTimeout(delayed, threshold || 100); 
      };
    }
  });

  $(function() {
    $(document).bind('keydown', KeyBindings.debounce(function() {
      KeyBindings.clear();
    }, 500, false));

    $(document).bind('keydown', function(e){ KeyBindings.process(e); });
  });
})(jQuery);

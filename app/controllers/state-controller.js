// app/controllers/state-controller.js

const StateCtrl = (function() {
  console.log('In State Controller');
  let data = {
    message: 'Hello world!'
  };

  return {
    getData: function() {
      return data;
    },
    setData: function(message) {
      data.message = message;
    }
  }
})();

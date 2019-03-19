var socket;
var connected = false;

function connect(){
  var URL = document.getElementById('URL').value;
  var status_obj = document.getElementById('status');
  var button_obj = document.getElementById('connect');

  if(connected == false){
      socket = io(URL);
      appendTerminal('Connecting to ' + URL);

      setTimeout(function() {
        if(socket.connected){
          connected = true;
          appendTerminal("Connected");
          button_obj.classList.remove("btn-success");
          button_obj.classList.add("btn-danger");
          button_obj.innerText = "Disconnect";

          status_obj.classList.remove('text-danger');
          status_obj.classList.add('text-success');
          status_obj.innerText = "Connected";




        }else{
          connected = false;
          appendTerminal("Not Connected");
          status_obj.innerText = "Unable to Connect";
        }
      }, 1000);

  }else{
    socket.close();
    appendTerminal('Disconnecting from ' + URL);

    setTimeout(function() {
      if(!socket.connected){
        connected = false;
        appendTerminal("Disconnected!");
        button_obj.classList.remove("btn-danger");
        button_obj.classList.add("btn-success");
        button_obj.innerText = "Connect";

        status_obj.classList.remove('text-success');
        status_obj.classList.add('text-danger');
        status_obj.innerText = "Disconnected";
      }else{
        connected = true;
        appendTerminal("Still Connected!");
        status_obj.innerText = "Unable to disconnect";
      }
    }, 1000);
  }

  socket.on('*', function(event,msg){
    appendTerminal("<b>Server (<i>"+ event + "</i>): </b>" + msg)
  });

}

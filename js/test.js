var socket;
var connected = false;

function connect(){
  var URL = document.getElementById('URL').value;
  var status_obj = document.getElementById('status');
  var button_obj = document.getElementById('connect');

  if(connected == false){
      socket = io(URL);
      console.log('Connecting to ' + URL);

      setTimeout(function() {
        if(socket.connected){
          connected = true;
          console.log("Connected");
          button_obj.classList.remove("btn-success");
          button_obj.classList.add("btn-danger");
          button_obj.innerText = "Disconnect";

          status_obj.classList.remove('text-danger');
          status_obj.classList.add('text-success');
          status_obj.innerText = "Connected";
        }else{
          connected = false;
          console.log("Not Connected");
          status_obj.innerText = "Unable to Connect";
        }
      }, 1000);

  }else{
    socket.close();
    console.log('Disconnecting from ' + URL);

    setTimeout(function() {
      if(!socket.connected){
        connected = false;
        console.log("Disconnected!");
        button_obj.classList.remove("btn-danger");
        button_obj.classList.add("btn-success");
        button_obj.innerText = "Connect";

        status_obj.classList.remove('text-success');
        status_obj.classList.add('text-danger');
        status_obj.innerText = "Disconnected";
      }else{
        connected = true;
        console.log("Still Connected!");
        status_obj.innerText = "Unable to disconnect";
      }
    }, 1000);
  }

}

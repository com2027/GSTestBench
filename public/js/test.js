var socket;
var connected = false;
var inGame = false;

var Game = {
  players: [],
  addUser: function(id){
    this.players.push(id);
    renderUserList();
  },
  removeUser: function(id){
    this.players.splice( this.players.indexOf(id), 1 );
    renderUserList();
  },
  create: function(){
    console.log("creating game...");
    if(connected){
      socket.emit('createGame', this.players)
    }
  },
  leave: function(){
    console.log("leaving game...");
    if(connected && inGame){
      socket.emit("leaveGame");
    }
  }
}

function renderUserList(){
  var user_list = document.getElementById('added_users');
  user_list.innerHTML = '';
  Game.players.forEach(function(player){
    var li = document.createElement("li")
    var remove = document.createElement("button")
    li.classList.add("list-group-item");
    li.innerText = player;
    remove.classList.add("remove")
    remove.innerText = "X"
    remove.setAttribute("onclick","Game.removeUser('" + player + "')");
    li.appendChild(remove);
    user_list.appendChild(li);
  })

}

function addUser(){
  var id = document.getElementById('add_user_input');
  if(id !== ""){
    Game.addUser(id.value);
    id.value = '';
  }
}

function updateState(){
  var gameStatus = document.getElementById('game-status');
  var leaveGame = document.getElementById('leave_game');
  if(inGame){
    disable_create_game();
    gameStatus.innerText = Game.id;
    leaveGame.disabled = false;
  }else{
    if(connected){
      enable_create_game();
      gameStatus.innerText = "Not in Game"
      leaveGame.disabled = true;
    }else{
      disable_create_game();
      gameStatus.innerText = "Not in Game"
      leaveGame.disabled = true;
    }
  }
}

function define_listeners(){
  socket.on('gameCreated', function(game){
    appendTerminal("[SERVER]: " + game.message);
    appendTerminal("[SERVER]: Game ID - " + game.id);
    Game.id = game.id;
    inGame = true;
    updateState();
  });

  socket.on('gameNotCreated', function(err){
    appendTerminal("[SERVER]: " + err.message);
  });

  socket.on('gameLeft', function(data){
    appendTerminal("[SERVER]: " + data.message);
    inGame = false;
    delete Game.id;
    updateState();
  });
}

function enable_create_game(){
  var createGame = document.getElementById('create_game');
  createGame.classList.remove('btn-secondary');
  createGame.classList.add('btn-success');
  createGame.disabled = false;
}

function disable_create_game(){
  var createGame = document.getElementById('create_game');
  createGame.classList.remove('btn-success');
  createGame.classList.add('btn-secondary');
  createGame.disabled = true;
}

function enable_functionality(){
  enable_create_game();

  define_listeners();

}

function disable_functionality(){
  disable_create_game();
}

function connect(){
  var URL = document.getElementById('URL').value;
  var token = document.getElementById('token_input').value;
  var status_obj = document.getElementById('status');
  var button_obj = document.getElementById('connect');


  if(connected == false){

      if(token === ""){
        socket = io(URL);
        appendTerminal('Connecting to ' + URL);
      }else{
        socket = io(URL, {query: {token: token}});
        appendTerminal('Connecting to ' + URL);
        appendTerminal('Using authentication token: ' + token);
      }

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

          enable_functionality();

          // socket.on('disconnect', connect);

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

        disable_functionality();
        inGame = false;
        updateState();
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

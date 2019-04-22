var terminal = document.getElementById('server-terminal');
terminal.style.height = "40vh";
terminal.style.backgroundColor = "#444";
terminal.style.border = "1px solid #777";
terminal.style.color = "#fff";
terminal.style.fontFamily = "monospace";
terminal.style.paddingTop = "10px";
terminal.style.paddingLeft = "10px";
terminal.style.paddingBottom = "30px";
terminal.style.overflow = "scroll";

function updateScroll(){
    terminal.scrollTop = terminal.scrollHeight;
}

function appendTerminal(str){
  terminal.innerHTML += str + '<br>';
  console.log(str);
  updateScroll();
}

function clearTerminal(){
  terminal.innerHTML = "";
  updateScroll();
}

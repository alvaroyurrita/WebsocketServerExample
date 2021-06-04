


let webSocket;



document.getElementById("OpenSocket").addEventListener("click", () => {
  OpenSocket()
})
document.getElementById("CloseSocket").addEventListener("click", () => {
  CloseSocket()
})



function OpenSocket() {
  console.log("Opening Socket")
  this.webSocket = new WebSocket("ws://192.168.0.143:3930/Audio");

  this.webSocket.onerror = (e) => {
    console.log("Error on WebSocket")
    console.log(e);
  }

  this.webSocket.onopen = (e) => {
    console.log("Websocket Open");
    this.webSocket.send("{ message: 'GET' }");
  }

  this.webSocket.onmessage = (e) => {
    document.getElementById("SocketInfo").innerHTML = e.data
    console.log('Received Message')
    console.log(e.data)
  }

  this.webSocket.onclose = (e) => {
    console.log('Socket Closed')
  }

}

function CloseSocket() {
  console.log("Closing Socket")
  this.webSocket.close();
}



import config from '../config';

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  addCallbacks(newMessageCallback,errorMessageCallback) {
    this.callbacks['new_message'] = newMessageCallback;
    this.callbacks['error_message'] = errorMessageCallback;
  }

  connect(chatroom_id) {
    var path = config.API_PATH + "/" + chatroom_id
    console.log("connecting to " + path)
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };
    this.socketRef.onmessage = e => {
      this.handleMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      //console.log("WebSocket closed. Attempting to reopen");
      //this.connect();
    };
  }

  handleMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.type;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command in this.callbacks) {
      this.callbacks[command](parsedData.content);
    }
    else {
      console.log("ERROR: Invalid command: " + command);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback, timeToWait){
    const socket = this.socketRef;
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          if(callback != null) {
            callback();
          }
          return;
        }
      }, timeToWait); // wait 5 milisecond for the connection...
  }

  postChatMessage(text) {
    var key = localStorage.getItem('token')
    if (key == null) {
      throw new Error("Must be logged in to send chat message")
    }
    console.log("posting chat message")
    this._sendMessage({ command: 'post_message', text: text});
  }

  _sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }  
  }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;

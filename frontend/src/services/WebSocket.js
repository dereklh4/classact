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

  addCallbacks(initChatCallback,errorMessageCallback,newMessageCallback,upvotedMessageCallback,newResponseCallback,
          editResponseCallback,deleteResponseCallback,editMessageCallback,deleteMessageCallback) {
    this.callbacks['init_chat'] = initChatCallback;
    this.callbacks['error_message'] = errorMessageCallback;

    this.callbacks['new_message'] = newMessageCallback;
    this.callbacks['upvoted_message'] = upvotedMessageCallback;
    this.callbacks['new_response'] = newResponseCallback;
    this.callbacks['edit_response'] = editResponseCallback;
    this.callbacks['delete_response'] = deleteResponseCallback;
    this.callbacks['edit_message'] = editMessageCallback;
    this.callbacks['delete_message'] = deleteMessageCallback;
  }

  connect(chatroom_url) {
    var path = config.API_PATH + "/" + chatroom_url + "/" + localStorage.getItem("token")
    console.log("connecting to " + path)
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
      this.initChat(50);
    };
    this.socketRef.onmessage = e => {
      this.handleMessage(e.data);
    };
    this.socketRef.onerror = e => {
      alert("Error occurred")
    };
    this.socketRef.onclose = e => {
      console.log("Web socket closed")
    };

  }

  close() {
    if (this.socketRef != null) {
      this.socketRef.close();
    }
  }

  handleMessage(data) {
    const parsedData = JSON.parse(data);
    console.log(parsedData)
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

  postChatMessage(text, anonymous) {
    var key = localStorage.getItem('token')
    if (key == null) {
      throw new Error("Must be logged in to send chat message")
    }
    console.log("posting chat message")
    this._sendMessage({ command: 'post_message', text: text, anonymous: anonymous});
  }

  initChat(load_count) {
    this._sendMessage({ command: 'init_chat', message_count: load_count});
  }

  upvoteMessage(in_message_id) {
    this._sendMessage({command: 'upvote_message', message_id: in_message_id})
  }

  postResponse(in_message_id, text, anonymous) {
    this._sendMessage({ command: 'post_response', message_id: in_message_id, text: text, anonymous: anonymous});
  }

  editResponse(in_message_id, response_id, text, anonymous) {
    this._sendMessage({ command: 'edit_response', message_id: in_message_id, response_id: response_id, text: text, anonymous: anonymous});
  }

  editMessage(in_message_id, text, anonymous) {
    this._sendMessage({ command: 'edit_message', message_id: in_message_id, text: text, anonymous: anonymous});
  }

  deleteResponse(in_message_id, response_id) {
    this._sendMessage({ command: 'edit_response', message_id: in_message_id, response_id: response_id});
  }

  deleteMessage(in_message_id) {
    this._sendMessage({ command: 'edit_message', message_id: in_message_id});
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

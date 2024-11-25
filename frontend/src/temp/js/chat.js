const url = "http://localhost:8080";
let stompClient;
let selectedUser;
function connectToChat(userName) {
  console.log("Connect to chat");
  let socket = new SockJS(url + "/chat");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("connectted to: " + frame);
    stompClient.subscribe("/topic/message/" + +userName, function (response) {
      let data = JSON.parse(response.body);
      console.log(data);
    });
  });
}

function sendMsg() {
  stompClient.send(
    "/app/chat/" + selectedUser,
    {},
    JSON.stringify({
      fromLogin: from,
      message: text,
    })
  );
}

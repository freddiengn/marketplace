import React from "react";
import { Helmet } from "react-helmet";

var Index = () => {
  return (
    <>
      <Helmet>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
        <script src="main.js"></script>
      </Helmet>
      <noscript>
        <h2>Sorry! Your browser doesn't support Javascript</h2>
      </noscript>
      <div id="username-page">
        <div className="username-page-container">
          <h1 className="title">Enter your username</h1>
          <form id="usernameForm" name="usernameForm">
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Username"
                autoComplete="off"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="accent username-submit">
                Start Chatting
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="chat-page" className="hidden">
        <div className="chat-container">
          <div className="chat-header">
            <h2>Spring WebSocket Chat Demo - By Alibou</h2>
          </div>
          <div className="connecting">Connecting...</div>
          <ul id="messageArea"></ul>
          <form id="messageForm" name="messageForm" action="">
            <div className="form-group">
              <div className="input-group clearfix">
                <input
                  type="text"
                  id="message"
                  placeholder="Type a message..."
                  autoComplete="off"
                  className="form-control"
                />
                <button type="submit" className="primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js"
        crossOrigin="true"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"
        crossOrigin="true"
      ></script>
      <script
        async
        src="main.js"
        onLoad={() => console.log("main is being")}
      ></script>
    </>
  );
};

export default Index;

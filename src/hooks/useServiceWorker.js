import React from "react";

const useServiceWorker = (callBack = () => {}) => {
  const messageChannel = new MessageChannel();

  messageChannel.port1.onmessage = (event) => {
    callBack(event.data);
  };

  const sendData = ({ type, data }) => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(
        {
          type: "INIT_PORT",
        },
        [messageChannel.port2]
      );
      navigator.serviceWorker.controller.postMessage({
        type,
        data,
      });
    }
  };

  return {
    sendData,
  };
};

export default useServiceWorker;

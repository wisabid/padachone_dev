self.addEventListener("message", e => {
  console.log(`Iam in receipt of your message : ${e.data}`);
  const { type, msg } = e.data;
  switch (type) {
    case "logger":
      // Whatsapp Logger
      const message = `${msg.action} : ${msg.message}`;
      sendWhatsappLogs(message, getbackToSite);
      break;
    default:
      break;
  }
  
});

function getbackToSite(message) {
  self.postMessage({
    msg: message
  });
}

async function sendWhatsappLogs(message, callback) {
  const result = await fetch(
    `https://padachone-dev.herokuapp.com/whatsapp?msg=${message}`
  );
  const respnse = await result.json();
  console.log(respnse);
  callback(`Successfully sent the following message : ${message}`);
}

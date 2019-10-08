self.addEventListener("message", async (e) => {
  console.log(`Iam in receipt of your message : `, JSON.stringify(e.data));
  const { type, msg } = e.data;
  let message;
  switch (type) {
    case "logger":
      // Whatsapp Logger
      message = `${msg.action} : ${msg.message}`;
      sendWhatsappLogs(message, getbackToSite);
      break;
    case "apod":
      const apodJson = await fetchApod();
      if (apodJson.url !== msg.current) {
        getbackToSite({...apodJson, targetcomp : 'AppPages'});
      }
      // sendWhatsappLogs(message, getbackToSite);
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
    `https://padachone-dev.herokuapp.com/whatsapp?msg=${message}`,
    {
      headers: {
        Accept: "application/json"
      }
    }
  );
  const respnse = await result.json();
  console.log(respnse);
  callback(`Successfully sent the following message : ${message}`);
}

async function fetchApod() {
  const result = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`,
    {
      headers: {
        Accept: "application/json"
      }
    }
  );
  const json = await result.json();
  return json;
}

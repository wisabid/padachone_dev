import * as emailjs from "emailjs-com";
import moment from "moment";
import { PRAYERS_ARR } from "./constants";
import { db } from "../config/firebase";
import { messaging } from "../config/firebase";

// import firebase from 'firebase';

export const getPDdata = type => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const dte = new Date();
  const day = ("0" + dte.getDate()).slice(-2);
  const month_m = ("0" + (dte.getMonth() + 1)).slice(-2);
  const month = months[dte.getMonth()];
  const year = dte.getFullYear();
  if (type === "mdy") {
    return `${month_m}/${day}/${year}`;
  } else if (type === "iso") {
    return dte.toISOString();
  }
  return `${day} ${month} ${year}`;
};

export function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

export function handleLocalStorage({ name, value = "" }) {
  if (!value) {
    return localStorage.getItem(name);
  }
  localStorage.setItem(name, value);
}

export function validateEmail(email) {
  const emailValidator = /\S+@\S+\.\S+/;
  return emailValidator.test(email);
}

export function sendSubscriptionEmail(email) {
  let template_params = {
    reply_to: "admirer@padachone.com",
    from_name: "Admirer",
    to_name: email,
    message_html: "Thank you for Subscribing to Padachone.com. You are Awesome!"
  };

  const service_id = "default_service";
  const template_id = "template_Li3TxnLs";
  return emailjs.send(
    service_id,
    template_id,
    template_params,
    "user_L109OnczphkyI5bvHhcSe"
  );
}

export function getJustPrayers({ timings }) {
  let justPrayers = Object.keys(timings).reduce((all, item) => {
    if (PRAYERS_ARR.indexOf(item) !== -1) {
      all[item] = timings[item];
    }
    return all;
  }, {});
  return justPrayers;
}

export const getMonthYearNumber = PDdate => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const month = months.indexOf(PDdate.substr(2, 3)) + 1;
  const monthNumber = ("0" + month).slice(-2);
  const year = PDdate.substr(5, 4);

  return [monthNumber, year];
};

export const checkSubscription = email => {
  return db
    .collection("subscribers")
    .where("email", "==", email)
    .get();
  // .then(querySnapshot => {
  //     const data = querySnapshot.docs.map(doc => doc.data());
  //     console.log('DB : ',data); // array of cities objects
  //     // if (data.length) {
  //     //     return true;
  //     // }
  //     // else {
  //     //     return false;
  //     // }

  // });
};

export const addNewSubscriber = ({ email, ip }) => {
  return db
    .collection("subscribers")
    .add({ email: email, active: true, ip: ip });
  // .doc(new Date().getTime().toString())
  // .set({email : email})
  // .then(() => {
  //     NotificationManager.success("A new user has been added", "Success");
  //     window.location = "/";
  // })
  // .catch(error => {
  //     NotificationManager.error(error.message, "Create user failed");
  //     this.setState({ isSubmitting: false });
  // });
};
export const addUniqueVisitor = visitor => {
  if (visitor.IPv4) {
    const dt = getPDdata();
    db.collection("visitors")
      .where("date", "==", dt)
      .where("data.IPv4", "==", visitor.IPv4)
      .where("host", "==", window.location.hostname)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("DB : ", data); // array of cities objects
        if (data.length) {
          console.log("Visitor already exists");
          return;
        } else {
          db.collection("visitors")
            .add({
              data: visitor,
              date: dt,
              host: window.location.hostname,
              timestamp: new Date()
            })
            .then(() => {
              console.log("Successfully updated visitor data");
              return;
            })
            .catch(err => {
              console.log(err);
              return;
            });
        }
      })
      .catch(err => {
        console.log(err);
        return;
      });
  } else {
    console.log("NO IP saved");
    return;
  }
};

// export const askForNotifyPermission = async () => {
//     debugger;
//     try {
//       const messaging = firebaseApp.messaging();
//       await messaging.requestPermission();
//       const token = await messaging.getToken();
//       console.log('token do usuário:', token);

//       return token;
//     } catch (error) {
//       console.error(error);
//     }
//   }

export const requestNotify = visitor => {
  if (messaging) {
    // console.log('FCM', await messaging.getToken())
    messaging
      .requestPermission()
      .then(async function() {
        try {
          const token = await messaging.getToken();
          console.log("ACCEPTED", token);
          /*fetch('https://www.easycron.com/rest/list?token=7f8b5800988b8daa158e078123a6f181&sortby=cronId&order=asc', {
              headers : {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers' : '*'
              }
          })
          .then(res => {
              console.log(res);
          })*/
          db.collection("notification")
            .where("token", "==", token)
            .get()
            .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => doc.data());
              console.log("DB : ", data); //
              if (data.length) {
                console.log("TOKEN already exists");
                return;
              } else {
                db.collection("notification").add({
                  type: "fcm",
                  ip: "visitor.IPv4",
                  token: token,
                  topic: "Prayer",
                  domain: window.location.hostname,
                  device: navigator.userAgent,
                  active: true,
                  timestamp: new Date()
                });
              }
            });
        } catch (e) {
          console.error(e);
        }
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });

    navigator.serviceWorker.addEventListener("message", message => {
      console.log("MSG : ", message);
    });
  }
  //FCM Ends here
};

export const addAlert = async ({ prayer, time, tz }) => {
  return new Promise((resolve, reject) => {
    const splitForCron = time.split(":");
    const cronExpression = encodeURIComponent(
      `${splitForCron[1]} ${splitForCron[0]} * * *`
    );

    let timezoneFrom = 2;
    // Ignore timezone from value if its Asia/Calcutta as its not programmatically updating Asia/Calcutta in ezcron
    if (tz === "Asia/Calcutta") {
      timezoneFrom = 1;
    }
    if (messaging) {
      // console.log('FCM', await messaging.getToken())
      messaging.requestPermission().then(async function() {
        try {
          const token = await messaging.getToken();
          fetch(
            `https://www.easycron.com/rest/add?
            token=ac580f3a4fb58c29f766ed2789f63bff&
            cron_expression=${cronExpression}&
            url=https://fcm.googleapis.com/fcm/send&
            timezone_from=${timezoneFrom}&timezone=${tz}&
            cron_job_name=Test-${prayer}-${time}&
            http_method=POST&
            custom_timeout=100&
            http_headers=Authorization%3Akey%3DAAAA3BtrViw%3AAPA91bHwejU0gjRcivKv4nNjfcvply4dS5NkP_OZqQEaDX0LbQFO76J_1Tu9pod_8eGsP_5_bdZoNGNRH4GFAVYcS7UrDH0eE3A83AUW14lKFp_GZE8LVH9ai4-Xz1irPkn0MFPFb7Zu%0AContent-Type%3Aapplication%2Fjson%0Apriority%3Ahigh%0A
            &posts={"to":"${token}","notification":{"body":"Reminder : Its ${prayer} time (${time}). How do you like this reminder?","title":"Padachone.com","click_action":"https://www.padachone.com","icon":"https://www.padachone.com/Padachone-Twitter.png"}}`,
            {
              mode: "no-cors",
              headers: {
                "Content-Type": "text/html"
              }
            }
          )
            .then(function(response) {
              console.log("CRON", response);
              sessionStorage.setItem(`padachone_reminder:${time}`, `1`);
              resolve("OK");
            })
            .catch(err => {
              console.log("CRONNNN", err);
              reject("NOTOK");
            });
        } catch (error) {
          console.log(error);
          reject("NOTOK");
        }
      });
    }
  });
};

// checks if user selected timezone is actually users timezone or not
export const validateUserTimezone = tz => {
  const userTimezone = moment.tz.guess();
  if (userTimezone === tz) {
    return true;
  }
  return false;
};

export const addTestAlert = async ({ prayer, time, tz }) => {
  return new Promise((resolve, reject) => {
    const splitForCron = time.split(":");
    const cronExpression = encodeURIComponent(
      `${splitForCron[1]} ${splitForCron[0]} * * *`
    );

    let timezoneFrom = 2;
    // Ignore timezone from value if its Asia/Calcutta as its not programmatically updating Asia/Calcutta in ezcron
    if (tz === "Asia/Calcutta") {
      timezoneFrom = 1;
    }
    if (messaging) {
      // console.log('FCM', await messaging.getToken())
      messaging.requestPermission().then(async function() {
        try {
          const token = await messaging.getToken();
          fetch(`
            https://www.easycron.com/rest/add?
            token=ac580f3a4fb58c29f766ed2789f63bff&
            cron_expression=${cronExpression}&
            url=https://padachone-dev.herokuapp.com/cron?tz=${tz}****${time}****${prayer}****${token}&
            timezone_from=${timezoneFrom}&timezone=${tz}&
            cron_job_name=Test-${prayer}-${time}&
            http_method=GET&
            custom_timeout=5
          `)
            .then(resp => {
              console.log("CRON", resp);
              // sessionStorage.setItem(`padachone_reminder:${time}`, `1`);
              resolve("OK");
            })
            .catch(err => {
              console.log("CRONNNN", err);
              resolve("OK"); // ideally it should be NOTOK
              // reject("NOTOK");
            });
          /*fetch(
            `https://www.easycron.com/rest/add?
            token=ac580f3a4fb58c29f766ed2789f63bff&
            cron_expression=${cronExpression}&
            url=https://fcm.googleapis.com/fcm/send&
            timezone_from=${timezoneFrom}&timezone=${tz}&
            cron_job_name=Test-${prayer}-${time}&
            http_method=POST&
            custom_timeout=100&
            http_headers=Authorization%3Akey%3DAAAA3BtrViw%3AAPA91bHwejU0gjRcivKv4nNjfcvply4dS5NkP_OZqQEaDX0LbQFO76J_1Tu9pod_8eGsP_5_bdZoNGNRH4GFAVYcS7UrDH0eE3A83AUW14lKFp_GZE8LVH9ai4-Xz1irPkn0MFPFb7Zu%0AContent-Type%3Aapplication%2Fjson%0Apriority%3Ahigh%0A
            &posts={"to":"${token}","notification":{"body":"Reminder : This is a test Reminder for time - ${time}.","title":"Padachone.com","click_action":"https://www.padachone.com","icon":"https://www.padachone.com/Padachone-Twitter.png"}}`,
            {
              mode: "no-cors",
              headers: {
                "Content-Type": "text/html"
              }
            }
          )
            .then(function(response) {
              console.log("CRON", response);
              sessionStorage.setItem(`padachone_reminder:${time}`, `1`);
              resolve("OK");
            })
            .catch(err => {
              console.log("CRONNNN", err);
              reject("NOTOK");
            });*/
        } catch (error) {
          console.log(error);
          reject("NOTOK");
        }
      });
    }
  });
};

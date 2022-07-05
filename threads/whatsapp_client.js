const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
var mqtt = require("mqtt");
const { Client } = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");
var whatsApp = async ({ target, session }) => {
  const config = {
    puppeteer: {
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      args: ["--incognito"],
    },
  };
  if (session) {
    config["session"] = session;
  }
  const client = new Client(
    config
    // {
    //     puppeteer: {
    //         executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',

    //     },
    //     // parth godhani session
    //     // session: {
    //     //     WABrowserId: '"YTNUDoX+tDZ2GTBMEdF35A=="',
    //     //     WASecretBundle: '{"key":"BDX7tWaQnPtG6PLdplKcRgDWeZU7nSCcx+3Fcv2HMrQ=","encKey":"cHKTwTD0W902oXL8xYfAegOIUsD19XPU/lCJP+BLya0=","macKey":"BDX7tWaQnPtG6PLdplKcRgDWeZU7nSCcx+3Fcv2HMrQ="}',
    //     //     WAToken1: '"VZwnksB7Ec6yRUuxFTxyoJSiBaSvvGmFFwlzJYMS2NefU3svh5RQNxO5QlRdy/4vSNwmlX6jRuTRkJ567kX1pA=="',
    //     //     WAToken2: '"1@ivtu196l+lQJtT92uzpY+I0Y6AlsYGeHzQYPM5ixPUH1zArY7+1LIIZIwGPYVja8DsZiZDkAA+V/hg=="'
    //     // }

    //     // dhrumesh session
    //     // session: {
    //     //     WABrowserId: '"FKm6fZtn2Ercw4he6iIJ7w=="',
    //     //     WASecretBundle: '{"key":"d9armbKDZeKp5PjKIOjC0D/3KFmNFDu36OubmEWi4PY=","encKey":"t3qS49ZjsRxt1BZN8WPeoCV0ed758ZJL34tgw8HC/P0=","macKey":"d9armbKDZeKp5PjKIOjC0D/3KFmNFDu36OubmEWi4PY="}',
    //     //     WAToken1: '"I4ihQ/3y1y2nk+EQpaB6/FbLE8ZStjfAgW69YgotShU="',
    //     //     WAToken2: '"1@NONxDKF22bTOaAWJyO4ioTrZtNpNQI7fjtJILa4hd4dbPTqg4jFS4nopmcZ1Gtje69Rh2kP/Y2lqRQ=="'
    //     // }

    //     // chandresh kathirya
    //     // session: {
    //     //     WABrowserId: '"GYpIi8RGn8dIRNxFsEbulA=="',
    //     //     WASecretBundle: '{"key":"31Lk7o7WJ5jHiZpuyCV6FCitQcVpLwRm7aa9nKMg4cQ=","encKey":"wXBvStHx6CzlMKnAwrE6yKUMQK2eBuOCAJZy3StFZv4=","macKey":"31Lk7o7WJ5jHiZpuyCV6FCitQcVpLwRm7aa9nKMg4cQ="}',
    //     //     WAToken1: '"XM6LSyBjxlXzwwBuBQOJDIWyNDFRpkE4Ubt3yJwOeyk="',
    //     //     WAToken2: '"1@8KjPRkijtoT4lxdbrS4QYXH49zJchZUU6jq/8T/H5V3byIDhB99tPuZRYY51zArBHrPDUKxksgDrPA=="'
    //     // }
    //     session
    // }
  );
  const mqttClient = mqtt.connect("ws://localhost:3001");

  mqttClient.on("connect", () => {
    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      mqttClient.publish(
        "presence",
        JSON.stringify({
          type: "QRCODE",
          data: { qr },
        })
      );
    });
    client.on("authenticated", (result) => {
      console.log("result");
      console.log(result);
      console.log("result");
      mqttClient.publish(
        "authenticated",
        JSON.stringify({
          type: "READY",
          data: result,
        })
      );
    });
    client.on("ready", async (data) => {
      console.log("Client is ready!");
      mqttClient.publish(
        "presence",
        JSON.stringify({
          type: "READY",
          data: data,
        })
      );

      // get profile pic
      client.getProfilePicUrl().then((result) => {
        mqttClient.publish(
          "presence",
          JSON.stringify({
            type: "PROFILE",
            data: result,
          })
        );
      });

      // get product
      client.getContacts().then((contacts) => {
        mqttClient.publish(
          "presence",
          JSON.stringify({
            type: "contacts",
            data: contacts,
          })
        );
      });
      // send text msg
      await Promise.all(target.map((t) => sendMsg(client, t)));
      // .then(result => {

      //     mqttClient.publish('presence', JSON.stringify({
      //         type: "msg",
      //         data: result
      //     }));
      // })))

      // send video
      const media = MessageMedia.fromFilePath(
        "C:/Users/01/Downloads/file_example_MP4_480_1_5MG.mp4"
      );
      // const media = MessageMedia.fromFilePath('C:/Users/01/Downloads/Par Infotech Public Holiday List (1).docx');

      target.map((t) => {
        return sendMedia(client, t, media);
      });
      // await Promise.all(target.map(t => client.getChatById(t).then(chat => chat.sendMessage(media, { caption: "Test msg with caption from whatsapp automation" }))))

      // var chat = await client.getChatById(target[0])
      // await chat.sendMessage(media, { caption: "Test msg with caption from whatsapp automation" });
      // await client.logout();
      // await client.destroy();
      process.exit(0);
    });
    client.initialize();
  });
};

const sendMsg = async (client, t) => {
  client.sendMessage(t, "Test msg from whatsapp automation");
};

const sendMedia = async (client, t, media) => {
  var chat = await client.getChatById(t);
  chat.sendMessage(media, {
    caption: "Test msg with caption from whatsapp automation",
  });
};

whatsApp(workerData);

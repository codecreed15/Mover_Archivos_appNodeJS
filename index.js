const ProcessManager = require("./processManager");
const user = process.env.USERNAME;
const winword = new ProcessManager(
  "wps.exe", user
);

(async () => {
  try {
    const running = await winword.isRunning();
    console.log("¿WPS está corriendo? ", running);

    if (running) {
      console.log(await winword.close());
    }

    const move = await winword.move();
    console.log("..."+move);

    setTimeout(async () => {
      console.log(await winword.open());
    }, 5000);

  } catch (err) {
    console.error("Error:", err);
  }
})();
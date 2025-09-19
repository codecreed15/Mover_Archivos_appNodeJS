const ProcessManager = require("./automarizar"); //  tu clase
const user = process.env.USERNAME;

// Instancia para WPS (wps.exe)
const wps = new ProcessManager("wps.exe", user);

(async () => {
  try {
    // Verificar si WPS está corriendo
    const running = await wps.isRunning();
    console.log("¿WPS está corriendo? ", running);

    // Si está corriendo → cerrarlo
    if (running) {
      console.log(await wps.close());
    }

    // Mover/copiar todos los archivos .docx
    const resultadoMove = await wps.move(".rar");
    console.log("Resultado mover:", resultadoMove);

    // Abrir WPS de nuevo
    console.log(await wps.open());

  } catch (err) {
    console.error("Error en index:", err);
  }
})();
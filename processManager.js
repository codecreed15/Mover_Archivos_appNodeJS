const { exec } = require("child_process");

class ProcessManager {
  constructor(processName,user) {
    this.processName = processName;
    this.user = user;
  }

  isRunning() {
    return new Promise((resolve, reject) => {
      exec(
        `tasklist /FI "IMAGENAME eq ${this.processName}"`,
        (error, stdout) => {
          if (error) return reject(error);
          resolve(stdout.includes(this.processName));
        }
      );
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      exec(`taskkill /IM ${this.processName}`, (error, stdout, stderr) => {
        if (error)
          return reject(
            `Error al cerrar ${this.processName}: ${error.message}`
          );
        if (stderr) return reject(stderr);
        resolve(`${this.processName} cerrado ✅`);
      });
    });
  }

  open() {
    return new Promise((resolve, reject) => {
      exec(`start ${this.processName}`, (error) => {
        if (error) return reject(error);
        resolve(`${this.processName} abierto ✅`);
      });
    });
  }

  move() {
  return new Promise((resolve, reject) => {
    exec('d: && cd "D:\\Programacion_Projectos\\NODEJS\\task_move_FilesA\\"')
    // 1. Listar los archivos .docx
    exec('dir "D:\\Programacion_Projectos\\NODEJS\\task_move_Files\\A\\*.docx"', (error, stdout, stderr) => {
      if (error) return reject(`Error al listar: ${error.message}`);
      if (stderr) return reject(`stderr: ${stderr}`);

      // Si no hay archivos .docx
      if (!stdout.trim()) {
        return resolve("❌ No se encontraron archivos .docx");
      }

      console.log("Archivos encontrados:\n", stdout);

      // 2. Mover los archivos si existen
      exec('move "D:\\Programacion_Projectos\\NODEJS\\task_move_Files\\A\\*.docx" "D:\\Programacion_Projectos\\NODEJS\\task_move_Files\\B\\"', (error2, stdout2, stderr2) => {
        if (error2) return reject(`Error al mover: ${error2.message}`);
        if (stderr2) return reject(`stderr: ${stderr2}`);

        resolve(`✅ Archivos movidos correctamente al usuario ${this.user}`);
      });
    });
  });
}
}

module.exports = ProcessManager;

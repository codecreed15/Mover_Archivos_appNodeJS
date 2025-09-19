const { exec } = require("child_process");
const { promises: fs } = require("fs"); // usamos versión de promesas
const path = require("path");

const origen = "D:\\Programacion_Projectos\\NODEJS\\task_move_Files\\A\\";
const destino = "D:\\Programacion_Projectos\\NODEJS\\task_move_Files\\B\\";

class ProcessManager {
  constructor(processName, user) {
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
        resolve(`${this.processName} cerrado `);
      });
    });
  }

  open() {
    return new Promise((resolve, reject) => {
      exec(`start ${this.processName}`, (error) => {
        if (error) return reject(error);
        resolve(`${this.processName} abierto `);
      });
    });
  }

  async move(ext) {
    try {
      // Crear carpeta destino si no existe
      try {
        await fs.access(destino);
      } catch {
        await fs.mkdir(destino, { recursive: true });
      }

      // Lee todos los archivos
      const archivos = await fs.readdir(origen);

      // Filtrar por extensión
      const filtrados = archivos.filter((f) => f.endsWith(ext));

      if (filtrados.length === 0) {
        return `No se encontraron archivos ${ext}`;
      }

      for (const archivo of filtrados) {
        const origenPath = path.join(origen, archivo);
        const destinoPath = path.join(destino, archivo);

        await fs.copyFile(origenPath, destinoPath);
        console.log(`${archivo} copiado correctamente`);
        await sleep(5000);
      }

      return `Todos los archivos ${ext} copiados`;
    } catch (err) {
      throw new Error(`Error al mover archivos: ${err.message}`);
    }
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = ProcessManager;

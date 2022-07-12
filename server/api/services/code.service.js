import fs from "fs";
import { execFile, spawn, exec } from "child_process";
const FILE_PATH = `./executable`;

class CodeService {
  async execute(code, lang) {
    try {
      //writing the file
      const path = await this.writeFile(code, lang);
      //executing the file
      let output = "";
      switch (lang) {
        case "javascript": {
          output = await this.execChild(`node ${path}`);
          break;
        }
        case "c++": {
          output = await this.execChild(
            `g++ -o ${FILE_PATH}/run ${path} && cd ${FILE_PATH} && run && cd ..`
          );
          //   console.log(`${FILE_PATH}/run.exe`);
          setTimeout(() => {
            fs.unlink(`${FILE_PATH}/run.exe`, (err) => {
              if (err) throw err;
            });
          }, 100);
          break;
        }
        case "python": {
          output = await this.execChild(`python ${path}`);
          break;
        }
        default: {
          throw "Invalid language";
        }
      }
      fs.unlink(path, (err) => {
        if (err) throw err;
      });
      if (output) return output.toString();
    } catch (error) {
      throw { status: "404", message: error };
    }
  }

  async writeFile(code, lang) {
    let path = `${FILE_PATH}/sample`;
    switch (lang) {
      case "javascript": {
        path += ".js";
        break;
      }
      case "c++": {
        path += ".cpp";
        break;
      }
      case "python": {
        path += ".py";
        break;
      }
      default: {
      }
    }
    fs.writeFile(path, code, (err) => {
      if (err) throw { message: err };
    });
    return path;
  }

  async execChild(command) {
    // console.log(command);
    return new Promise((resolve, reject) => {
      const child = spawn(command, { shell: true });
      child.stdout.on("data", (data) => {
        resolve(data);
      });

      child.stderr.on("data", (data) => {
        reject(data.toString());
      });

      child.on("error", (err) => {
        throw { status: "404", message: err };
      });

      child.on("exit", (code, signal) => {
        console.log("code : ", code);
        console.log("signal : ", signal);
      });
    });
  }
}

export default new CodeService();

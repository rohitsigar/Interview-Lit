import fs from "fs";
import { execFile, spawn, exec } from "child_process";
const FILE_PATH = `./executable`;
const FILE_NAME = `sample`;
const INPUT_NAME = `input`;

class CodeService {
  async execute(code, input, lang) {
    try {
      //writing the file
      const fileName = await this.writeFile(code, lang);

      //writing input
      const inputName = input ? await this.writeFile(input, "input") : null;

      //write command
      const command = await this.writeCommand(lang, fileName, inputName);

      //executing the file
      const output = await this.execChild(command);

      //deleting files
      setTimeout(async () => {
        await this.deleteFiles(fileName, inputName, lang);
      }, 200);

      if (output) return output.toString();
    } catch (error) {
      throw { status: "404", message: error };
    }
  }

  async writeFile(code, lang) {
    let fileName = lang == `input` ? `${INPUT_NAME}` : `${FILE_NAME}`;
    switch (lang) {
      case "javascript": {
        fileName += ".js";
        break;
      }
      case "c++": {
        fileName += ".cpp";
        break;
      }
      case "python": {
        fileName += ".py";
        break;
      }
      case "input": {
        fileName += ".txt";
        break;
      }
      default: {
      }
    }
    fs.writeFile(`${FILE_PATH}/${fileName}`, code, (err) => {
      if (err) throw { message: err };
    });
    return fileName;
  }

  async writeCommand(lang, fileName, inputName) {
    let command = "";
    switch (lang) {
      case "javascript": {
        command = `node ${FILE_PATH}/${fileName}`;
        break;
      }
      case "c++": {
        command = `cd ${FILE_PATH} && g++ ${fileName} && a ${
          inputName ? `< ${inputName}` : null
        } && cd ..`;
        break;
      }
      case "python": {
        command = `cd ${FILE_PATH} && python ${fileName} ${
          inputName ? `< ${inputName}` : null
        } && cd ..`;
        break;
      }
      default: {
        throw "Invalid language";
      }
    }
    return command;
  }

  async execChild(command) {
    // console.log(command);
    return new Promise((resolve, reject) => {
      const child = spawn(command, { shell: true });
      child.stdout.on("data", (data) => {
        // console.log(data.toString());
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

  async deleteFiles(fileName, inputName, lang) {
    fs.unlinkSync(`${FILE_PATH}/${fileName}`, (err) => {
      if (err) throw err;
    });
    if (inputName) {
      fs.unlinkSync(`${FILE_PATH}/${inputName}`, (err) => {
        if (err) throw err;
      });
    }
    if (lang == "c++") {
      fs.unlinkSync(`${FILE_PATH}/a.exe`, (err) => {
        if (err) throw err;
      });
    }
  }
}

export default new CodeService();

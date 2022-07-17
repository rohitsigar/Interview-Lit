import fs from 'fs';
import path from 'path';
import util from 'util';
import { execFile, spawn, exec } from 'child_process';
import ValidationService from './validation.service';
const ROOT_DIR = `${process.cwd()}`;
const SOURCE_DIR = path.join(ROOT_DIR, 'executor');
const TARGET_DIR = `/app/codes`;
const IMAGE_NAME = 'executor:1.0';
//const VOL_NAME = `my_vol`;
const VOL_NAME = SOURCE_DIR;

class CodeService {
  async execute(code, input, lang, id) {
    //console.log('code', code);
    try {
      !input ? (input = '') : null;

      // validating code
      // await this.validateCode(code, input, lang, id);
      const { isValid, message } = await ValidationService.execute(
        code,
        input,
        lang,
        id
      );
      if (!isValid) {
        throw {
          message
        };
      }

      //writing the code,input  files
      const { file, inputFile } = await this.writeFile(code, lang, input, id);

      //write command
      const { runCode, runContainer } = await this.writeCommand(
        lang,
        file,
        inputFile,
        id,
        code
      );

      //executing the file
      const OUTPUT = await this.execChild(
        runCode,
        runContainer,
        id,
        file,
        inputFile,
        lang,
        code
      );

      if (OUTPUT) {
        console.log('output', OUTPUT.toString());
        return OUTPUT.toString();
      }
    } catch (error) {
      throw error;
    }
  }

  async writeFile(code, lang, input, id) {
    let fileName = `${id}code`;
    switch (lang) {
      case 'javascript': {
        fileName += '.js';
        break;
      }
      case 'cpp': {
        fileName += '.cpp';
        break;
      }
      case 'python': {
        fileName += '.py';
        break;
      }
      case 'java': {
        fileName += '.java';
        break;
      }
      case 'c': {
        fileName += '.c';
        break;
      }
      default: {
        throw { message: 'Invalid language' };
      }
    }
    const write = util.promisify(fs.writeFile);

    try {
      await write(path.join(SOURCE_DIR, fileName), code);
      await write(path.join(SOURCE_DIR, `${id}input.txt`), input);
      return {
        file: fileName,
        inputFile: `${id}input.txt`
      };
    } catch (error) {
      throw { message: error };
    }
  }

  async writeCommand(lang, file, input, id, code) {
    let command = '';
    switch (lang) {
      case 'javascript': {
        command = `cd ${TARGET_DIR} && node ${file} < ${input}`;
        break;
      }
      case 'cpp': {
        command = `cd ${TARGET_DIR} && g++ -o ${id} ${file} && ./${id} < ${input}`;
        break;
      }
      case 'python': {
        command = `cd ${TARGET_DIR} && python ${file} < ${input}`;
        break;
      }
      case 'java': {
        let className = await this.extractJavaClassName(code);
        className = className.split(/\s/).join('');
        console.log('class ', className);
        command = `cd ${TARGET_DIR} && javac ${file} && java ${className} < ${input}`;
        break;
      }
      case 'c': {
        command = `cd ${TARGET_DIR} && gcc -o ${id} ${file} && ./${id} < ${input}`;
        break;
      }
      default: {
        throw { message: 'Invalid language' };
      }
    }

    const containerName = `${id}container`;

    const runCode = `docker exec ${containerName} sh -c "${command}"`;

    const runContainer = `docker run -it -d --name ${containerName} -v ${VOL_NAME}:${TARGET_DIR} ${IMAGE_NAME}`;

    return { runCode, runContainer };
  }

  async execChild(runCode, runContainer, id, file, inputFile, lang, code) {
    return new Promise((resolve, reject) => {
      const execCont = exec(`${runContainer}`);
      execCont.on('error', err => {
        throw { status: '404', message: err };
      });
      execCont.stdout.on('data', () => {
        exec(`${runCode}`, async (error, stdout, stderr) => {
          await this.endContainer(id);
          await this.deleteFiles(file, inputFile, lang, id, code);
          if (stderr) {
            reject({ message: stderr });
          } else {
            resolve(stdout);
          }
        });
      });
    });
  }

  async deleteFiles(fileName, inputName, lang, id, code) {
    fs.unlinkSync(path.join(SOURCE_DIR, fileName), err => {
      if (err) throw { message: err };
    });
    if (inputName) {
      fs.unlinkSync(path.join(SOURCE_DIR, inputName), err => {
        if (err) throw { message: err };
      });
    }
    if (lang == 'cpp' || lang == 'c') {
      if (fs.existsSync(path.join(SOURCE_DIR, id)))
        fs.unlinkSync(path.join(SOURCE_DIR, id), err => {
          if (err) throw err;
        });
    }
    if (lang == 'java') {
      let className = await this.extractJavaClassName(code);
      className = className.split(/\s/).join('');
      console.log('delete', className);
      if (fs.existsSync(path.join(SOURCE_DIR, `${className}.class`)))
        fs.unlinkSync(path.join(SOURCE_DIR, `${className}.class`), err => {
          if (err) throw err;
        });
    }
  }

  async endContainer(id) {
    const containerName = `${id}container`;
    const exit = `docker stop ${containerName} && docker rm ${containerName}`;
    exec(`${exit}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else console.log('Container stoped and deleted');
    });
  }

  async extractJavaClassName(s) {
    let prefix = 'class';
    let suffix = '{';
    let i = s.indexOf(prefix);
    if (i >= 0) {
      s = s.substring(i + prefix.length);
    } else {
      return '';
    }
    if (suffix) {
      i = s.indexOf(suffix);
      if (i >= 0) {
        s = s.substring(0, i);
      } else {
        return '';
      }
    }
    return s;
  }
}

export default new CodeService();

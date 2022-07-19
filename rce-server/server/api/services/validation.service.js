class ValidationService {
  async execute(code, input, lang, id) {
    // console.log("validating");
    switch (lang) {
      case "javascript": {
        let words = ["require(", "import", "exports.", "module.exports"];
        // prevent imports
        var valid = !words.some((el) => {
          return code.includes(el);
        });
        return {
          isValid: valid,
          message: "You have unacceptable libs imported",
        };
      }
      case "python": {
        let reg1 = RegExp(
          /\bimport\W+(?:\w+\W+){0,}(?:os|subprocess|importlib)\b/g
        );
        let words = ["open("];

        if (code.match(reg1)) {
          return {
            isValid: false,
            message: "You have unacceptable libs imported",
          };
        } else if (
          words.every((el) => code.toLowerCase().includes(el.toLowerCase()))
        ) {
          return {
            isValid: false,
            message: "You have unacceptable libs imported",
          };
        }
        return {
          isValid: true,
        };
      }
      case "java": {
        return {
          isValid: true,
        };
      }
      case "cpp": {
        return {
          isValid: true,
        };
      }
      case "c": {
        return {
          isValid: true,
        };
      }
      default: {
        return {
          isValid: false,
          message: "Please select a valid language",
        };
      }
    }
  }
}

export default new ValidationService();

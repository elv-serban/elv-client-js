// code related to loading / parsing JSON
const {JSONPath} = require("jsonpath-plus");

const {readFile, stringOrFileContents} = require("../helpers");

const Logger = require("./Logger");

const blueprint = {
  name: "JSON",
  concerns: [Logger]
};

// prevent loss of access to built-in JSON methods
// when a file includes "const JSON = require("concerns/JSON");"
const parse = JSON.parse;
const stringify = JSON.stringify;


const jPath = ({pattern, metadata}) => {
  return JSONPath({
    json: metadata,
    path: pattern,
    wrap: false
  });
};


const New = (context) => {
  const logger = context.concerns.Logger;
  const cwd = context.cwd;

  const parseFile = (pathStr) => parseString(readFile(pathStr, cwd, logger));

  const parseStringOrFile = (str) => parseString(stringOrFileContents(str, cwd, logger));

  const parseString = (str) => {
    let parsed;
    try {
      parsed = JSON.parse(str);
    } catch(e) {
      logger.error("Failed to parse JSON");
      throw e;
    }
    return parsed;
  };

  return {parse, parseFile, parseString, parseStringOrFile, stringify};
};

module.exports = {
  blueprint,
  jPath,
  New,
  parse,
  stringify
};
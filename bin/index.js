#!/usr/bin/env node
const fs = require("fs");

const colors = require("colors");
const greet = require("../lib/greet");
const fileExtension = require("file-extension");
const cliSelect = require("cli-select");
const chalk = require("chalk");

// get arguments after first two elements in process.argv
let arguments = process.argv.splice(2);

// check if user want language specific greeting
// default value of language is `null`
let lang = null;

// check if first argument is `--lang`
if (arguments[0] == "--lang") {
  // set second argument as language.
  lang = arguments[1];
}

// if `lang` is empty, then show random greeting
if (lang) {
  // print random greeting
  console.log(
    // wraps text with rainbow color formatting
    colors.rainbow(
      // returns the greeting text with specified language
      greet.greet(lang)
    )
  );
  cliSelect({
    values: fs.readdirSync(process.cwd()),
    valueRenderer: (value, selected) => {
      if (selected) {
        return chalk.underline.green(value);
      }

      return value;
    }
  }).then(selected => {
    console.log(`You selected this one: ${chalk.red(selected.value)}`);
  });
} else {
  // print random greeting
  console.log(
    // wraps text with rainbow color formatting
    colors.rainbow(
      // returns the random greeting text
      greet.greetRandom()
    ),
    "hello"
  );
}

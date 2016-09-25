# phonenumber
Command line interface in node for checking validity of a number

## Installation

1. Clone the repository and change directory to the folder.
2. Run `npm install` to install all dependencies.
3. Run `sudo npm link` to link the package.

## How to use it?

1. Run `phonenumber -p [YourNumber]` to validate the number.
2. Run `phonenumber` and enter number in the field prompted.

## Flags available

```
Usage: phonenumber -p [num]

Options:
  -p, --phone  Phone number to be validated                             [string]
  -h, --help   Show help                                               [boolean]
```

## Dependencies

* inquirer - For prompting questions and getting inputs.
* yargs - For parsing command line flags and inputs.

## Read `man` pages

`man phonenumber`
# wikiterm
Command line interface in Python for logging Wikipedia Links

## How to use it?

1. Run `wikiterm -s [SearchTerm] -f [FileName]` to validate the number.
2. Run `wikiterm` and enter inputs in the fields prompted.

## Install dependencies

Run `pip install -r requirements.txt` from root folder to install all dependencies.

## Flags available

```
Usage: cli.py [OPTIONS]

  Programs that gets link of particular topic from wikipedia and logs it to
  provided file

Options:
  --search TEXT  Term that needs to be searched.
  --file TEXT    File name for logging the links.
  --help         Show this message and exit.

```

## Dependencies

* "click" - For parsing command line arguments
* "requests" - For making HTTP requests

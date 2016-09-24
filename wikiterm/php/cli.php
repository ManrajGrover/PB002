#!/usr/bin/env php
<?php
require_once 'vendor/autoload.php';
require_once 'constants.php';
require_once 'functions.php';

$wikiterm = new Commando\Command();

$wikiterm->option('s')
  ->aka('search')
  ->describedAs('Term that needs to be searched');

$wikiterm->option('f')
  ->aka('file')
  ->describedAs('Path or file name for logging');

$search_term = $wikiterm['search'];
$log_filename = $wikiterm['file'];

if ($search_term == NULL) {
  echo "Please enter a search term: ";
  $search_term = getInput();
  echo "Please enter file name to log: ";
  $log_filename = getInput();
  logLinks($search_term, $log_filename);
}
else {
  logLinks($search_term, $log_filename);
}

?>

<?php
/**
 * @return String
 */
function getInput() {
  $handle = fopen ("php://stdin","r");
  $input = fgets($handle);
  return trim($input);
}

/**
 * @param  String $search_term Term to be searched on Wikipedia
 * @param  String $filename    Name of file where link needs to be logged
 * @return null
 */
function logLinks($search_term, $filename = NULL) {
  $params = array(
    "action"=> "opensearch",
    "format" => "json",
    "namespace" => 0,
    "limit" => 1,
    "profile" => "fuzzy",
    "search" => $search_term
  );

  $url = API_URL."?".http_build_query($params);
  $response = file_get_contents($url);
  $response = json_decode($response);

  if (sizeof($response[3]) == 0) {
    die("No link found!");
  }

  $file = fopen($filename, "a") or die("Unable to open file!");
  fwrite($file, $response[3][0]."\n");
  fclose($file);

  echo "Link logged!\n";
}
?>

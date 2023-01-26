<?php
require 'vendor/autoload.php';
$httpClient = new \GuzzleHttp\Client();

$url = "https://www.jw.org/en/library/books/2022-Service-Year-Report-of-Jehovahs-Witnesses-Worldwide/2022-Country-and-Territory-Reports/";

$response = $httpClient->get($url);

$htmlString = (string) $response->getBody();

//add this line to suppress any warnings
libxml_use_internal_errors(true);

$doc = new DOMDocument();
$doc->loadHTML($htmlString);
$xpath = new DOMXPath($doc);

/*$columnCells = $xpath->query('//div[@id="section1"]//table//thead//tr//th');
$columns     = [];

foreach ($columnCells as $column) {
  $columns[] = trim($column->textContent);
}

var_dump($columns);*/

$tableRows = $xpath->query('*/div[@id="section1"]//table//tbody//tr');
$rows     = [];

var_dump($tableRows);

foreach ($tableRows as $row) {
  $rowCells = $xpath->evaluate('td', $row);
  $row = [];
  
  var_dump($row);

  foreach ($rowCells as $key => $cell) {
    echo $key . PHP_EOL;
    echo $cell->textContent . PHP_EOL;
    
    $row[$columns[$key]] = trim($cell->textContent);
  }

  $rows[] = $row;
}

var_dump($rows);

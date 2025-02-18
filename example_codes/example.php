<?php
// Przykładowy kod PHP
$zmienna = 10;

function funkcja($x) {
    if ($x > 0) {
        return $x * $x;
    } else {
        return 0;
    }
}

for ($i = 0; $i < 5; $i++) {
    echo "Kwadrat $i to " . funkcja($i) . "<br>";
}

if ($zmienna == 10) {
    echo "Zmienna ma wartość 10<br>";
}

class MojaKlasa {
    private $x;

    public function __construct($x) {
        $this->x = $x;
    }

    public function metoda() {
        if ($this->x > 10) {
            echo "Wartość x: $this->x<br>";
        } else {
            echo "x jest mniejsze lub równe 10<br>";
        }
    }
}

$obiekt = new MojaKlasa(20);
$obiekt->metoda();

try {
    $result = 10 / 0;
} catch (DivisionByZeroError $e) {
    echo "Błąd: dzielenie przez zero<br>";
}
?>

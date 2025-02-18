// Przykładowy kod JavaScript
let zmienna = 10;
const stala = 20;

function funkcja(x) {
    if (x > 0) {
        return x * x;
    } else {
        return 0;
    }
}

for (let i = 0; i < 5; i++) {
    console.log(`Kwadrat ${i} to ${funkcja(i)}`);
}

if (zmienna === 10) {
    console.log("Zmienna ma wartość 10");
}

class MojaKlasa {
    constructor(x) {
        this.x = x;
    }

    metoda() {
        if (this.x > 10) {
            console.log(`Wartość x: ${this.x}`);
        } else {
            console.log("x jest mniejsze lub równe 10");
        }
    }
}

const obiekt = new MojaKlasa(20);
obiekt.metoda();

try {
    console.log(10 / 0);
} catch (error) {
    console.error("Błąd: dzielenie przez zero");
}

document.body.innerHTML += "<h1>Dodano element do DOM</h1>";

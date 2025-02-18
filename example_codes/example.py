# Przykładowy kod Python
import math

zmienna = 10

def funkcja(x):
    if x > 0:
        return x * x
    else:
        return 0

for i in range(5):
    print(f"Kwadrat {i} to {funkcja(i)}")

if zmienna == 10:
    print("Zmienna jest równa 10")

i = 0
while i < 5:
    print(i)
    i += 1

class MojaKlasa:
    def __init__(self, x):
        self.x = x
    
    def metoda(self):
        if self.x > 10:
            print(f"Wartość x: {self.x}")
        else:
            print("x jest mniejsze lub równe 10")

obiekt = MojaKlasa(20)
obiekt.metoda()

try:
    print(10 / 0)
except ZeroDivisionError:
    print("Błąd: dzielenie przez zero")

lista = [funkcja(i) for i in range(5)]
print(lista)

// Przykładowy kod Java
import java.util.ArrayList;

public class example {
    private static int zmienna = 10;

    public static int funkcja(int x) {
        if (x > 0) {
            return x * x;
        } else {
            return 0;
        }
    }

    public static class MojaKlasa {
        private int x;

        public MojaKlasa(int x) {
            this.x = x;
        }

        public void metoda() {
            if (this.x > 10) {
                System.out.println("Wartosc x: " + this.x);
            } else {
                System.out.println("x jest mniejsze lub rowne 10");
            }
        }
    }

    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("Kwadrat " + i + " to " + funkcja(i));
        }
        
        if (zmienna == 10) {
            System.out.println("Zmienna wynosi 10");
        }

        try {
            int result = 10 / 0;
            System.out.println(result + zmienna);
        } catch (ArithmeticException e) {
            System.out.println("Blad: dzielenie przez zero");
        }

        MojaKlasa obiekt = new MojaKlasa(20);
        obiekt.metoda();

        ArrayList<Integer> lista = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            lista.add(funkcja(i));
        }
        System.out.println(lista);
    }
}

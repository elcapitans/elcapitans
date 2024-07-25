package Application;

import java.util.Scanner;

public class Application {
    private int total;

    public void run() {
        this.total = 0;

        Scanner scanner = new Scanner(System.in);
        String menuSelection;
        do {
            mainMenu();
            menuSelection = scanner.nextLine();
            if (menuSelection.equals("1")) {
                diceSelectionMenu(scanner);
            } else if (menuSelection.equals("2")) {
                System.out.println("Thank you for using Dice Roller. Goodbye!");
            } else {
                System.out.println("Invalid selection.");
            }
        } while (!menuSelection.equals("2"));
        scanner.close();
    }

    public int getTotal() {
        return this.total;
    }

    public void resetTotal() {
        this.total = 0;
    }

    private void mainMenu() {
        System.out.println(" ");
        System.out.println(" _____   _                ______       _ _                 ");
        System.out.println("(_____\\ (_)              (_____ \\     | | |                 -------        /\\");
        System.out.println(" _   \\ \\ _  ____ _____    _____) )___ | | | _____  ____    | ●    ● |     /  \\   ");
        System.out.println("| |   | | |/ ___) ___ |  |  __  // _ \\| | || ___ |/ ___)   |    ●   |    /    \\ ");
        System.out.println("| |__/ /| ( (___| ____|  | |  \\ \\ |_| | | || ____| |       | ●    ● |   /   4  \\");
        System.out.println("|_____/ |_|\\____)_____)  |_|   |_\\___/ \\_)_)_____)_|        -------    /________\\");
        System.out.println("");
        System.out.println("(1) Choose Your Die!");
        System.out.println("(2) Don't Choose Your Die And Exit!");
    }

    private void diceSelectionMenu(Scanner scanner) {
        System.out.println("(D4) D4   (4  sided)");
        System.out.println("(D6) D6   (6  sided)");
        System.out.println("(D8) D8   (8  sided)");
        System.out.println("(D10) D10  (10 sided)");
        System.out.println("(D12) D12  (12 sided)");
        System.out.println("(D20) D20  (20 sided)");
        System.out.println("(7) Back To Main Menu And Reset Running Total");

        String diceSelection;
        do {
            diceSelection = scanner.nextLine();
            if (diceSelection.equalsIgnoreCase("D4")) {
                total += roll4SidedDie();
            } else if (diceSelection.equalsIgnoreCase("D6")) {
                total += roll6SidedDie();
            } else if (diceSelection.equalsIgnoreCase("D8")) {
                total += roll8SidedDie();
            } else if (diceSelection.equalsIgnoreCase("D10")) {
                total += roll10SidedDie();
            } else if (diceSelection.equalsIgnoreCase("D12")) {
                total += roll12SidedDie();
            } else if (diceSelection.equalsIgnoreCase("D20")) {
                total += roll20SidedDie();
            } else if (diceSelection.equals("7")) {
                resetTotal();
                break;
            } else {
                System.out.println("Invalid selection.");
            }
            System.out.println("Running total: " + getTotal());
        } while (!diceSelection.equals("7"));
    }

    public int roll4SidedDie() {
        int d4Roll = (int) ((Math.random() * 4) + 1); // 1-4
        System.out.println("Your roll is " + d4Roll);
        return d4Roll;
    }

    public int roll6SidedDie() {
        int d6Roll = (int) ((Math.random() * 6) + 1); // 1-6
        System.out.println("Your roll is " + d6Roll);
        return d6Roll;
    }

    public int roll8SidedDie() {
        int d8Roll = (int) ((Math.random() * 8) + 1); // 1-8
        System.out.println("Your roll is " + d8Roll);
        return d8Roll;
    }

    public int roll10SidedDie() {
        int d10Roll = (int) ((Math.random() * 10) + 1); // 1-10
        System.out.println("Your roll is " + d10Roll);
        return d10Roll;
    }

    public int roll12SidedDie() {
        int d12Roll = (int) ((Math.random() * 12) + 1); // 1-12
        System.out.println("Your roll is " + d12Roll);
        return d12Roll;
    }

    public int roll20SidedDie() {
        int d20Roll = (int) ((Math.random() * 20) + 1); // 1-20
        System.out.println("Your roll is " + d20Roll);
        return d20Roll;
    }

    public static void main(String[] args) {
        Application app = new Application();
        app.run();
    }
}

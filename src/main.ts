// ---------- Function 1: initializeSeats ----------
function initializeSeats(rows: number, columns: number): number[][] {
  // Builds a matrix representing the theater, all seats start empty (0)
  const theaterRoom: number[][] = [];
  let row = 0;
  while (row < rows) {
    const rowSeats: number[] = [];
    let seat = 0;
    while (seat < columns) {
      rowSeats.push(0);
      seat += 1;
    }
    theaterRoom.push(rowSeats);
    row += 1;
  }
  return theaterRoom;
}

// ---------- Function 2: displaySeats ----------
function displaySeats(theaterRoom: number[][]): void {
  // Prints the seating matrix to the console with row/column numbers
  // X = occupied, L = available
  let header = "   ";
  for (let col = 0; col < theaterRoom[0].length; col++) {
    header += col + " ";
  }
  console.log(header);
  let row = 0;
  while (row < theaterRoom.length) {
    let rowText = row + "  ";
    let seat = 0;
    while (seat < theaterRoom[row].length) {
      rowText += theaterRoom[row][seat] === 1 ? "X " : "L ";
      seat += 1;
    }
    console.log(rowText);
    row += 1;
  }
}

// ---------- Function 3: reserveSeat ----------
function reserveSeat(theaterRoom: number[][], row: number, col: number): string {
  // Reserves a seat if available, returns a message either way
  if (theaterRoom[row][col] === 1) {
    return "Seat already taken";
  } else {
    theaterRoom[row][col] = 1;
    return "Reservation confirmed";
  }
}

// ---------- Function 4: freeSeat ----------
function freeSeat(theaterRoom: number[][], row: number, col: number): string {
  // Frees a seat if occupied, returns a message either way
  if (theaterRoom[row][col] === 0) {
    return "That seat is already available";
  } else {
    theaterRoom[row][col] = 0;
    return "Seat is now free";
  }
}

// ---------- Function 5: countSeats ----------
function countSeats(theaterRoom: number[][]): { occupied: number; available: number } {
  // Counts occupied and available seats across the whole room
  let occupied = 0;
  let available = 0;
  let row = 0;
  while (row < theaterRoom.length) {
    let seat = 0;
    while (seat < theaterRoom[row].length) {
      if (theaterRoom[row][seat] === 1) {
        occupied += 1;
      } else {
        available += 1;
      }
      seat += 1;
    }
    row += 1;
  }
  return { occupied: occupied, available: available };
}

// ---------- Function 6: findAdjacentSeats ----------
function findAdjacentSeats(theaterRoom: number[][]): string {
  // Searches for the first pair of two adjacent available seats in the same row
  let row = 0;
  while (row < theaterRoom.length) {
    let seat = 0;
    while (seat < theaterRoom[row].length - 1) {
      if (theaterRoom[row][seat] === 0 && theaterRoom[row][seat + 1] === 0) {
        return "Adjacent seats found at row " + row + ", columns " + seat + " and " + (seat + 1);
      }
      seat += 1;
    }
    row += 1;
  }
  return "No adjacent seats available";
}

// ---------- Testing & Output: run the 4 required scenarios automatically ----------
function runRequiredTests(): void {
  console.log("\n=== Scenario 1: Empty room (all seats available) ===");
  const room1 = initializeSeats(8, 10);
  displaySeats(room1);
  console.log(countSeats(room1));
  console.log(findAdjacentSeats(room1));

  console.log("\n=== Scenario 2: Partially filled room ===");
  const room2 = initializeSeats(8, 10);
  console.log(reserveSeat(room2, 0, 1));
  console.log(reserveSeat(room2, 0, 4));
  console.log(reserveSeat(room2, 3, 5));
  console.log(reserveSeat(room2, 5, 2));
  displaySeats(room2);
  console.log(countSeats(room2));
  console.log(findAdjacentSeats(room2));

  console.log("\n=== Scenario 3: Nearly full room with only scattered single seats ===");
  const room3 = initializeSeats(8, 10);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 10; c++) {
      room3[r][c] = 1;
    }
  }
  room3[2][4] = 0;
  room3[5][8] = 0;
  room3[7][0] = 0;
  displaySeats(room3);
  console.log(countSeats(room3));
  console.log(findAdjacentSeats(room3));

  console.log("\n=== Scenario 4: Full room (no seats available) ===");
  const room4 = initializeSeats(8, 10);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 10; c++) {
      room4[r][c] = 1;
    }
  }
  displaySeats(room4);
  console.log(countSeats(room4));
  console.log(findAdjacentSeats(room4));

  console.log("\n=== Testing reserveSeat validation ===");
  const room5 = initializeSeats(8, 10);
  console.log(reserveSeat(room5, 2, 3));
  console.log(reserveSeat(room5, 2, 3));
  console.log("=== All required test scenarios complete ===\n");
}

// ---------- Interactive CLI Menu ----------
import chalk from "chalk";
import { createInterface } from "readline/promises";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu(): void {
  console.log(chalk.bold.cyan("\nCINEMA SEAT MANAGER"));
  console.log(chalk.gray("=".repeat(30)));
  console.log(chalk.yellow("1.") + " Check available seats");
  console.log(chalk.yellow("2.") + " Reserve a seat");
  console.log(chalk.yellow("3.") + " Free a seat");
  console.log(chalk.yellow("4.") + " Count occupied/available");
  console.log(chalk.yellow("5.") + " Find adjacent seats");
  console.log(chalk.yellow("6.") + " Save & quit");
  console.log(chalk.gray("=".repeat(30)));
}

async function main(): Promise<void> {
  // Run the rubric-required automated scenarios first
  runRequiredTests();

  // Then launch the interactive menu for manual exploration
  let running = true;
  const theaterRoom = initializeSeats(8, 10);

  while (running) {
    showMenu();
    const choice = await rl.question(chalk.green("\nChoose an option [1-6]: "));

    switch (choice.trim()) {
      case "1":
        displaySeats(theaterRoom);
        await rl.question(chalk.dim("Press ENTER to continue..."));
        break;

      case "2": {
        const rowInput = await rl.question(chalk.green("Enter row (0-7): "));
        const colInput = await rl.question(chalk.green("Enter column (0-9): "));
        console.log(reserveSeat(theaterRoom, Number(rowInput), Number(colInput)));
        await rl.question(chalk.dim("Press ENTER to continue..."));
        break;
      }

      case "3": {
        const rowInput = await rl.question(chalk.green("Enter row (0-7): "));
        const colInput = await rl.question(chalk.green("Enter column (0-9): "));
        console.log(freeSeat(theaterRoom, Number(rowInput), Number(colInput)));
        await rl.question(chalk.dim("Press ENTER to continue..."));
        break;
      }

      case "4": {
        const counts = countSeats(theaterRoom);
        console.log(chalk.cyan(`\nOccupied: ${counts.occupied} | Available: ${counts.available}`));
        await rl.question(chalk.dim("Press ENTER to continue..."));
        break;
      }

      case "5":
        console.log(chalk.cyan(`\n${findAdjacentSeats(theaterRoom)}`));
        await rl.question(chalk.dim("Press ENTER to continue..."));
        break;

      case "6":
        console.log(chalk.green("\nGoodbye!"));
        running = false;
        break;

      default:
        console.log(chalk.red("\nInvalid option. Choose 1-6."));
        await rl.question(chalk.dim("Press ENTER to continue..."));
        break;
    }
  }

  rl.close();
}

main();

export { };

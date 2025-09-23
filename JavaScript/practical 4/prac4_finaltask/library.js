// ------------------- Part 1 -------------------
// Function Declaration: Compare two books
function getThickerBook(pages1, pages2) {
    return pages1 > pages2 ? pages1 : pages2;
}

// Function Expression: Factorial (for ticket ID)
const bookFactorial = function(num) {
    if (num < 0) return "Error: Factorial not defined for negative numbers";
    return num <= 1 ? 1 : num * bookFactorial(num - 1);
};

// Arrow Function: Check if note contains "Library"
const checkLibraryNote = (note) => note.includes("Library");

// Closure: Secret Shelf with password protection
function secretShelf(password) {
    const rareNote = "(Rare Book Note)";
    return function(givenPassword) {
        if (givenPassword === password) {
            return rareNote;
        } else {
            return "Access Denied";
        }
    };
}

// Scope Demonstration
let libraryName = "City Smart Library"; // Global
function scopeDemo() {
    let bookCount = 5000; // Function scope
    if (true) {
        let tempBorrowedBooks = 120; // Block scope
        console.log("Block Scope:", tempBorrowedBooks);
    }
    console.log("Function Scope:", bookCount);
}
console.log("Global Scope:", libraryName);
scopeDemo();

// ------------------- Part 2 -------------------
// Reverse ISBN with Error Handling
function reverseISBN(isbn) {
    try {
        if (typeof isbn !== "number" || isNaN(isbn)) {
            throw new Error("Invalid ISBN input");
        }
        let sign = Math.sign(isbn);
        let reversed = parseInt(Math.abs(isbn).toString().split("").reverse().join(""));
        return sign * reversed;
    } catch (err) {
        return "Error: " + err.message;
    }
}

// Check if Book ID is Palindrome (number)
function isBookIdPalindrome(id) {
    let str = id.toString();
    let reversed = str.split("").reverse().join("");
    return str === reversed;
}

// Check if Book Title is Palindrome (ignore spaces & case)
function isTitlePalindrome(title) {
    let clean = title.toLowerCase().replace(/\s+/g, "");
    let reversed = clean.split("").reverse().join("");
    return clean === reversed;
}

// Square Root with Error Handling
function sqrtPages(pages) {
    try {
        if (typeof pages !== "number" || isNaN(pages)) {
            throw new Error("Invalid input");
        }
        if (pages < 0) {
            throw new Error("Negative numbers not allowed");
        }
        return Math.sqrt(pages);
    } catch (err) {
        return "Error: " + err.message;
    }
}

// Prime Number Checker with Arrow Function
const isPrimeShelf = (num) => {
    try {
        if (typeof num !== "number" || num < 2) throw new Error("Invalid input");
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    } catch (err) {
        return "Error: " + err.message;
    }
};

// ------------------- Final Integration -------------------
function showMenu() {
    console.log("\n=== Smart Library Management System ===");
    console.log("1. Compare two books (pages)");
    console.log("2. Generate factorial-based ticket ID");
    console.log("3. Check if a note contains the word 'Library'");
    console.log("4. Secret shelf (closure)");
    console.log("5. Reverse ISBN & check if palindrome");
    console.log("6. Check if book title is a palindrome");
    console.log("7. Square root of total pages (error handling)");
    console.log("8. Check if shelf number is prime");
    console.log("0. Exit");
}

// Example Simulation (Menu-driven with sample inputs)
function runDemo() {
    showMenu();

    console.log("\nOption 1:", getThickerBook(120, 350)); 
    console.log("Option 2:", bookFactorial(5)); 
    console.log("Option 3:", checkLibraryNote("This Library is digital.")); 
    
    const shelf = secretShelf("abcd");
    console.log("Option 4 (wrong pw):", shelf("xyz"));
    console.log("Option 4 (correct pw):", shelf("abcd"));

    let isbn = -9876;
    console.log("Option 5: Reversed ISBN:", reverseISBN(isbn), 
                "Palindrome?", isBookIdPalindrome(Math.abs(isbn)));

    console.log("Option 6:", isTitlePalindrome("Level")); 
    console.log("Option 7:", sqrtPages(-400)); 
    console.log("Option 8:", isPrimeShelf(13)); 
}

runDemo();

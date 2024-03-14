export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }
  if (query.toLowerCase().includes("andrew id")) {
    return (
      "feiyangx is the Andrew ID of the author of this page. "
    );
  }
  if (query.toLowerCase().includes("name")) {
    return (
      "feiyangx2"
    );
  }
  if (query.toLowerCase().includes("largest")) {
    const matches = query.match(/\d+/g); // Find all numbers in the query
    if (matches) {
      const numbers = matches.map(Number); // Convert all found strings to numbers
      const largest = Math.max(...numbers); // Find the largest number
      return largest.toString(); // Return the largest number as a string
    }
  }

  // Handling simple arithmetic expressions
  if (query.toLowerCase().includes("plus")) {
    // Attempt to extract numbers before and after the word "plus"
    const parts = query.match(/(\d+)\s+plus\s+(\d+)/i);
    if (parts && parts.length === 3) { // Check if the match was successful and we have the correct parts
      const num1 = parseInt(parts[1], 10); // First number
      const num2 = parseInt(parts[2], 10); // Second number
      return (num1 + num2).toString(); // Perform the addition and return the result as a string
    }
  }

  if (query.toLowerCase().includes("multiplied by")) {
    // Attempt to extract numbers around the phrase "multiplied by"
    const parts = query.match(/(\d+)\s+multiplied by\s+(\d+)/i);
    if (parts && parts.length === 3) { // Ensure the match was successful and the correct parts were found
      const num1 = parseInt(parts[1], 10); // First number involved in multiplication
      const num2 = parseInt(parts[2], 10); // Second number involved in multiplication
      return (num1 * num2).toString(); // Perform the multiplication and return the result as a string
    }
  }

  if (query.startsWith("Which of the following numbers is both a square and a cube:")) {
    // Extract the numbers from the query
    const numbersInQuery = query.match(/\d+/g); // This matches any sequence of digits
    if (numbersInQuery) {
      const numbers = numbersInQuery.map(Number); // Convert found strings to numbers
      const validNumbers = numbers.filter(number => {
        // Calculate the sixth root and check if it's an integer by comparing it to its floor value
        const sixthRoot = Math.pow(number, 1/6);
        return sixthRoot === Math.floor(sixthRoot);
      });

      // Prepare the response
      return validNumbers.length > 0
        ? `The number(s) that is both a square and a cube: ${validNumbers.join(", ")}`
        : "None of the provided numbers are both a square and a cube.";
    }
  }

  return "";
}

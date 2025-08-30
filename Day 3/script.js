function calculateGrade(score) {
  if (score >= 90 && score <= 100) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else if (score >= 0) {
    return "F";
  } else {
    return "Invalid Score";
  }
}

// Testing with some sample scores
console.log("Score 95 → Grade:", calculateGrade(95)); // A
console.log("Score 82 → Grade:", calculateGrade(82)); // B
console.log("Score 74 → Grade:", calculateGrade(74)); // C
console.log("Score 61 → Grade:", calculateGrade(61)); // D
console.log("Score 45 → Grade:", calculateGrade(45)); // F
console.log("Score -5 → Grade:", calculateGrade(-5)); // Invalid Score
console.log("Score 105 → Grade:", calculateGrade(105)); // Invalid Score
console.log("Score 100 -> Grade:",calculateGrade(100));//A+
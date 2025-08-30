// Step 1: Create an array of skill objects
const skills = [
  { name: "HTML", proficiency: "Intermediate" },
  { name: "CSS", proficiency: "Advanced" },
  { name: "JavaScript", proficiency: "Beginner" },
  { name: "Python", proficiency: "Intermediate" }
];

// Step 2: Function to transform skill objects
function formatSkills(skillArray) {
  return skillArray.map(skill => `${skill.name} (${skill.proficiency})`);
}

const formattedSkills = formatSkills(skills);
console.log(formattedSkills);
// Step 3: Function to filter skills by proficiency level
function filterSkillsByProficiency(skillArray, level) {
  return skillArray.filter(skill => skill.proficiency === level);
}
const advancedSkills = filterSkillsByProficiency(skills, "Advanced");
console.log(advancedSkills);

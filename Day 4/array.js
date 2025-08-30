const Skills = ["HTML", "CSS", "JS", "React", "Node", "Python"];
for (let i = 0; i < Skills.length; i++) {
    console.log("Skill "+( i+1)+":"+Skills[i]);
}
const skillandproficiency = [
    { skill: "HTML", proficiency: 10 },
    { skill: "CSS", proficiency: 9 },
    { skill: "JS", proficiency: 8 },
    { skill: "React", proficiency: 8 },
    { skill: "Node", proficiency: 7 },
];
for (let i = 0; i < skillandproficiency.length; i++) {
    console.log(
        `Skill ${i + 1}: ${skillandproficiency[i].skill}, Proficiency: ${skillandproficiency[i].proficiency}`
    );
}

/ Grade Scale Map
const gradeScale = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
};

// Course Type Weight Boosts
const weightBoosts = {
    'regular': 0.0,
    'honors': 0.5,
    'ap': 1.0
};

// Initialize Calculator with 3 rows
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 3; i++) {
        addCourseRow();
    }
});

// Tab Switching Logic
function switchTab(tabName) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tool-card').forEach(card => card.style.display = 'none');

    document.getElementById(tab-${tabName}).style.display = 'block';
    event.target.classList.add('active');
}

// Add Dynamic Row for GPA
function addCourseRow() {
    const list = document.getElementById('courses-list');
    const row = document.createElement('div');
    row.className = 'course-row';
    row.innerHTML = `
        <input type="text" placeholder="e.g. Mathematics">
        <select class="grade-select">
            <option value="A">A (93-100%)</option>
            <option value="A-">A- (90-92%)</option>
            <option value="B+">B+ (87-89%)</option>
            <option value="B">B (83-86%)</option>
            <option value="B-">B- (80-82%)</option>
            <option value="C+">C+ (77-79%)</option>
            <option value="C">C (73-76%)</option>
            <option value="D">D (65-72%)</option>
            <option value="F">F (&lt;65%)</option>
        </select>
        <input type="number" class="credits-input" value="3" min="1" max="6">
        <select class="type-select">
            <option value="regular">Regular</option>
            <option value="honors">Honors (+0.5)</option>
            <option value="ap">AP / IB (+1.0)</option>
        </select>
        <button class="remove-btn" onclick="this.parentElement.remove()">&times;</button>
    `;
    list.appendChild(row);
}

// Calculate GPA Logic
function calculateGPA() {
    const rows = document.querySelectorAll('.course-row');
    let totalUnweightedPoints = 0;
    let totalWeightedPoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
        const grade = row.querySelector('.grade-select').value;
        const credits = parseFloat(row.querySelector('.credits-input').value) || 0;
        const type = row.querySelector('.type-select').value;

        if (credits > 0 && gradeScale[grade] !== undefined) {
            const basePoints = gradeScale[grade];
            const boost = weightBoosts[type];

            totalUnweightedPoints += basePoints * credits;
            totalWeightedPoints += (basePoints + boost) * credits;
            totalCredits += credits;
        }
    });

    if (totalCredits === 0) return;

    const unweightedGPA = (totalUnweightedPoints / totalCredits).toFixed(2);
    const weightedGPA = (totalWeightedPoints / totalCredits).toFixed(2);

    document.getElementById('unweighted-gpa').textContent = unweightedGPA;
    document.getElementById('weighted-gpa').textContent = weightedGPA;
    
    let message = "Keep pushing! Good academic progress.";
    if (unweightedGPA >= 3.8) message = "🌟 Outstanding performance! Dean's List caliber.";
    else if (unweightedGPA >= 3.0) message = "👍 Solid academic standing.";
    
    document.getElementById('gpa-message').textContent = message;
    document.getElementById('gpa-result').style.display = 'block';
}

// Calculate Final Exam Needed Grade
function calculateFinalGrade() {
    const current = parseFloat(document.getElementById('current-grade').value);
    const target = parseFloat(document.getElementById('target-grade').value);
    const weight = parseFloat(document.getElementById('final-weight').value) / 100;

    if (isNaN(current) || isNaN(target) || isNaN(weight) || weight <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const needed = ((target - (current * (1 - weight))) / weight).toFixed(1);

    document.getElementById('needed-score').textContent = ${needed}%;
    
    let message = "Achievable goal! Good luck with your preparation.";
    if (needed > 100) message = "⚠️ You need extra credit to reach this target score.";
    else if (needed <= 0) message = "🎉 You have already secured your target grade!";

    document.getElementById('final-message').textContent = message;
    document.getElementById('final-result').style.display = 'block';
}

// Convert Grade Percentage
function convertGrade() {
    const val = parseFloat(document.getElementById('percentage-input').value);
    if (isNaN(val)) return;

    let letter = 'F', gpa = '0.0';
    if (val >= 93) { letter = 'A'; gpa = '4.0'; }
    else if (val >= 90) { letter = 'A-'; gpa = '3.7'; }
    else if (val >= 87) { letter = 'B+'; gpa = '3.3'; }
    else if (val >= 83) { letter = 'B'; gpa = '3.0'; }
    else if (val >= 80) { letter = 'B-'; gpa = '2.7'; }
    else if (val >= 77) { letter = 'C+'; gpa = '2.3'; }
    else if (val >= 73) { letter = 'C'; gpa = '2.0'; }
    else if (val >= 65) { letter = 'D'; gpa = '1.0'; }

    document.getElementById('converted-letter').textContent = letter;
    document.getElementById('converted-gpa').textContent = gpa;
}

// Legal Modals Control
function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

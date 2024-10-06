const depressionIndices = [3, 5, 10, 13, 16, 17, 21];
const anxietyIndices = [2, 4, 7, 9, 15, 19, 20];
const stressIndices = [1, 6, 8, 11, 12, 14, 18];

const quranAndHadithMapping = {
    1: "For stress: 'So truly where there is hardship, there is also ease.' (Quran 94:6)",
    2: "For anxiety: 'And He found you lost and guided [you].' (Quran 93:7)",
    3: "For depression: 'And do not grieve over what has been lost.' (Quran 57:23)",
    // Add more mappings for other questions
    4: "For anxiety: 'Indeed, with hardship comes ease.' (Quran 94:6)",
    5: "For depression: 'Say, My Lord would not care for you if it were not for your supplication.' (Quran 25:77)",
    // Continue for all indices
};

const results = JSON.parse(localStorage.getItem('dass21Results'));

if (results) {
    const depressionScore = depressionIndices.reduce((sum, i) => sum + results[`q${i}`], 0);
    const anxietyScore = anxietyIndices.reduce((sum, i) => sum + results[`q${i}`], 0);
    const stressScore = stressIndices.reduce((sum, i) => sum + results[`q${i}`], 0);

    document.getElementById('depression-score').innerText = `Depression Score: ${depressionScore}`;
    document.getElementById('anxiety-score').innerText = `Anxiety Score: ${anxietyScore}`;
    document.getElementById('stress-score').innerText = `Stress Score: ${stressScore}`;

    // Generate prompts based on answered questions
    const promptsDiv = document.createElement('div');
    promptsDiv.classList.add('prompts');
    promptsDiv.innerHTML = '<h2>Reflective Prompts to be answered by gpt</h2>';

    Object.keys(results).forEach(key => {
        const questionNumber = parseInt(key.replace('q', ''));
        const prompt = quranAndHadithMapping[questionNumber];
        if (prompt) {
            const promptElement = document.createElement('p');
            promptElement.innerText = `Question ${questionNumber}: ${prompt}`;
            promptsDiv.appendChild(promptElement);
        }
    });

    document.body.appendChild(promptsDiv);
} else {
    document.getElementById('result').innerText = 'No results found. Please complete the questionnaire first.';
}

const questions = [
    "I found it hard to wind down",
    "I was aware of dryness of my mouth",
    "I couldn't seem to experience any positive feeling at all",
    "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
    "I found it difficult to work up the initiative to do things",
    "I tended to over-react to situations",
    "I experienced trembling (e.g. in the hands)",
    "I felt that I was using a lot of nervous energy",
    "I was worried about situations in which I might panic and make a fool of myself",
    "I felt that I had nothing to look forward to",
    "I found myself getting agitated",
    "I found it difficult to relax",
    "I felt down-hearted and blue",
    "I was intolerant of anything that kept me from getting on with what I was doing",
    "I felt I was close to panic",
    "I was unable to become enthusiastic about anything",
    "I felt I wasn't worth much as a person",
    "I felt that I was rather touchy",
    "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)",
    "I felt scared without any good reason",
    "I felt that life was meaningless"
];

const form = document.getElementById('dass21-form');

questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const label = document.createElement('label');
    label.innerText = `${index + 1}. ${question}`;
    questionDiv.appendChild(label);

    const responseDiv = document.createElement('div');
    responseDiv.classList.add('response-tabs');

    const options = [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 }
    ];

    options.forEach(option => {
        const tab = document.createElement('button');
        tab.classList.add('tab');
        tab.innerText = option.text;
        tab.dataset.value = option.value;
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const activeTab = responseDiv.querySelector('.tab.active');
            if (activeTab) activeTab.classList.remove('active');
            tab.classList.add('active');
            const input = questionDiv.querySelector('input');
            input.value = option.value;
        });
        responseDiv.appendChild(tab);
    });

    questionDiv.appendChild(responseDiv);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = `q${index + 1}`;
    hiddenInput.required = true;
    questionDiv.appendChild(hiddenInput);

    form.appendChild(questionDiv);
});

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.innerText = 'Submit';
form.appendChild(submitButton);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let result = {};
    let unansweredQuestions = [];
    let isComplete = true;

    formData.forEach((value, key) => {
        if (!value) {
            isComplete = false;
        }
        result[key] = parseInt(value);
    });

    // Check for unanswered questions
    for (let i = 1; i <= questions.length; i++) {
        if (!result[`q${i}`]) {
            unansweredQuestions.push(i);
        }
    }

    if (!isComplete) {
        if (unansweredQuestions.length > 0) {
            alert(`Please answer all questions before submitting. Unanswered questions: ${unansweredQuestions.join(', ')}`);
        } else {
            alert("Please answer all questions before submitting.");
        }
        return;
    }

    localStorage.setItem('dass21Results', JSON.stringify(result));
    window.location.href = 'results.html';
});
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');


let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the full form of SMTP in Computer Networking?',
        choice1: 'Small Mail Transfer Protocol',
        choice2: 'Simple Mail Transfer Protocol',
        choice3: 'Short Mail Transfer Protocol',
        choice4: 'Singel Mail Transfer Protocol',
        answer: 2,

    },
    {
        question: 'Who is the father of C language?',
        choice1: 'Steve Jobs',
        choice2: 'James Gosling',
        choice3: 'Dennis Ritchie',
        choice4: 'Rasmus Lerdorf',
        answer: 3,

    },
    {
        question: 'In Operating Systems, which of the following is/are CPU scheduling algorithms?',
        choice1: 'Priority',
        choice2: 'Round Robin',
        choice3: 'Shortest Job First',
        choice4: 'All of the mentioned',
        answer: 4,

    },
    {
        question: 'What does an RDBMS consist of?',
        choice1: 'Collection of Records',
        choice2: 'Collection of Keys',
        choice3: 'Collection of Tables',
        choice4: 'Collection of Fields',
        answer: 3,

    },
    {
        question: 'Which of the following is the most complete cloud computing service model?',
        choice1: 'Paas',
        choice2: 'laas',
        choice3: 'Caas',
        choice4: 'Saas',
        answer: 4,

    },

]

const SCORE_POINT = 10
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINT)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 400)

    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}
startGame()


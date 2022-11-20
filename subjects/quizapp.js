/*eslint-env es6*/
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator"); 
const homebox=document.querySelector(".home-box"); 
const quizBox=document.querySelector(".quiz-box"); 
const resultBox=document.querySelector(".result-box"); 

let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
let correctAnswers=0; 
let attempt=0; 

function setavailableQuestions()
{
    const totalQuestion = quiz.length;
    for(let i =0;i <totalQuestion; i++)
        {
            availableQuestions.push(quiz[i])
        }
}

 function getNewQuestion()
{
    questionNumber.innerHTML = "Question "+(questionCounter+1) + " of " + quiz.length; 
    
    //set question text 
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get position of questionIndex from availableQuestions array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the questionIndex from the availableQuestion array to avoid repitiion
    availableQuestions.splice(index1,1);
    //show question image if image property is defined
    if(currentQuestion.hasOwnProperty("img")){
		const img=document.createElement("img"); 
		img.src=currentQuestion.img; 
		questionText.appendChild(img); 	
    }
    //set options
    //get length of options  
    const optionLen = currentQuestion.options.length
    //push options into avaalbaleOptions array
    for(let i =0; i <optionLen; i++)
    {
        availableOptions.push(i);
    }
    optionContainer.innerHTML=' '
    let animationDelay = 0.15; 
    //create options in html 
    for(let i =0; i <optionLen; i++)
    {
        //random options
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get position of optionIndex from the availableOptions Array
        const index2=availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);  
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay=animationDelay + 's'; 
        animationDelay=animationDelay + 0.15; 
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++;
}
//get the result of current question
function getResult(element){
    const id=parseInt(element.id); 
    //get the answer by comparing ids of chosen option
    if(id===currentQuestion.answer){
        //set green color to correct answer 
        element.classList.add("correct"); 
        //add indictor to correct mark    
        updateAnswerIndicator("correct"); 
        correctAnswers++;
    }
    else{
        //set red to wrong answer 
        element.classList.add("wrong"); 
        //add indictor to wrong mark    
        updateAnswerIndicator("wrong");

        //if answer is incorrect display green on correct option
        const optionLen = optionContainer.children.length; 
        for(let i =0; i<optionLen; i++)
        {
            if(parseInt(optionContainer.children[i].id)===currentQuestion.answer)
            {
                optionContainer.children[i].classList.add("correct"); 
            }
        }
    }
    attempt++; 
    unclickableOptions(); 
}
//make all other options unclickable after user selects one
function unclickableOptions(){
    const optionLen = optionContainer.children.length; 
    for(let i =0; i<optionLen; i++)
    {
        optionContainer.children[i].classList.add("already-answered"); 
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML=''
    const totalQuestion = quiz.length; 
    for(let i =0; i<totalQuestion; i++)
    {
        const indicator=document.createElement("div"); 
        answersIndicatorContainer.appendChild(indicator); 
    }
}
function updateAnswerIndicator(markType)
{
   answersIndicatorContainer.children[questionCounter-1].classList.add(markType) 
}
function next()
{
    if(questionCounter=== quiz.length)
    {
        quizOver(); 
    }
    else getNewQuestion(); 
}

function quizOver(){
    //hide quiz box
    quizBox.classList.add("hide");
    //show resultbox
    resultBox.classList.remove("hide"); 
    quizResult();
}
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML= quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML= attempt; 
    resultBox.querySelector(".total-correct").innerHTML= correctAnswers; 
    resultBox.querySelector(".total-wrong").innerHTML= attempt - correctAnswers;
    const percentage=(correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML= percentage.toFixed(2)+"%";
    resultBox.querySelector(".total-score").innerHTML= correctAnswers+"/"+quiz.length; 
}

function resetQuiz()
{
 questionCounter=0;
 correctAnswers=0; 
 attempt=0; 

}
function tryAgainQuiz()
{
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the question box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome()
{
    //hide result Box
    resultBox.classList.add("hide");
    //show home box
    homebox.classList.remove("hide");
    resetQuiz();
    
}
// #### STARTING POINT####//
function startQuiz()
{
    //hide home box
    homebox.classList.add("hide");
    quizBox.classList.remove("hide");

    
    setavailableQuestions();
    getNewQuestion();
    
    //to create the icons for righ tor wrong answer
    answersIndicator(); 
}

window.onload = function()
{
    homebox.querySelector(".total-questions").innerHTML= quiz.length;
}
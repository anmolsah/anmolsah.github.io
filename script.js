
const body = document.body;
const todoList = document.getElementById('todo-list');
const inputBox = document.querySelector('.todo-input');
const addButton = document.querySelector('.add-button');
const totalTask = document.getElementById('total-tasks');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const timerDisplay = document.getElementById('timer-display');
let counter = 0;
let quoteTimer;
let currentTheme = 1;
let timers = {};//object to store timers for each task

function startTimer(duration , display , taskId){
    if(timers[taskId]){
        clearInterval(timers[taskId]);
    }
    let timer = duration;
    let minutes , seconds ;

    timers[taskId] = setInterval(() =>{
        minutes = Math.floor(timer/60);
        seconds = timer %60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds =seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if(--timer <0){
            clearInterval(timers[taskId]);
            display.textContent = "00:00";
            delete timers[taskId];
        }

    },1000);
}


//quotes displayed when you tick the check box task is  completed
const quotes = [
    "The secret to getting ahead is getting started. - Mark Twain",
    "Do something today that your future self will thank you for. - Anonymous",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
    "The journey of a thousand miles begins with a single step. - Lao Tzu",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Believe you can, and you're halfway there. - Theodore Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. - Steve Jobs",
    "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston S. Churchill",
    "The harder I work, the luckier I get. - Samuel Goldwyn",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
    "Nothing will work unless you do. - Maya Angelou",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "Opportunities don't happen. You create them. - Chris Grosser",
    "The best way to get started is to quit talking and begin doing. - Walt Disney",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
    "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
    "Success is not in what you have, but who you are. - Bo Bennett",
    "What you do today can improve all your tomorrows. - Ralph Marston",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "Your time is now. Start where you stand, and never back down! - Napoleon Hill",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
    "It's not whether you get knocked down; it's whether you get up. - Vince Lombardi",
    "The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh (Alice in Wonderland)",
    "Action is the foundational key to all success. - Pablo Picasso",
    "Don't count the days; make the days count. - Muhammad Ali",
    "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
    "Don't wait for the perfect moment. Take the moment and make it perfect. - Zoey Sayward",
    "You can't change how people treat you or what they say about you. All you can do is change how you react to it. - Mahatma Gandhi",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
    "The only person you should try to be better than is the person you were yesterday. - Anonymous",
    "Be yourself; everyone else is already taken. - Oscar Wilde",
    "Challenges are what make life interesting, and overcoming them is what makes life meaningful. - Joshua J. Marine",
    "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Great things never come from comfort zones. - Roy T. Bennett",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
    "You can't use up creativity. The more you use, the more you have. - Maya Angelou",
    "In order to succeed, we must first believe that we can. - Nikos Kazantzakis",
    "Doubt kills more dreams than failure ever will. - Suzy Kassem"  
];



addButton.addEventListener('click',() =>{
    const todoItem = inputBox.value.trim();
    if(todoItem !== ''){
        const taskId = "task-" + counter ; // generate a unique id
        counter++;
        totalTask.innerText = counter;

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('checkbox');

        checkbox.addEventListener('change', () => {
            todoDiv.classList.toggle('checked');
            if(checkbox.checked){
                showRandomQuote();
            }
        });


       const todoText = document.createElement('span');
       todoText.textContent = todoItem;

        const deleteButton = document.createElement('i');
        deleteButton.classList.add('fa-sharp', 'fa-solid', 'fa-trash');
        deleteButton.addEventListener('click',() =>{
            clearInterval(timers[taskId]); 
            delete timers[taskId]; 
            todoDiv.remove();
            counter--;
            totalTask.innerText = counter;
        });

        
        

        const timerButton = document.createElement('button');
         timerButton.textContent = 'Start Timer';
         timerButton.classList.add('timer-button');
         timerButton.addEventListener('click', () =>{
            
                if(!timers[taskId]){
            const minutes = prompt ("Enter the duration in minutes:");
            if(minutes !== null){
                const duration = parseInt(minutes) * 60;
                    startTimer(duration , timerDisplay , taskId);
                 } 
            }  
        });

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(todoText);
        todoDiv.appendChild(deleteButton);
        todoDiv.appendChild(timerButton);
        todoList.appendChild(todoDiv);

        
        inputBox.value = '';
        

    }
});


function showRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.innerText = randomQuote;
    quoteContainer.style.display = 'block';

        clearTimeout(quoteTimer);

    quoteTimer = setTimeout(() => {
        quoteText.innerText = '';
        quoteContainer.style.display = 'none';
    },7000);
}

// to cahnge the theme of the body
document.addEventListener('keydown',(event) =>{
    if(event.key === 'c' && event.ctrlKey){
        const input = prompt ('type "change"  to switch themes:');
        if(input === 'change'){
            toggleBodyTheme();
        }
    }
});

function toggleBodyTheme() {
    body.classList.remove(`body-theme-${currentTheme}`);
    currentTheme = currentTheme % 4 +1;
    body.classList.add(`body-theme-${currentTheme}`);
}
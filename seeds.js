if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose')
const Quote = require('./models/quotes')

// mongoose.connect('mongodb://localhost:27017/rqg', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});

const seedQuotes = [
    {
        category: 'motivational',
        body: '“We cannot solve problems with the kind of thinking we employed when we came up with them.”',
        author: 'Albert Einstein'
    },
    {
        category: 'motivational',
        body: '“Learn as if you will live forever, live like you will die tomorrow.”',
        author: 'Mahatma Gandhi'
    },
    {
        category: 'motivational',
        body: '““When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out.”',
        author: 'Eleanor Roosevelt'
    },
    {
        category: 'motivational',
        body: '“The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty."',
        author: 'Winston Churchill'
    },
    {
        category: 'motivational',
        body: '“The successful man will profit from his mistakes and try again in a different way.”',
        author: 'Dale Carnegie'
    },
    {
        category: 'motivational',
        body: '“One of the differences between some successful and unsuccessful people is that one group is full of doers, while the other is full of wishers.”',
        author: 'Edmond Mbiaka'
    },
    {
        category: 'motivational',
        body: '“I’ve missed more than 9,000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life, and that is why I succeed.”',
        author: 'Michael Jordan'
    },
    {
        category: 'motivational',
        body: '“It’s hard to beat a person who never gives up.”',
        author: 'Babe Ruth'
    },
    {
        category: 'motivational',
        body: '“Smart people learn from everything and everyone, average people from their experiences, stupid people already have all the answers.”',
        author: 'Socrates'
    },
    {
        category: 'motivational',
        body: '“If you hear a voice within you say, ‘You cannot paint,’ then by all means paint, and that voice will be silenced.”',
        author: 'Vincent Van Gogh'
    },
    {
        category: 'funny',
        body: '“Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes.”',
        author: 'Jack Handey'
    },
    {
        category: 'funny',
        body: '“Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.”',
        author: 'Will Ferrell'
    },
    {
        category: 'funny',
        body: ' “I love being married. It is so great to find that one special person you want to annoy for the rest of your life.”',
        author: 'Rita Runder'
    },
    {
        category: 'funny',
        body: '“When your mother asks, ‘Do you want a piece of advice?’ it is a mere formality. It doesn’t matter if you answer yes or no. You’re going to get it anyway.”',
        author: 'Erma Bombeck'
    },
    {
        category: 'funny',
        body: '““You know you’ve reached middle age when you’re cautioned to slow down by your doctor, instead of by the police.”',
        author: 'Joan Rivers'
    },
    {
        category: 'funny',
        body: '“I like freedom. I wake up in the morning and say, ‘I don’t know, should I have a popsicle or a donut?’ You know, who knows?” ',
        author: 'Oscar Nunez'
    },
    {
        category: 'funny',
        body: '“Doing nothing is very hard to do… you never know when you’re finished.” ',
        author: 'Leslie Nielsen'
    },
    {
        category: 'funny',
        body: '“I am a friend of the working man, and I would rather be his friend, than be one.”',
        author: 'Clarence Darrow'
    },
    {
        category: 'funny',
        body: '“The best way to appreciate your job is to imagine yourself without one.”',
        author: 'Oscar Wilde'
    },
    {
        category: 'funny',
        body: '“My therapist says I am afraid of success. I guess I could understand that, because after all, fulfilling my potential would really cut into my sitting-around time.”',
        author: 'Maria Bamford'
    },
    {
        category: 'islamic',
        body: '“Do not lose hope, nor be sad.”',
        author: 'Quran 3:139'
    },
    {
        category: 'islamic',
        body: '“The bravest heart is the one that stays close to Allah (God), even, when it’s in pain.” ',
        author: 'Anonymous'
    },
    {
        category: 'islamic',
        body: '“Forgive others as quickly as you expect Allah (God) to forgive you.”',
        author: 'Anonymous'
    },
    {
        category: 'islamic',
        body: '“Taking pains to remove the pains of others is the true essence of generosity.”',
        author: 'Abu Bakr (R.A)'
    },
    {
        category: 'islamic',
        body: '“For indeed, with hardship [will be] ease.”',
        author: 'Quran 94:5'
    },
    {
        category: 'islamic',
        body: '“And whoever puts all his trust in Allah (God), then He will suffice him.” ',
        author: 'Quran 65:3'
    },
    {
        category: 'islamic',
        body: '“The richest of the rich is the one who is not a prisoner to greed.”',
        author: 'Ali Ibn Abi Talib (R.A)'
    },
    {
        category: 'islamic',
        body: '“Speak only when your words are more beautiful than the silence.”',
        author: 'Anonymous'
    },
    {
        category: 'islamic',
        body: '“Dua (supplication) has the power to turn your dreams into reality.”',
        author: 'Anonymous'
    },
    {
        category: 'islamic',
        body: '"Be patient for what was written for you was written by the greatest of Writers"',
        author: 'Anonymous'
    },
    {
        category: 'christian',
        body: 'God loves each of us as if there were only one of us”',
        author: 'Augustine'
    },
    {
        category: 'christian',
        body: '"God never said that the journey would be easy, but He did say that the arrival would be worthwhile"',
        author: 'Max Lucado'
    },
    {
        category: 'christian',
        body: '"We gain strength, and courage, and confidence by each experience in which we really stop to look fear in the face...we must do that which we think we cannot."',
        author: 'Eleanor Roosevelt'
    },
    {
        category: 'christian',
        body: ' "Always, everywhere God is present, and always He seeks to discover Himself to each one"',
        author: 'A.W Tozer'
    },
    {
        category: 'christian',
        body: '"This is our time on the history line of God. This is it. What will we do with the one deep exhale of God on this earth? For we are but a vapor and we have to make it count. We’re on. Direct us, Lord, and get us on our feet."',
        author: 'Beth Moore'
    },
    {
        category: 'pidgin',
        body: '"Woman wey never see problem, na ein still dey hold breast run"',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: '"Man wey naked no dey chook hand for pocket"',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: '"The Chicken that thinks it is an Elephant will know on Christmas day"',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: '"Jollof rice wey dey for bottom of pot today go dey for top of cooler tomorrow."',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: '"The patient dog. Na hungry go kill am."',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: '"Head wey no wan think go carry load."',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: '" No matter how lizard do press-up reach, e no fit get muscle pass crocodile."',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: '"Wetin concern bicycle with fuel scarcity"',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: 'If giver no dey careful, begger go first am build house',
        author: 'Anonymous'
    },
    {
        category: 'pidgin',
        body: 'Person wey wan catch animal for bush no dey blow whistle',
        author: 'Anonymous'
    },
]

Quote.insertMany(seedQuotes)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})
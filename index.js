// if(process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }


const express = require('express');
const mongoose = require ('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ExpressError = require('./utilities/ExpressError')
const catchAsync = require('./utilities/catchAsync')
const Quote = require('./models/quotes');
const e = require('express');
const ejsMate = require('ejs-mate');
const puppeteer = require('puppeteer');
const getPage = require('./utilities/newPage')
const port = process.env.PORT || 3000;


console.log(process.env.MONGODB_URI)

// mongoose.connect('mongodb://localhost:27017/rqg', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// export default async () => {
//     const URI: any = process.env.MONGO_URI;
//     await mongoose.connect(URI);
  
//     logger.info(`MongoDB Connected`);
//   };

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

const categories = ['motivational', 'funny', 'islamic', 'christian', 'pidgin']

app.get('/', catchAsync(async(req, res, next) => {
    res.render('home')
}))

app.get('/quotes', catchAsync(async(req, res, next) => {
    try {
        const { category } = req.query
        if(category) {
            const quotes = await Quote.find({category})
            res.render('index', { quotes, category })
        } else {
            const quotes = await Quote.find({})
            res.render('index', { quotes, category: 'All'})
        }
    }catch(e){
    next(e)
    }
}))

// app.get('/randq', catchAsync(async(req, res, next) => {
//     try {
//         const { category } = req.query
//         if(category) {
//         const quote = await Quote.aggregate([ {$match: {category: category}}, { $sample: {size: 1} }]) 
//             // const quotes = await Quote.find({category})
//             res.render('rando', { quote, category })
//         }else {
//             const quote = await Quote.aggregate([ { $sample: {size: 1} } ])
//             res.render('rando', { quote })
            
//         }
        
//     }catch(e){
//         next(e)
//     }
// }))

app.get('/random', catchAsync(async(req, res, next) => {
    try {
        const { category } = req.query
        if(category) {
        const quote = await Quote.aggregate([ {$match: {category: category}}, { $sample: {size: 1} }]) 
            // const quotes = await Quote.find({category})
            res.render('rando', { quote, category })
        }else {
            const quote = await Quote.aggregate([ { $sample: {size: 1} } ])
            res.render('rando', { quote })
            
        }
        
    }catch(e){
        next(e)
    }
}))

app.get('/addNew', catchAsync(async(req, res, next) => {
    res.render('new', { categories })
}))

app.post('/', catchAsync(async(req, res, next) => {
    const newQuote = new Quote(req.body)
    await newQuote.save()
    console.log(newQuote)
    console.log(req.body)
    res.redirect('/')
}))

// app.get('/random/download', catchAsync(async(req, res, next) => {
//         const page = await getPage()
// }))

// app.get('/export/html', (req, res) => {
//     const templateData = {  }
//     res.render('template.html', templateData)
// })

app.get('/export/pdf', (req, res) => {
    (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('http://localhost:3000/random/')
        const buffer = await page.pdf({format: 'A4', })
        res.type('application/pdf')
        res.send(buffer)
        browser.close()
    })()
})

app.get('/all', async(req, res, next)=> {
    const quotes = await Quote.find({})
    res.render('index', { quotes })
})

app.listen(port, "0.0.0.0", () => {
    console.log('Listening on port 3000')
})
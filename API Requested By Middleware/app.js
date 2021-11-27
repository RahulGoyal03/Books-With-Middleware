const express = require("express")
const books = require("./books.json")
const app = express()

app.use(express.json());



const dataa = {
    api_requested_by:"Your name",
    books:  books
}

const logger = (name) => {

return (req, res, next) => {

    dataa.api_requested_by = name
    next()
}

}


// const api_requested_by="Rahul Goyal"

app.get("/",logger("Rahul Goyal"), (req, res) => {

    res.send(dataa)
})

app.post("/books",logger("Rahul Goyal"), (req, res) => {
    const newuser = [...books, req.body]
    dataa.books = newuser
    res.send(dataa)
})

app.get("/books/:id",logger("Rahul Goyal"), (req, res) => {
    const specific = books.filter((user) => user.author === req.params.id)
    // console.log(req.params.id)

    dataa.books = specific[0]

    res.send(dataa)
})




app.patch("/books/:author",logger("Rahul Goyal"),(req, res) => {
        const newBook = books.map((user) => {
            if (req.params.author === user.author) {
                if (req?.body?.author) user.author = req.body.author
                if (req?.body?.book_name) user.book_name = req.body.book_name
                if (req?.body?.pages) user.pages = req.body.pages
                if (req?.body?.published_year) user.published_year = req.body.published_year

            }
            return user;
        });
        dataa.books = newBook

        res.send(dataa)
    });


app.delete("/books/:id" , logger("Rahul Goyal"),(req, res) => {
    const newBook = books.filter((user) => user.author !== req.params.id)

    dataa.books = newBook

    res.send(dataa)
})


app.listen(6969, () => {
    console.log("Listening on PORT 6969")
})



// app.patch("/books/:author", (req, res) => {
//     const newData = data.map((user) => {
//         if (req.params.author === user.author) {
//             if (req?.body?.author) user.author = req.body.author
//             if (req?.body?.book_name) user.book_name = req.body.book_name
//             if (req?.body?.pages) user.pages = req.body.pages
//             if (req?.body?.published_year) user.published_year = req.body.published_year

//         }
//         return user;
//     });

//     res.send(newData)
// });




// const authorise = (permission) => {
//     return (req, res, next) => {
//       const originalSendFunc = res.send.bind(res);
//       res.send = function (body) {
//         body.name = "Nrupul Dev";
//         console.log(body); // do whatever here
//         return originalSendFunc(body);
//       };
//       next();
//     };
//   };


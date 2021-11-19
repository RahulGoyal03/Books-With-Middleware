const express = require("express");
const data = require("./books");

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send(data);
});
app.post("/books", (req, res) => {
    const newData = [...data, req.body]
    res.send(newData);
});
app.get("/books/:author", (req, res) => {
    console.log(req.params.author)
    res.send("Patch");
});
app.patch("/books/:author", (req, res) => {
    const newData = data.map((user) => {
        if (req.params.author === user.author) {
            if (req?.body?.author) user.author = req.body.author
            if (req?.body?.book_name) user.book_name = req.body.book_name
            if (req?.body?.pages) user.pages = req.body.pages
            if (req?.body?.published_year) user.published_year = req.body.published_year

        }
        return user;
    });

    res.send(newData)
});

app.delete("/books:author", (req, res) => {
    const newData = data.filter((user) => user.author !== req.params.author)

    res.send(newData)
})

app.listen(6969, function() {
    console.log("Listening port on 6969")
})
import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


// Route for saving a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear ||
            !req.body.description
        ) {
            return res.status(400).send({
                message: "Send all required details: Title, Author, Publish Year, Description",
            });

        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            description: req.body.description
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }


});

// Route to get a single book by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ data: book });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Route to get all the books
router.get("/", async (req, res) => {
    try {

        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});


// Route to Update
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear ||
            !req.body.description
        ) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear, description",
            });
        }
        const updateData = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            description: req.body.description
        };
        const result = await Book.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully", updatedBook: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to delete a book

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book deleted successfully" })


    } catch (error) {
        console.log(error.message)
        res.status(500), send({ message: error.message });
    }
})


export default router;
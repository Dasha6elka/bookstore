const errors = require("../errors");

module.exports = {
    create: bookService => async (req, res) => {
        const { title, year, cost, authors } = req.body;
        const id = await bookService.createNewBook({ title, year, cost, authors });
        res.json({ id });
    },

    findAll: bookService => async (req, res) => {
        const { scroll, limit = 25, filter, ...order } = req.query;
        const list = await bookService.findAllBooks({ scroll, limit }, order, filter);
        res.json(list);
    },

    findById: bookService => async (req, res) => {
        const { id } = req.params;
        const book = await bookService.findBookById(id);
        if (!book) {
            const error = errors.NotFound(`Book with id ${id} not found`);
            res.status(error.statusCode);
            res.json(error);
            return;
        }
        res.json(book);
    },

    findTopMostPopular: bookService => async (req, res) => {
        const { limit = 10 } = req.query;
        const result = await bookService.findTopMostPopularBooks(limit);
        res.json(result);
    },

    update: bookService => async (req, res) => {
        const change = req.body;
        const { id } = req.params;
        await bookService.updateBook(id, change);
        res.send();
    },

    deleteById: bookService => async (req, res) => {
        const { id } = req.params;
        await bookService.deleteBook(id);
        res.send();
    },
};

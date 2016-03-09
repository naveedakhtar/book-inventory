module.exports = function(stockRepository) {
    return {
        getCount: function (req, res) {
            stockRepository.getCount(req.params.isbn).then(function (result) {
                if (result !== null) {
                    res.status(200);
                    res.format({
                        'text/html': function() {
                            res.send('<p>In stock: ' + result + '</p>');
                        },
                        'application/json': function() {
                            res.json({count: result});
                        }
                    });
                } else {
                    res.status(404);
                    res.format({
                        'text/html': function() {
                            res.send('<p>No book with ISBN: ' + req.params.isbn + '</p>');
                        },
                        'application/json': function() {
                            res.json({error: 'No book with ISBN: ' + req.params.isbn});
                        }
                    });
                }
            });
        },
        stockUp: function (req, res, next) {
            stockRepository.
                stockUp(req.body.isbn, req.body.count).
                then(function (result) {
                    res.json({isbn: req.body.isbn, count: req.body.count});
                }).
                catch(next);
        },
        getAll: function (req, res, next) {
            stockRepository.
                findAll().
                then(function (books) {
                    res.json(books);
                }).
                catch(next);
        }
    }
}

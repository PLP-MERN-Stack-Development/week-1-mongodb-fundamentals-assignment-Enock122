// Find all books in a specific genre
db.books.find({ genre: "Programming" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// Find books by a specific author
db.books.find({ author: "Andy Hunt" });

// Update the price of a specific book
db.books.updateOne({ title: "Clean Code" }, { $set: { price: 35 } });

// Delete a book by its title
db.books.deleteOne({ title: "Clean Code" });


// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort by price ascending
db.books.find().sort({ price: 1 });

// Sort by price descending
db.books.find().sort({ price: -1 });

// Pagination (page 1, 5 books per page)
db.books.find().skip(0).limit(5);

// Pagination (page 2)
db.books.find().skip(5).limit(5);

Aggregation Pipeline
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
      _id: 0
    }
  }
]);

Indexing
// Create an index on title
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Explain method to show performance
db.books.find({ title: "Clean Code" }).explain("executionStats");

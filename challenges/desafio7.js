db.movies.aggregate([
  {
    $match: {
      $and: [
        { cast: { $exists: true } },
        { languages: { $all: ["English"] } },
      ],
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB_sem_round: {
        $avg: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: {
        $round: [
          "$mediaIMDB_sem_round",
          1,
        ],
      },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
]);

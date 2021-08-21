db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /\bWon\b.*\bOscar(s)?\b/ig },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: {
        $max: "$imdb.rating",
      },
      menor_rating: {
        $min: "$imdb.rating",
      },
      media_rating_sem_round: {
        $avg: "$imdb.rating",
      },
      desvio_padrao_sem_round: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: {
        $round: [
          "$media_rating_sem_round",
          1,
        ],
      },
      desvio_padrao: {
        $round: [
          "$desvio_padrao_sem_round",
          1,
        ],
      },
    },
  },
]);

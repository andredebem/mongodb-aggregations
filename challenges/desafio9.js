db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $ne: "" } },
      ],
    },
  },
  {
    $addFields: {
      birthYearInt: {
        $toInt: "$birthYear",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: "$birthYearInt",
      },
      menorAnoNascimento: {
        $min: "$birthYearInt",
      },
    },
  },
]);

db.trips.aggregate([
  {
    $addFields: {
      dateToString: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$startTime",
        },
      },
    },
  },
  {
    $match: {
      $expr: {
        $eq: ["$dateToString", "2016-03-10"],
      },
    },
  },
  {
    $addFields: {
      durationTrip: {
        $abs: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $addFields: {
      durationTripMinutes: {
        $divide: ["$durationTrip", 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$durationTripMinutes",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);

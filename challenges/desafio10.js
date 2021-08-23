db.trips.aggregate([
  {
    $addFields: {
      durationTrip: {
        $abs: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $addFields: {
      durationTripHours: {
        $divide: ["$durationTrip", 3.6e+6],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$durationTripHours",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);

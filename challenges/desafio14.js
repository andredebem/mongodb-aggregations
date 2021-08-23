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
      durationTripMinutes: {
        $divide: ["$durationTrip", 60000],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$durationTripMinutes",
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);

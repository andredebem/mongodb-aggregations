db.trips.aggregate([
  {
    $addFields: {
      startDayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$startDayOfWeek",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "trips",
      let: { dayOfWeek: "$diaDaSemana" },
      pipeline: [
        {
          $addFields: {
            startDayOfWeek: {
              $dayOfWeek: "$startTime",
            },
          },
        },
        {
          $match: {
            $expr: {
              $eq: ["$startDayOfWeek", "$$dayOfWeek"],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            total: { $sum: 1 },
          },
        },
        {
          $sort: { total: -1 },
        },
        {
          $limit: 1,
        },
      ],
      as: "station",
    },
  },
  {
    $project: {
      nomeEstacao: {
        $first: "$station._id",
      },
      total: {
        $first: "$station.total",
      },
    },
  },
]);

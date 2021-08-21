db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup:
      {
        from: "air_routes",
        localField: "airlines",
        foreignField: "airline.name",
        let: {},
        pipeline: [
          {
            $match: {
              airplane: { $in: ["747", "380"] },
            },
          },
        ],
        as: "rotas",
      },
  },
  {
    $addFields: {
      num_rotas: {
        $size: "$rotas",
      },
    },
  },
  {
    $match: {
      num_rotas: { $gt: 0 },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: "$num_rotas",
      },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);

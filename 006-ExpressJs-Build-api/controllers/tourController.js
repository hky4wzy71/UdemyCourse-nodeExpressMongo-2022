const fs = require("fs")

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  //Jsend format
  res.status(200).json({
    status: "succes",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  })
}
exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
  res.status(204).json({
    status: "succes",
    data: null,
  })
}
exports.getTour = (req, res) => {
  console.log(req.params)
  const id = req.params.id * 1
  const tour = tours.find((el) => el.id === id)
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
  res.status(200).json({
    status: "succes",
    data: {
      tour,
    },
  })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  console.log(tours[tours.length - 1].id)
  const newTour = Object.assign(
    { id: newId },
    req.body
  )
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "succes",
        data: {
          newTour,
        },
      })
    }
  )
}

exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    })
  }
  res.status(200).json({
    status: "succes",
    data: {
      tour: "<Updated your here>",
    },
  })
}
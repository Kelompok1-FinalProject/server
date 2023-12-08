async function errorHandling(error, req, res, next) {
    const errName = error?.name;
    const errMessage = error?.message;

    console.log(errName, errMessage);

    if (errName === "badrequest") {
        res.status(400).json({ message: errMessage ?? "Forbidden" }); 
        return;
    }

    if (errName === "unauthorized") {
      res.status(401).json({ message: errMessage ?? "Unauthorized" });
      return;
    }

    if (errName === "forbidden") {
      res.status(403).json({ message: errMessage ?? "Forbidden" });
    }

    if (errName === "ReferenceError") {
      res.status(404).json({ message: errMessage ?? "ReferenceError" });
    }

    res.status(500).json({ message: errMessage ?? "Internal Server Error" });
  }

  module.exports = errorHandling;
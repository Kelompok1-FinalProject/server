async function errorHandling(error, req, res, next) {
  const errName = error?.name;
  const errMessage = error?.message;

  console.log(errMessage, errName);

  if (errName === "unauthorized") {
    res.status(401).json({ message: errMessage ?? "unauthorized" });
    return;
  }

  if (errName === "forbidden") {
    res.status(403).json({ message: errMessage ?? "forbidden" });
    return;
  }

  if (errName === "ReferenceError") {
    res.status(404).json({ message: errMessage ?? "ReferenceError" });
    return;
  }

  res.status(500).json({ message: errMessage ?? "internal server error" });
}

module.exports = errorHandling;

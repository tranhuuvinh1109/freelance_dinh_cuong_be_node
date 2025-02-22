class RootRouter {
  // [GET] /
  index(req, res) {
    res.send("Hey this is my API running 🥳");
  }
}

module.exports = new RootRouter();

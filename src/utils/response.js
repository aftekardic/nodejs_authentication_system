class Response {
  constructor(data = null, message = null, status) {
    (this.data = data), (this.message = message);
  }

  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "The procedure is successful.",
    });
  }

  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "The procedure is successful.",
    });
  }
  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "500 Server error",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "400 Bad Request errors",
    });
  }

  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "401 Unauthorized error",
    });
  }

  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "404 Not Found error",
    });
  }

  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "429 Too Many request errors",
    });
  }
}

module.exports = Response;

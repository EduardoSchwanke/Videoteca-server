const express = require('express')

const routes = express.Router()

const VideoController = require('./controllers/videoController')
const VideoMiddleware = require('./middlewares/VideoMiddleware')

routes.get("/videos", VideoController.index)
routes.post("/video", VideoController.store)

routes.put("/videos/:id", VideoMiddleware.ValidateId, VideoController.update)
routes.delete("/videos/:id", VideoMiddleware.ValidateId, VideoController.delete)
routes.patch("/videos/:id", VideoMiddleware.ValidateId, VideoController.updateLike)

module.exports = routes
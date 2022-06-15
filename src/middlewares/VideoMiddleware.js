const { validate: isUuis } = require('uuid')
const Video = require('../models/Video')

module.exports = {
    async ValidateId(request, response, next) {
        // params = id passado na rota
        const { id } = request.params

        if(!isUuis(id)){
            return response.status(400).json({error: 'Invalid ID.'})
        }

        try{
            const video = await Video.findById(id)
            response.video = video
            if(!video){
                return response.status(404).json({error: "video not found."})
            }
        }catch(err){
            return response.status(500).json({error: err.massage})
        }
 
        next()
    }
}
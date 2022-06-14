const { response } = require('express')
const {v4: uuid} = require("uuid")

const Video = require('../models/Video')

module.exports = {
    async index(request, response){
        try{
            const videos = await Video.find()
            return response.status(200).json({ videos })
        }catch (err) {
            response.status(500).json({ error: err.message })
        }
    },

    async store(request, response){
        const {title, link} = request.body

        if(!title || !link){
            return response.status(400).json({error: 'missing title ou link'})
        }

        const video = new Video({
            _id: uuid(),
            title,
            link,
            liked: false
        })

        try{
            await video.save()
            return response.status(201).json({message: "video added successful"})
        }catch(err){
            response.status(400).json({ error: 'error' })
        }
    },

    async update(request, response) {
        const {title, link} = request.body

        if(!title && !link) {
            return response.status(400).json({error: "you most inform a new title or new link"})
        }

        if(title) response.video.title = title
        if(link) response.video.link = link

        try{
            await response.video.save()
            return response.status(200).json({massage: "video update succesfull"})
        }catch(err){
            response.status(400).json({ error: err.massage })
        }
    },

    async delete(request, response) {
        try{
            await response.video.remove()
            return response.status(200).json({massage: "video delete succesfull"})
        }catch(err){
            response.status(500).json({error: err.massage})
        }
    },

    async updateLike(request, response) {
        response.video.liked = !response.video.liked

        try{
            await response.video.save()

            return response.status(200).json({
                massage: `video ${response.video.liked ? "liked" : "unliked"} succesfully`
            })
        }catch(err) {
            response.status(400).json({error: err.massage})
        }
    }
}

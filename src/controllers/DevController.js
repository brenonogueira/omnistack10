const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    /*** index get  ***/
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs)
    },

    /*** store post  ***/
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username }); //procurar no banco se dev ja existe

        if (!dev) { //se dev não exister, criar dev
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiResponse.data //name = login - login se torna default caso nao exista name

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev)
    },

    async update() {

    },

    async destroy(request, response) {
        const devs = await Dev.findByIdAndDelete(request.params.id)
        .then(function () {
            return response.json({
                error: false,
                message: "dev apagado com sucesso!",
              })
             
         }) .catch(function (erro) {
            response.status(400).json({
            error: true,
            message: "Erro: dev não apagado com sucesso!",
          });
        });
    }
}

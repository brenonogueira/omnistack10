const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query; 

        const techsArray = parseStringAsArray(techs);

        //lista de devs
        const devs = await Dev.find({
            techs: {
                $in: techsArray, //operador lógico do mongo - se tiver dentro de techsArray da true
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //distancia máxima 10km para procurar devs
                }
            }
        });

        return response.json({
            devs
        })
    }
}
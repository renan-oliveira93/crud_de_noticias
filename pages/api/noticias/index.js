import dbConnect from "../../../src/services/db";
import Noticia from '../../../src/models/Noticia'

dbConnect()

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const noticias = await Noticia.find({})
                res.status(200).json({ success: true, data: noticias })

            } catch (error) {
                console.log(error)
                res.status(500).json({ success: false, error })
            } break;

        case 'POST':
            try {
                const { titulo, conteudo, date, id } = req.body

                if (!titulo && !conteudo) throw 'invalid data'
                const noticia = await Noticia.create({ titulo, conteudo, date: new Date().toLocaleDateString(), id })
                res.status(201).json({ success: true, data: noticia })

            } catch (error) {
                console.log(error)
                res.status(500).json({ success: false, error })
            } break;

    }

}
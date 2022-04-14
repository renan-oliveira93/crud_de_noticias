import dbConnect from "../../../src/services/db";
import Noticia from '../../../src/models/Noticia'

dbConnect()

export default async function handler(req, res) {
    const { method } = req
    const { NoticiaID } = req.query

    switch (method) {
        case 'PUT':
            try {
                const { titulo, conteudo, date } = req.body
                await Noticia.updateOne({ _id: NoticiaID }, { titulo, conteudo, date })
                res.status(200).json({ success: true })

            } catch (error) {
                console.log(error)
                res.status(500).json({ success: false, error })
            } break;

        case 'DELETE':
            try {

                await Noticia.deleteOne({ _id: NoticiaID })
                res.status(201).json({ success: true })

            } catch (error) {
                console.log(error)
                res.status(500).json({ success: false, error })
            } break;

    }

}
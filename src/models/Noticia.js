import mongoose from "mongoose";

const NoticiaSchema = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    date: String, createdAt: {
        type: Date,
        default: new Date()
    }
})

const Noticia = mongoose.models.Noticia || mongoose.model('Noticia', NoticiaSchema)

export default Noticia
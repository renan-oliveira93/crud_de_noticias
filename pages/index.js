import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home() {

  const [noticias, setNoticias] = useState([]);
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [isFormOpen, setIsForOpen] = useState(false);

  const handleChangeTitulo = (text) => {
    setTitulo(text);
    console.log(titulo)
  }

  const handleChangeConteudo = (text) => {
    setConteudo(text);
    console.log(conteudo)
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!titulo && !conteudo) return
    try {
      const { data } = await axios.post('../api/noticias', { titulo, conteudo, date, id })
      setNoticias(noticias.concat(data.data))
      setTitulo('')
      setConteudo('')
      toggleFormState()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    if (!titulo && !conteudo && !date) return

    try {
      await axios.put(`../api/noticias/${id}`, { titulo, conteudo, date })
      setNoticias(noticias.map(noticia => noticia._id === id ? { titulo, conteudo, _id: id, date } : noticia))
      setTitulo('')
      setConteudo('')
      setId('')
      setDate('')
      toggleFormState()
    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`../api/noticias/${_id}`)
      setNoticias(noticias.filter(noticia => noticia._id !== _id));
    } catch (error) {
      console.log(error)
    }
  };

  const handleUpdate = (noticia) => {
    setId(noticia._id)
    setTitulo(noticia.titulo)
    setConteudo(noticia.conteudo)
    setDate(noticia.date)
    setIsForOpen(true)
  }

  const toggleFormState = () => {
    setIsForOpen(!isFormOpen)
  }

  useEffect(() => {
    axios.get('../api/noticias')
      .then(({ data }) => {
        setNoticias(data.data)
      })
  }, [])


  return (
    <div className={styles.container}>

      <h1>Noticias</h1>
      <button
        onClick={toggleFormState}
        className={styles.botao}
      >
        {isFormOpen ? '-' : 'Nova noticia +'}
      </button>

      <div className={styles.campo_adicionar}>
        {isFormOpen && (
          <form>
            <p>Titulo</p>
            <input
              placeholder='Titulo'
              type='text'
              value={titulo}
              required
              onChange={e => handleChangeTitulo(e.target.value)}
            />
            <p>Conteudo</p>
            <input
              placeholder='Conteudo'
              type='text'
              value={conteudo}
              required
              onChange={e => handleChangeConteudo(e.target.value)}

            />
            <button
              className={styles.botao}
              onClick={id ? handleSubmitUpdate : handleSubmitCreate}
              type='submit'
            >
              {id ? 'Atualizar' : 'Postar'}
            </button>
          </form>
        )}
      </div>

      <div className={styles.card_noticias}>

        {noticias.map(noticia => (
          <ul key={noticia.id} className={styles.card}>
            <li className={styles.card_titulo}>{noticia.titulo}</li>
            <li className={styles.card_conteudo}><p>{noticia.conteudo}</p></li>
            <li><p>Publicado em:</p>{noticia.date}</li>
            <button onClick={() => handleUpdate(noticia)} className={styles.botao_do_card}>Editar</button>
            <button onClick={() => handleDelete(noticia._id)} className={styles.botao_do_card}>Excluir</button>
          </ul>
        ))}




      </div>

    </div>
  )
}

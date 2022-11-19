import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Crud de Noticias - Desafio full stack</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

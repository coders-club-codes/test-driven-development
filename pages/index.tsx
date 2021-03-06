import Head from 'next/head'
import { useCallback, useState } from 'react'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from '../styles/Home.module.css'
import { api } from '../services/api';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      await api.post('/email/send', {
        email,
        subject,
        body
      });

      Notify.success('Email enviado com sucesso!');
    } catch (err) {
      Notify.failure('Houve um erro ao enviar seu email!');
    }
  }, [email, subject, body])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form aria-label="form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

          <label htmlFor="subject">Assunto</label>
          <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} />

          <label htmlFor="body">Corpo</label>
          <textarea id="body" value={body} onChange={e => setBody(e.target.value)} />

          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  )
}

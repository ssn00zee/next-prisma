import { prisma } from '../../server/db/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Typography, Card, CardContent } from '@mui/material'
import styles from '@/styles/Home.module.css'

export default function Home({posts}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [post, setPosts] = useState(posts)

  useEffect(() => {
    setPosts(posts)
  }, [posts])
    

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({title, content})
    const res = await axios.post('/api/posts', { title, content })
    console.log(res.data)
  }
    

  return (
    <div>
      <Typography variant='h4' className={styles.title}>Home</Typography>
      <div>
        <form onSubmit={handleSubmit} className={styles.forms}>
          <TextField type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" />
          <TextField value={content} onChange={(e) => setContent(e.target.value)} id="filled-basic" label="Message" variant="filled" />
          <Button type="submit" variant="contained">Submit</Button>
        </form>
      </div>
      <div className={styles.cards}>
        {post.map((o) => (
          <Card key={o.id} variant='outlined'>
            <CardContent>
              <Typography variant='h6'>{o.title}</Typography>
              <Typography variant='body1'>{o.content}</Typography>
            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  }
}
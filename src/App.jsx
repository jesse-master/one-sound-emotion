import { useRef, useState } from 'react'
import { songs } from './songs'

function App() {
  const audioRef = useRef(null)

  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playSong = (song) => {
    if (currentSong?.url !== song.url) {
      setCurrentSong(song)

      setTimeout(() => {
        audioRef.current.play()
        setIsPlaying(true)
      }, 100)
    } else {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>One Sound Emotion</h1>

      <div style={styles.grid}>
        {songs.map((song, index) => (
          <div key={index} style={styles.card}>
            <img
              src={song.cover}
              alt={song.title}
              style={styles.image}
            />

            <h2>{song.title}</h2>

            <p>{song.artist}</p>

            <button
              style={styles.button}
              onClick={() => playSong(song)}
            >
              {currentSong?.url === song.url && isPlaying
                ? 'Pausar'
                : 'Tocar'}
            </button>
          </div>
        ))}
      </div>

      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.url}
          onEnded={() => setIsPlaying(false)}
          controls
          autoPlay
          style={styles.player}
        />
      )}
    </main>
  )
}

const styles = {
  container: {
    padding: '30px',
    minHeight: '100vh',
    background: '#121212',
    color: '#fff',
  },

  title: {
    textAlign: 'center',
    marginBottom: '40px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },

  card: {
    background: '#1f1f1f',
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
  },

  image: {
    width: '100%',
    borderRadius: '12px',
    marginBottom: '15px',
  },

  button: {
    border: 'none',
    padding: '12px 20px',
    borderRadius: '10px',
    background: '#00b894',
    color: '#fff',
    fontSize: '16px',
  },

  player: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '500px',
  },
}

export default App
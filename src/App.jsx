import { useEffect, useRef, useState } from 'react'
import { songs } from './songs'
import WavesBackground from './components/WavesBackground'

function App() {
  const audioRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [search, setSearch] = useState('')
  const [showSplash, setShowSplash] = useState(true)
  const [showNowPlaying, setShowNowPlaying] = useState(false)

  const currentSong = songs[currentIndex]

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase())
  )

  function playSong(index) {
    setCurrentIndex(index)
    setIsPlaying(true)
    setShowNowPlaying(true)
  }

  function togglePlay() {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  function nextSong() {
    setCurrentIndex((prev) => (prev + 1) % songs.length)
    setIsPlaying(true)
  }

  function prevSong() {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)
    setIsPlaying(true)
  }

  function formatTime(time) {
    if (!time) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  function handleProgress(e) {
    const value = e.target.value
    audioRef.current.currentTime = value
    setProgress(value)
  }

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play()
    }
  }, [currentIndex, isPlaying])

  if (showSplash) {
    return (
      <section className="splash">
        <div className="splash-content">
          <img src="/one-sound-emotion/cover.jpg" alt="Ondas e Emoções 2026" />
          <h1>Ondas e Emoções</h1>
          <p>2026</p>
          <span>Sinta cada onda. Viva cada emoção.</span>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* <WavesBackground /> */}

      <main className="app">
        <section className="hero">
          <div>
            <p className="small">Sua plataforma musical</p>
            <h1>One Sound Emotion</h1>
            <p className="subtitle">Ouça suas músicas online, grátis e direto do seu próprio app.</p>
          </div>
        </section>

        <input
          className="search"
          type="text"
          placeholder="Buscar música..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <section className="songs-grid">
          {filteredSongs.map((song) => {
            const realIndex = songs.findIndex(s => s.url === song.url)

            return (
              <button
                className={`song-card ${currentSong.url === song.url ? 'active' : ''}`}
                key={song.url}
                onClick={() => playSong(realIndex)}
              >
                <img src={song.cover} alt={song.title} />
                <h2>{song.title}</h2>
                <p>{song.artist}</p>
              </button>
            )
          })}
        </section>

        {showNowPlaying && (
          <section className="now-playing">
            <button className="close-now" onClick={() => setShowNowPlaying(false)}>
              ↓
            </button>

            <div className="now-bg">
              <img src={currentSong.cover} alt="" />
            </div>

            <div className="now-content">
              <p className="now-label">Tocando agora</p>

              <img
                className={`now-cover ${isPlaying ? 'rotating' : ''}`}
                src={currentSong.cover}
                alt={currentSong.title}
              />

              <h1>{currentSong.title}</h1>
              <p>{currentSong.artist}</p>

              <div className="now-progress">
                <div>
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={progress}
                  onChange={handleProgress}
                />
              </div>

              <div className="now-buttons">
                <button onClick={prevSong}>⏮</button>
                <button className="now-play" onClick={togglePlay}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={nextSong}>⏭</button>
              </div>
            </div>
          </section>
        )}

        <section className="player">
          <div className="player-info" onClick={() => setShowNowPlaying(true)}>
            <img src={currentSong.cover} alt={currentSong.title} />
            <div>
              <h3>{currentSong.title}</h3>
              <p>{currentSong.artist}</p>
            </div>
          </div>

          <div className="controls">
            <div className="buttons">
              <button onClick={prevSong}>⏮</button>
              <button className="play" onClick={togglePlay}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button onClick={nextSong}>⏭</button>
            </div>

            <div className="progress-area">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleProgress}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <audio
  	   ref={audioRef}
  	   src={currentSong.url}
  	   preload="metadata"
  	   onLoadedMetadata={() => setDuration(audioRef.current.duration)}
  	   onTimeUpdate={() => setProgress(audioRef.current.currentTime)}
  	   onEnded={nextSong}
         />
        </section>
      </main>
    </>
  )
}

export default App
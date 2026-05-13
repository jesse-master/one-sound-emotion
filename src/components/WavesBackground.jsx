import Particles from "react-tsparticles"
import { loadSlim } from "@tsparticles/slim"

function WavesBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="waves-background"
      options={{
        fullScreen: {
          enable: false
        },
        background: {
          color: {
            value: "transparent"
          }
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 90
          },
          color: {
            value: ["#00b894", "#00cec9", "#0984e3", "#00f5d4"]
          },
          links: {
            enable: true,
            color: "#00cec9",
            distance: 140,
            opacity: 0.45,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.5,
            random: true,
            straight: false,
            outModes: {
              default: "bounce"
            }
          },
          opacity: {
            value: 0.8
          },
          size: {
            value: { min: 1, max: 5 }
          }
        },
        detectRetina: true
      }}
    />
  )
}

export default WavesBackground
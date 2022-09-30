
import Particles from "react-particles-js";

export default function BackgroundParticles() {
  return (
    <Particles
      height="80%"
      width="80%"
      params={{
        background: {
          color: "transparent",
          // width: "100vh" 
        },
        particles: {
          color: {
            value: "#8b89ff"
          },
          line_linked: {
            color: {
              value: "#8b89ff"
            }
          },
          number: {
            value: 25
          },
          size: {
            value: 4
          }
        }
      }}
      className="particle_style"
      style={{
        position: "absolute",
        zIndex: -1
      }}
    />
  )
}
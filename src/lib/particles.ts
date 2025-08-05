export const particleConfig = {
  particles: {
    number: {
      value: 140,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#848D95" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#848D95" },
      polygon: { nb_sides: 5 }
    },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#61b3f6",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      push: { particles_nb: 4 },
      grab: {
        distance: 400,
        line_linked: { opacity: 1 }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: { distance: 200, duration: 0.4 }
    }
  },
  retina_detect: true
};

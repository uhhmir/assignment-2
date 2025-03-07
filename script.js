particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#39ff14' // Neon green color
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: 'img/github.svg',
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#39ff14', // Neon green color
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse' // Change to 'grab' or 'bubble' for different effects
            },
            onclick: {
                enable: true,
                mode: 'push' // Change to 'remove' or 'bubble' for different effects
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Matter.js setup
document.addEventListener('DOMContentLoaded', function() {
    const { Engine, Render, Runner, Bodies, Composite } = Matter;

    // Create an engine
    const engine = Engine.create();
    const world = engine.world;

    // Create a renderer
    const render = Render.create({
        element: document.getElementById('matter-js-container'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: 400,
            wireframes: false,
            background: 'transparent'
        }
    });

    Render.run(render);

    // Create a runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add boundaries
    const ground = Bodies.rectangle(window.innerWidth / 2, 390, window.innerWidth, 20, { isStatic: true });
    const leftWall = Bodies.rectangle(0, 200, 20, 400, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth, 200, 20, 400, { isStatic: true });
    const ceiling = Bodies.rectangle(window.innerWidth / 2, 10, window.innerWidth, 20, { isStatic: true });

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // Add bouncing triangles
    for (let i = 0; i < 10; i++) {
        const triangle = Bodies.polygon(Math.random() * window.innerWidth, Math.random() * 200, 3, 20, {
            restitution: 0.9,
            render: {
                fillStyle: '#39ff14'
            }
        });
        Composite.add(world, triangle);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: window.innerWidth, y: 400 }
        });
    });
});
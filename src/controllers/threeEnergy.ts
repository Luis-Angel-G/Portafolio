export const initThreeEnergy = async () => {
  const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>('.energy-canvas'));
  const THREE = await import('three');

  canvases.forEach((canvas) => {
    canvas.dataset.engine = `three.js r${THREE.REVISION}`;

    let renderer: InstanceType<typeof THREE.WebGLRenderer>;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas });
    } catch {
      canvas.classList.add('energy-canvas-fallback');
      canvas.dataset.engine = `three.js r${THREE.REVISION} unavailable`;
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 1.2, 6);

    const group = new THREE.Group();
    scene.add(group);

    const gold = new THREE.MeshBasicMaterial({ color: 0xffc857, transparent: true, opacity: 0.78 });
    const teal = new THREE.MeshBasicMaterial({ color: 0x42d8ff, transparent: true, opacity: 0.52 });
    const outer = new THREE.Mesh(new THREE.TorusGeometry(1.74, 0.035, 16, 128), gold);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.025, 16, 128), teal);
    outer.rotation.x = Math.PI * 0.5;
    inner.rotation.x = Math.PI * 0.5;
    group.add(outer, inner);

    const particles = new Float32Array(150 * 3);
    for (let i = 0; i < particles.length; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 1.25;
      particles[i] = Math.cos(angle) * radius;
      particles[i + 1] = -0.2 + Math.random() * 1.4;
      particles[i + 2] = Math.sin(angle) * radius;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.035, transparent: true, opacity: 0.75 });
    const field = new THREE.Points(geometry, material);
    group.add(field);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      camera.aspect = Math.max(width / Math.max(height, 1), 0.1);
      camera.updateProjectionMatrix();
    };

    let frame = 0;
    const animate = () => {
      frame += 0.01;
      outer.rotation.z += 0.008;
      inner.rotation.z -= 0.012;
      field.rotation.y += 0.003;
      group.position.y = Math.sin(frame * 2) * 0.08;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    animate();
  });
};

"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./rotating-earth-background.module.css";

type RotatingEarthBackgroundProps = {
  variant: "home" | "registration";
};

const EARTH_SURFACE_TEXTURE_4K = "/images/earth/earth-night.webp";
const EARTH_SURFACE_TEXTURE_8K = "/images/earth/earth-night-8k.webp";
const EARTH_ROTATION_MS = 48_000;
const INITIAL_EARTH_ROTATION = -2.18;
const MAX_DEVICE_PIXEL_RATIO = 1.5;

export function RotatingEarthBackground({
  variant,
}: RotatingEarthBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setMotionAllowed(!motionQuery.matches);

    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);

    return () => motionQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvasHost = canvasHostRef.current;

    if (!motionAllowed || !root || !canvasHost) {
      root?.removeAttribute("data-earth-ready");
      return;
    }

    let disposed = false;
    let failed = false;
    let contextUsable = true;
    let sceneReady = false;
    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;
    let animationFrame: number | null = null;
    let lastFrameTime: number | null = null;
    let rawContextReleased = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let globePositioner: import("three").Group | null = null;
    let rotatingGlobe: import("three").Group | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    const textures: import("three").Texture[] = [];
    const geometries: import("three").BufferGeometry[] = [];
    const materials: import("three").Material[] = [];

    const canvas = document.createElement("canvas");
    canvas.className = styles.canvas;
    canvas.setAttribute("aria-hidden", "true");

    const webglContext = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: "low-power",
      premultipliedAlpha: true,
    });

    // Requesting WebGL2 up front avoids downloading Three.js on unsupported
    // browsers and leaves the CSS Earth as the complete fallback.
    if (!webglContext) {
      return;
    }

    canvasHost.append(canvas);

    const stopAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      lastFrameTime = null;
    };

    const releaseRawContext = () => {
      if (rawContextReleased) {
        return;
      }

      rawContextReleased = true;
      webglContext.getExtension("WEBGL_lose_context")?.loseContext();
    };

    const renderScene = () => {
      if (!renderer || !scene || !camera || !contextUsable || failed || disposed) {
        return false;
      }

      try {
        renderer.render(scene, camera);
        return true;
      } catch {
        return false;
      }
    };

    const resizeAndRender = () => {
      if (!renderer || !camera || !globePositioner || failed || disposed) {
        return false;
      }

      const { width, height } = root.getBoundingClientRect();
      if (width < 1 || height < 1) {
        return true;
      }

      const aspect = width / height;
      const compact = width < 820;
      const narrow = width < 560;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO),
      );
      renderer.setSize(Math.round(width), Math.round(height), false);

      camera.aspect = aspect;
      camera.fov = narrow ? 42 : compact ? 36 : 33;
      camera.position.set(0, 0, 5.6);
      camera.updateProjectionMatrix();

      if (narrow) {
        globePositioner.position.set(0, -0.48, 0);
        globePositioner.scale.setScalar(0.9);
      } else if (compact) {
        globePositioner.position.set(0, -1.1, 0);
        globePositioner.scale.setScalar(1.5);
      } else {
        const globeScale = Math.min(2.75, Math.max(2.25, aspect * 1.14));
        globePositioner.position.set(0, globeScale * -0.93, 0);
        globePositioner.scale.setScalar(globeScale);
      }

      return renderScene();
    };

    const shouldAnimate = () =>
      sceneReady &&
      contextUsable &&
      isIntersecting &&
      isDocumentVisible &&
      !failed &&
      !disposed;

    const animate = (time: number) => {
      animationFrame = null;

      if (!shouldAnimate() || !rotatingGlobe) {
        lastFrameTime = null;
        return;
      }

      if (lastFrameTime !== null) {
        const elapsed = Math.min(time - lastFrameTime, 100);
        rotatingGlobe.rotation.y +=
          elapsed * ((Math.PI * 2) / EARTH_ROTATION_MS);
      }
      lastFrameTime = time;

      if (!renderScene()) {
        failed = true;
        destroyScene();
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      isDocumentVisible = !document.hidden;

      if (shouldAnimate()) {
        if (animationFrame === null) {
          animationFrame = window.requestAnimationFrame(animate);
        }
      } else {
        stopAnimation();
      }
    };

    const handleVisibilityChange = () => syncAnimation();

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextUsable = false;
      root.removeAttribute("data-earth-ready");
      stopAnimation();
    };

    const handleContextRestored = () => {
      if (disposed || failed) {
        return;
      }

      contextUsable = true;
      if (resizeAndRender()) {
        root.setAttribute("data-earth-ready", "true");
        syncAnimation();
      } else {
        failed = true;
        destroyScene();
      }
    };

    const destroyScene = () => {
      stopAnimation();
      root.removeAttribute("data-earth-ready");
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resizeAndRender);
      resizeObserver?.disconnect();
      resizeObserver = null;
      intersectionObserver?.disconnect();
      intersectionObserver = null;
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      for (const texture of textures.splice(0)) {
        texture.dispose();
      }
      for (const geometry of geometries.splice(0)) {
        geometry.dispose();
      }
      for (const material of materials.splice(0)) {
        material.dispose();
      }

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer = null;
        rawContextReleased = true;
      } else {
        releaseRawContext();
      }

      scene?.clear();
      scene = null;
      camera = null;
      globePositioner = null;
      rotatingGlobe = null;
      canvas.remove();
    };

    const initialize = async () => {
      try {
        const THREE = await import("three");

        if (disposed) {
          releaseRawContext();
          canvas.remove();
          return;
        }

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas,
          context: webglContext,
          powerPreference: "low-power",
          premultipliedAlpha: true,
        });
        renderer.setClearColor(0x030f2b, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.16;

        canvas.addEventListener("webglcontextlost", handleContextLost);
        canvas.addEventListener("webglcontextrestored", handleContextRestored);

        const textureLoader = new THREE.TextureLoader();
        const loadTexture = (url: string) =>
          textureLoader.loadAsync(url).then((texture) => {
            textures.push(texture);
            if (disposed || failed) {
              texture.dispose();
            }
            return texture;
          });
        const surfaceTexture = await loadTexture(
          renderer.capabilities.maxTextureSize >= 8192
            ? EARTH_SURFACE_TEXTURE_8K
            : EARTH_SURFACE_TEXTURE_4K,
        );

        if (disposed) {
          return;
        }
        const maximumAnisotropy = Math.min(
          renderer.capabilities.getMaxAnisotropy(),
          8,
        );

        surfaceTexture.colorSpace = THREE.SRGBColorSpace;
        surfaceTexture.anisotropy = maximumAnisotropy;
        surfaceTexture.magFilter = THREE.LinearFilter;
        surfaceTexture.minFilter = THREE.LinearMipmapLinearFilter;
        surfaceTexture.wrapS = THREE.RepeatWrapping;
        surfaceTexture.needsUpdate = true;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40);
        camera.position.z = 5.6;

        globePositioner = new THREE.Group();
        globePositioner.rotation.z = -0.04;
        scene.add(globePositioner);

        rotatingGlobe = new THREE.Group();
        rotatingGlobe.rotation.y = INITIAL_EARTH_ROTATION;
        globePositioner.add(rotatingGlobe);

        const earthGeometry = new THREE.SphereGeometry(1.45, 96, 64);
        const earthMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: surfaceTexture,
          toneMapped: false,
        });
        geometries.push(earthGeometry);
        materials.push(earthMaterial);
        rotatingGlobe.add(new THREE.Mesh(earthGeometry, earthMaterial));

        const atmosphereGeometry = new THREE.SphereGeometry(1.55, 72, 48);
        const atmosphereMaterial = new THREE.ShaderMaterial({
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fragmentShader: `
            uniform vec3 glowColor;
            varying vec3 vNormal;
            varying vec3 vViewDirection;

            void main() {
              float rim = pow(
                1.0 - max(0.0, dot(normalize(vNormal), normalize(vViewDirection))),
                3.4
              );
              gl_FragColor = vec4(glowColor, rim * 1.34);
            }
          `,
          side: THREE.FrontSide,
          transparent: true,
          uniforms: {
            glowColor: { value: new THREE.Color(0x8bdcff) },
          },
          vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewDirection;

            void main() {
              vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
              vNormal = normalize(normalMatrix * normal);
              vViewDirection = -modelViewPosition.xyz;
              gl_Position = projectionMatrix * modelViewPosition;
            }
          `,
        });
        geometries.push(atmosphereGeometry);
        materials.push(atmosphereMaterial);
        rotatingGlobe.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));

        scene.add(new THREE.AmbientLight(0x0d5cb8, 0.2));
        scene.add(new THREE.HemisphereLight(0xa8e4ff, 0x030f2b, 0.38));
        const keyLight = new THREE.DirectionalLight(0xeaf6ff, 4.2);
        keyLight.position.set(-1.4, 4.8, 4.2);
        scene.add(keyLight);
        const cobaltLight = new THREE.PointLight(0x168cf5, 1.6, 10);
        cobaltLight.position.set(3.4, -1.7, 3.2);
        scene.add(cobaltLight);

        const starCount = 360;
        const starPositions = new Float32Array(starCount * 3);
        const seededValue = (index: number, offset: number) => {
          const value = Math.sin(index * 12.9898 + offset * 78.233) * 43_758.5453;
          return value - Math.floor(value);
        };

        for (let index = 0; index < starCount; index += 1) {
          const positionIndex = index * 3;
          starPositions[positionIndex] = (seededValue(index, 1) - 0.5) * 13;
          starPositions[positionIndex + 1] = (seededValue(index, 2) - 0.5) * 7;
          starPositions[positionIndex + 2] = -2 - seededValue(index, 3) * 5;
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(starPositions, 3),
        );
        const starMaterial = new THREE.PointsMaterial({
          color: 0xa8e4ff,
          depthWrite: false,
          opacity: variant === "home" ? 0.42 : 0.32,
          size: 0.018,
          sizeAttenuation: true,
          transparent: true,
        });
        geometries.push(starGeometry);
        materials.push(starMaterial);
        const stars = new THREE.Points(starGeometry, starMaterial);
        stars.frustumCulled = false;
        scene.add(stars);

        resizeObserver = new ResizeObserver(() => {
          if (!resizeAndRender()) {
            failed = true;
            destroyScene();
          }
        });
        resizeObserver.observe(root);

        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            isIntersecting = entry?.isIntersecting ?? false;
            syncAnimation();
          },
          { threshold: 0.01 },
        );
        intersectionObserver.observe(root);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        sceneReady = true;
        if (!resizeAndRender()) {
          throw new Error("The Earth scene could not be rendered.");
        }

        root.setAttribute("data-earth-ready", "true");
        syncAnimation();
      } catch {
        if (!disposed) {
          failed = true;
          destroyScene();
        }
      }
    };

    void initialize();

    return () => {
      disposed = true;
      destroyScene();
    };
  }, [motionAllowed, variant]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${
        variant === "home" ? styles.home : styles.registration
      }`}
      aria-hidden="true"
    >
      <div className={styles.staticStars} />
      <div className={styles.fallbackEarth}>
        <span className={styles.fallbackSurface} />
      </div>
      <div ref={canvasHostRef} className={styles.webglLayer} />
      <div className={styles.contrastScrim} />
    </div>
  );
}

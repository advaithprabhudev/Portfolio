import { useEffect, useRef } from 'react';

type ThemeName = 'menu' | 'hero' | 'about' | 'career' | 'projects' | 'skills' | 'contact';
type Rgb = [number, number, number];
type Rgba = [number, number, number, number];

interface Palette {
  color1: Rgb;
  color2: Rgb;
  color3: Rgb;
}

const PALETTES: Record<ThemeName, Palette> = {
  menu: { color1: [21, 106, 194], color2: [195, 43, 50], color3: [5, 35, 70] },
  hero: { color1: [211, 242, 220], color2: [217, 204, 227], color3: [255, 248, 232] },
  about: { color1: [190, 220, 242], color2: [247, 181, 157], color3: [242, 241, 222] },
  career: { color1: [251, 201, 178], color2: [242, 113, 91], color3: [255, 237, 207] },
  projects: { color1: [246, 224, 143], color2: [239, 154, 105], color3: [240, 233, 211] },
  skills: { color1: [190, 222, 190], color2: [156, 207, 213], color3: [237, 238, 206] },
  contact: { color1: [215, 192, 226], color2: [237, 166, 186], color3: [247, 227, 207] },
};

// Ported verbatim from the Framer BalatroComponent (framer.com/m/BalatroComponent-Affs.js@0XumZtELyowlIXQU7LzT).
const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);

    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;

    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;

    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);

    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;

    vec2 uv2 = vec2(uv.x + uv.y);

    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }

    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);

    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`;

// Original component defaults (BalatroComponent's function-parameter defaults).
const SPIN_ROTATION = -2;
const SPIN_SPEED = 7;
const OFFSET: [number, number] = [0, 0];
const CONTRAST = 1.7;
const LIGHTING = 1;
const SPIN_AMOUNT = 0.25;
const PIXEL_FILTER = 1000;
const SPIN_EASE = 1;
const IS_ROTATE = false;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to create Balatro shader.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Unknown shader compilation error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function toUnitColor(color: Rgb): Rgba {
  return [color[0] / 255, color[1] / 255, color[2] / 255, 1];
}

function copyPalette(palette: Palette) {
  return {
    color1: toUnitColor(palette.color1),
    color2: toUnitColor(palette.color2),
    color3: toUnitColor(palette.color3),
  };
}

function blendColor(current: Rgba, target: Rgba, amount: number) {
  current[0] += (target[0] - current[0]) * amount;
  current[1] += (target[1] - current[1]) * amount;
  current[2] += (target[2] - current[2]) * amount;
  current[3] += (target[3] - current[3]) * amount;
}

function isThemeName(value: string | undefined): value is ThemeName {
  return Boolean(value && Object.prototype.hasOwnProperty.call(PALETTES, value));
}

export function BalatroBackground({ initialTheme = 'menu' }: { initialTheme?: ThemeName }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // ponytail: motion always on, ignoring prefers-reduced-motion — deliberate product decision so all visitors see the same visuals.
  const motionEnabled = true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let program: WebGLProgram | null = null;
    try {
      vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = gl.createProgram();
      if (!program) throw new Error('Unable to create Balatro shader program.');

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? 'Unable to link Balatro shader.');
      }
    } catch {
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, 'iTime'),
      resolution: gl.getUniformLocation(program, 'iResolution'),
      spinRotation: gl.getUniformLocation(program, 'uSpinRotation'),
      spinSpeed: gl.getUniformLocation(program, 'uSpinSpeed'),
      offset: gl.getUniformLocation(program, 'uOffset'),
      color1: gl.getUniformLocation(program, 'uColor1'),
      color2: gl.getUniformLocation(program, 'uColor2'),
      color3: gl.getUniformLocation(program, 'uColor3'),
      contrast: gl.getUniformLocation(program, 'uContrast'),
      lighting: gl.getUniformLocation(program, 'uLighting'),
      spinAmount: gl.getUniformLocation(program, 'uSpinAmount'),
      pixelFilter: gl.getUniformLocation(program, 'uPixelFilter'),
      spinEase: gl.getUniformLocation(program, 'uSpinEase'),
      isRotate: gl.getUniformLocation(program, 'uIsRotate'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
    };

    gl.uniform1f(uniforms.spinRotation, SPIN_ROTATION);
    gl.uniform1f(uniforms.spinSpeed, SPIN_SPEED);
    gl.uniform2f(uniforms.offset, OFFSET[0], OFFSET[1]);
    gl.uniform1f(uniforms.contrast, CONTRAST);
    gl.uniform1f(uniforms.lighting, LIGHTING);
    gl.uniform1f(uniforms.spinAmount, SPIN_AMOUNT);
    gl.uniform1f(uniforms.pixelFilter, PIXEL_FILTER);
    gl.uniform1f(uniforms.spinEase, SPIN_EASE);
    gl.uniform1i(uniforms.isRotate, IS_ROTATE ? 1 : 0);

    const current = copyPalette(PALETTES[initialTheme]);
    let target = copyPalette(PALETTES[initialTheme]);
    const pointer: [number, number] = [0.5, 0.5];
    const pointerTarget: [number, number] = [0.5, 0.5];
    let frame = 0;
    let elapsed = 0;
    let spinDirection = 1;
    let activeTheme: ThemeName = initialTheme;
    let previousTime = performance.now();
    let visible = !document.hidden;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (time: number) => {
      const delta = Math.min(0.05, (time - previousTime) / 1000);
      previousTime = time;
      const blend = motionEnabled ? 1 - Math.exp(-delta * 2.8) : 1;
      blendColor(current.color1, target.color1, blend);
      blendColor(current.color2, target.color2, blend);
      blendColor(current.color3, target.color3, blend);
      const pointerBlend = motionEnabled ? 1 - Math.exp(-delta * 10) : 1;
      const pointerX = motionEnabled ? pointerTarget[0] : 0.5;
      const pointerY = motionEnabled ? pointerTarget[1] : 0.5;
      pointer[0] += (pointerX - pointer[0]) * pointerBlend;
      pointer[1] += (pointerY - pointer[1]) * pointerBlend;
      if (motionEnabled) elapsed += delta * spinDirection;

      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform3f(uniforms.resolution, canvas.width, canvas.height, canvas.width / canvas.height);
      gl.uniform4fv(uniforms.color1, current.color1);
      gl.uniform4fv(uniforms.color2, current.color2);
      gl.uniform4fv(uniforms.color3, current.color3);
      gl.uniform2f(uniforms.mouse, pointer[0], pointer[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && motionEnabled) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerTarget[0] = event.clientX / Math.max(1, window.innerWidth);
      pointerTarget[1] = 1 - event.clientY / Math.max(1, window.innerHeight);
    };

    const onPointerLeave = () => {
      pointerTarget[0] = 0.5;
      pointerTarget[1] = 0.5;
    };

    const onResize = () => {
      resize();
      if (!motionEnabled) draw(performance.now());
    };

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-balatro-theme]'));
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
        let active: HTMLElement | undefined;
        let highestRatio = 0;
        sections.forEach((section) => {
          const ratio = ratios.get(section) ?? 0;
          if (ratio > highestRatio) {
            highestRatio = ratio;
            active = section;
          }
        });
        const themeName = active?.dataset.balatroTheme;
        if (isThemeName(themeName) && themeName !== activeTheme) {
          activeTheme = themeName;
          target = copyPalette(PALETTES[themeName]);
          spinDirection *= -1;
        }
        if (!motionEnabled) draw(performance.now());
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));

    const onVisibilityChange = () => {
      visible = !document.hidden;
      if (visible && motionEnabled) {
        previousTime = performance.now();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      } else if (visible) {
        draw(performance.now());
      } else {
        cancelAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener('resize', onResize);
    if (motionEnabled) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (motionEnabled) frame = requestAnimationFrame(draw);
    else draw(performance.now());

    return () => {
      visible = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [initialTheme, motionEnabled]);

  return (
    <div className="balatro-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

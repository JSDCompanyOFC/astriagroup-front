export const galaxyVertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSeed;
  attribute float aSize;
  attribute float aRandom;
  attribute float aRadius;
  attribute float aHalo;
  varying float vRandom;
  varying float vRadius;
  varying float vSeed;
  varying float vHalo;

  void main() {
    vec3 p = position;
    float drift = sin(uTime * 0.12 + aRandom * 8.0 + uSeed) * 0.009;
    p.y += drift * (0.2 + aRandom) * (1.0 - aHalo);
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    float collisionGlow = 1.0 + uProgress * 0.22;
    gl_PointSize = clamp(aSize * collisionGlow * (38.0 / -mvPosition.z) * (1.0 - aHalo * 0.28), 0.75, 6.5);
    gl_Position = projectionMatrix * mvPosition;
    vRandom = aRandom;
    vRadius = aRadius;
    vSeed = uSeed;
    vHalo = aHalo;
  }
`

export const galaxyFragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec3 uColor;
  varying float vRandom;
  varying float vRadius;
  varying float vSeed;
  varying float vHalo;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float soft = exp(-d * d * 25.0);
    float core = exp(-d * d * 110.0);
    float radialFade = 1.0 - smoothstep(2.0, 3.35, vRadius);
    float arm = 0.84 + 0.16 * sin(vRadius * 5.0 - vSeed * 2.0 + uTime * 0.08);
    float collision = 1.0 + uProgress * 0.18;
    float haloDim = mix(1.0, 0.34, vHalo);
    float alpha = (soft * 0.32 + core * 0.5) * (0.18 + vRandom * 0.52) * arm * radialFade * haloDim;
    float bulge = 1.0 - smoothstep(0.15, 1.4, vRadius);
    vec3 outerColor = mix(uColor, vec3(0.31, 0.43, 0.82), smoothstep(1.0, 2.8, vRadius) * 0.38);
    vec3 color = mix(outerColor, vec3(1.0, 0.86, 0.82), bulge * 0.72);
    color = mix(color, vec3(1.0, 0.94, 1.0), core * (0.35 + uProgress * 0.38));
    color *= collision;
    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

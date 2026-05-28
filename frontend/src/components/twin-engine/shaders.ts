export const flowParticleVertexShader = `
uniform float uTime;
uniform float uSpeed;
attribute float aProgressOffset;
varying float vAlpha;

void main() {
  float progress = mod(aProgressOffset + uTime * uSpeed, 1.0);
  vec3 transformedPosition = position;
  transformedPosition.y += sin((progress * 6.2831853) + (uTime * 1.4)) * 0.08 + 0.12;
  vec4 mvPosition = modelViewMatrix * vec4(transformedPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vAlpha = 0.3 + 0.7 * smoothstep(0.0, 1.0, sin((progress - 0.5) * 6.2831853) * 0.5 + 0.5);
  gl_PointSize = 5.0 * (1.0 / max(0.1, -mvPosition.z));
}
`;

export const flowParticleFragmentShader = `
precision mediump float;
varying float vAlpha;

void main() {
  float dist = distance(gl_PointCoord, vec2(0.5));
  float alpha = smoothstep(0.5, 0.08, dist) * vAlpha;
  gl_FragColor = vec4(0.247, 0.561, 0.568, alpha * 0.86);
}
`;

export const heatmapFragmentShader = `
precision mediump float;
uniform vec3 uHeatPoints[50];
uniform int uHeatPointCount;
varying vec2 vUv;

void main() {
  float energy = 0.0;
  for (int i = 0; i < 50; i++) {
    if (i >= uHeatPointCount) break;
    vec2 p = uHeatPoints[i].xy;
    float intensity = uHeatPoints[i].z;
    float d = distance(vUv, p);
    energy += exp(-18.0 * d * d) * intensity;
  }
  vec3 cyan = vec3(0.247, 0.561, 0.568);
  vec3 amber = vec3(0.753, 0.493, 0.121);
  vec3 red = vec3(0.761, 0.255, 0.227);
  vec3 color = mix(cyan, amber, smoothstep(0.15, 0.55, energy));
  color = mix(color, red, smoothstep(0.58, 0.92, energy));
  gl_FragColor = vec4(color, min(0.48, energy * 0.58));
}
`;

attribute vec4 aUvOffset;
varying vec2 vUv;
varying vec4 vUvOffset;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  vUv = uv;
  vUvOffset = aUvOffset;
}
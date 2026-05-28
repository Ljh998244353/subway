import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('digital-twin global font stack prefers CJK system fonts before Latin fonts', () => {
  const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const cjkIndex = css.indexOf('"Noto Sans CJK SC"');
  const interIndex = css.indexOf('Inter');

  assert.ok(cjkIndex >= 0, 'expected Noto Sans CJK SC in global font stack');
  assert.ok(interIndex >= 0, 'expected Inter fallback in global font stack');
  assert.ok(cjkIndex < interIndex, 'CJK fonts must precede Latin fonts for clearer Chinese rendering');
  assert.match(css, /-webkit-font-smoothing:\s*antialiased/);
  assert.match(css, /text-rendering:\s*geometricPrecision/);
});

test('merchant ranking board reserves readable width and gaps for Chinese names', () => {
  const component = readFileSync(new URL('../src/components/dashboard/MerchantGradingBoard.tsx', import.meta.url), 'utf8');

  assert.match(component, /grid-cols-\[40px_64px_minmax\(78px,1fr\)_88px_58px\]/);
  assert.match(component, /gap-x-3/);
});

test('digital-twin color system uses calmer semantic tones', () => {
  const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const commandBar = readFileSync(new URL('../src/components/dashboard/TwinCommandBar.tsx', import.meta.url), 'utf8');
  const viewport = readFileSync(new URL('../src/components/twin-engine/HybridViewport.tsx', import.meta.url), 'utf8');
  const shaders = readFileSync(new URL('../src/components/twin-engine/shaders.ts', import.meta.url), 'utf8');
  const combined = `${css}\n${commandBar}\n${viewport}\n${shaders}`;

  assert.match(css, /--brand-tech-blue:\s*#3f5fb5/);
  assert.match(css, /--flow-cyan:\s*#3f8f91/);
  assert.match(css, /rgba\(63, 95, 181, 0\.018\)/);
  assert.match(commandBar, /#3F5FB5/);
  assert.match(viewport, /#6EA6A6/);
  assert.match(shaders, /0\.247, 0\.561, 0\.568/);
  assert.doesNotMatch(combined, /#2F54EB|#13C2C2|#FF4D4F|#FAAD14/);
});

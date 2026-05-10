import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const css = readFileSync(new URL('./global.css', import.meta.url), 'utf8');

test('keeps tablet and mobile responsive breakpoints for the demo shell', () => {
  assert.match(css, /@media \(max-width: 1199px\)/);
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /\.shell-body\s*{[\s\S]*grid-template-columns:\s*var\(--sidebar-width\) minmax\(0, 1fr\);/);
  assert.match(css, /@media \(max-width: 1199px\)[\s\S]*\.shell-body\s*{[\s\S]*grid-template-columns:\s*1fr;/);
});

test('stacks demo workspaces and metric grids before narrow desktop widths', () => {
  assert.match(css, /@media \(max-width: 1199px\)[\s\S]*\.store-analysis-layout\s*{[\s\S]*grid-template-columns:\s*1fr;/);
  assert.match(css, /@media \(max-width: 1199px\)[\s\S]*\.store-alerts-layout,[\s\S]*\.digital-twin-layout,[\s\S]*\.alert-summary-grid,[\s\S]*\.twin-metric-grid,[\s\S]*\.customer-profile-grid\s*{[\s\S]*grid-template-columns:\s*1fr;/);
});

test('keeps dense tables and SVG twin plan from forcing page overflow on mobile', () => {
  assert.match(css, /@media \(max-width: 1199px\)[\s\S]*\.data-table\s*{[\s\S]*overflow-x:\s*auto;/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.floor-plan__svg\s*{[\s\S]*min-height:\s*420px;/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.profile-preference-row\s*{[\s\S]*grid-template-columns:\s*1fr;/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.store-list__item,[\s\S]*\.related-alert\s*{[\s\S]*grid-template-columns:\s*1fr;/);
});

test('keeps long labels and controls inside responsive containers', () => {
  assert.match(css, /button,[\s\S]*a,[\s\S]*span,[\s\S]*strong,[\s\S]*p,[\s\S]*h1,[\s\S]*h2,[\s\S]*h3\s*{[\s\S]*overflow-wrap:\s*anywhere;/);
  assert.match(css, /\.ghost-button,[\s\S]*\.primary-button\s*{[\s\S]*min-width:\s*0;/);
  assert.match(css, /\.filter-bar span\s*{[\s\S]*max-width:\s*100%;/);
  assert.match(css, /\.floor-plan\s*{[\s\S]*overflow:\s*hidden;/);
  assert.match(css, /\.floor-plan__svg\s*{[\s\S]*max-width:\s*100%;/);
  assert.match(css, /\.time-distribution\s*{[\s\S]*overflow-x:\s*auto;/);
});

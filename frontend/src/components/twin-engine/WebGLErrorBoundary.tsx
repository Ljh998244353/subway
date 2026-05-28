'use client';

import { Component, type ReactNode } from 'react';
import { SvgFallbackViewport } from './SvgFallbackViewport.tsx';
import type { TwinUrlState } from '../../types/index.ts';

interface BoundaryProps {
  state: TwinUrlState;
  children: ReactNode;
}

interface BoundaryState {
  failed: boolean;
}

export class WebGLErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <SvgFallbackViewport state={this.props.state} reason="WebGL 渲染异常，已切换为 SVG 正交平面图。" />;
    }
    return this.props.children;
  }
}

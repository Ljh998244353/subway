export const productionChunkNames = {
  react: 'vendor-react',
  three: 'vendor-three-core',
  drei: 'vendor-three-drei',
  r3f: 'vendor-three-r3f',
  motion: 'vendor-motion',
  router: 'vendor-router'
} as const;

export const productionChunkSizeWarningLimitKb = 800;

export function resolveProductionChunk(id: string): string | undefined {
  if (!id.includes('node_modules')) {
    return undefined;
  }

  if (id.includes('/@react-three/fiber/') || id.includes('\\@react-three\\fiber\\')) {
    return productionChunkNames.r3f;
  }

  if (id.includes('/@react-three/drei/') || id.includes('\\@react-three\\drei\\')) {
    return productionChunkNames.drei;
  }

  if (id.includes('/three/') || id.includes('\\three\\')) {
    return productionChunkNames.three;
  }

  if (id.includes('/framer-motion/') || id.includes('\\framer-motion\\') || id.includes('/motion/') || id.includes('\\motion\\')) {
    return productionChunkNames.motion;
  }

  if (id.includes('/react-router') || id.includes('\\react-router')) {
    return productionChunkNames.router;
  }

  if (id.includes('/react/') || id.includes('\\react\\') || id.includes('/react-dom/') || id.includes('\\react-dom\\')) {
    return productionChunkNames.react;
  }

  return undefined;
}

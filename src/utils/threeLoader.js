/**
 * Loader for three.js med CDN-first og fallback til lokal installation
 */

let THREE = null
let GLTFLoader = null

/**
 * Forsøger at loade three.js fra CDN, fallback til lokal installation
 */
export async function loadThree() {
  if (THREE && GLTFLoader) {
    return { THREE, GLTFLoader }
  }

  // Vent lidt på at CDN script kan loade
  await new Promise(resolve => setTimeout(resolve, 100))

  // Forsøg at bruge CDN version først
  if (window.THREE && window.THREE_CDN_LOADED) {
    try {
      // THREE kan være et modul objekt eller namespace direkte
      THREE = window.THREE.default || window.THREE
      
      // GLTFLoader skal importeres separat fra CDN
      const gltfLoaderModule = await import('https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/loaders/GLTFLoader.js')
      GLTFLoader = gltfLoaderModule.GLTFLoader || gltfLoaderModule.default
      
      console.log('✓ Three.js loaded from CDN')
      return { THREE, GLTFLoader }
    } catch (error) {
      console.warn('⚠ CDN GLTFLoader failed, falling back to local installation:', error)
    }
  }

  // Fallback til lokal installation
  try {
    const threeModule = await import('three')
    THREE = threeModule.default || threeModule
    const gltfLoaderModule = await import('three/examples/jsm/loaders/GLTFLoader.js')
    GLTFLoader = gltfLoaderModule.GLTFLoader
    console.log('✓ Three.js loaded from local installation')
    return { THREE, GLTFLoader }
  } catch (error) {
    console.error('✗ Failed to load three.js from both CDN and local installation:', error)
    throw error
  }
}


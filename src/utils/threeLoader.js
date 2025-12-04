/**
 * Loader for three.js - bruger lokal installation
 */

let THREE = null
let GLTFLoader = null

/**
 * Loader three.js fra lokal installation
 */
export async function loadThree() {
  if (THREE && GLTFLoader) {
    return { THREE, GLTFLoader }
  }

  try {
    // Import three.js fra lokal installation
    const threeModule = await import('three')
    THREE = threeModule.default || threeModule
    
    // Import GLTFLoader fra lokal installation
    const gltfLoaderModule = await import('three/examples/jsm/loaders/GLTFLoader.js')
    GLTFLoader = gltfLoaderModule.GLTFLoader
    
    console.log('✓ Three.js loaded from local installation')
    return { THREE, GLTFLoader }
  } catch (error) {
    console.error('✗ Failed to load three.js:', error)
    throw error
  }
}


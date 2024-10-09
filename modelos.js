import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Función para cargar modelos y añadirlos al OutlinePass
export function loadModel(scene, outlinePass) {
  const loader = new GLTFLoader();

  // Función auxiliar para cargar y configurar cada modelo
  const cargarModelo = (ruta, nombre, posicion, escala) => {
    loader.setPath(ruta);
    loader.load('scene.gltf', (gltf) => {
      const mesh = gltf.scene;
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      mesh.position.set(...posicion);
      mesh.scale.set(...escala);
      scene.add(mesh);
      outlinePass.selectedObjects.push(mesh);
      console.log(`Modelo ${nombre} cargado y añadido al outlinePass.`);
    }, undefined, (error) => {
      console.error(`Error al cargar el modelo ${nombre}:`, error);
    });
  };

 
  cargarModelo('Modelos/sputnik/', 'Sputnik', [0, 0, -1000], [5, 5, 5]);
  cargarModelo('Modelos/ISS/', 'ISS', [1000, 300, 0], [2, 2, 2]);
  cargarModelo('Modelos/hubble/', 'Hubble', [-1000, -150, 0], [3, 3, 3]);
  cargarModelo('Modelos/voyager/', 'Voyager', [0, 100, 1000], [3, 3, 3]);
}

export function loadSky(scene) {
  const loader = new GLTFLoader();

  // Cargar SkyBox
  loader.setPath('Modelos/SkyBox/');
  loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    mesh.position.set(-4500, -9000, 4000);
    mesh.scale.set(200, 200, 200);
    scene.add(mesh);
    console.log('SkyBox cargado.');
  }, undefined, (error) => {
    console.error('Error al cargar SkyBox:', error);
  });

  // Cargar Sun
  loader.setPath('Modelos/sun/');
  loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    mesh.position.set(5200, 800, 5200);
    mesh.scale.set(10, 10, 10);
    scene.add(mesh);
    console.log('Sun cargado.');
  }, undefined, (error) => {
    console.error('Error al cargar Sun:', error);
  });

  // Cargar Tierra
  loader.setPath('Modelos/tierra/');
  loader.load('scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    mesh.position.set(0, 0, 0);
    mesh.scale.set(100, 100, 100);
    scene.add(mesh);
    console.log('Tierra cargada.');
  }, undefined, (error) => {
    console.error('Error al cargar Tierra:', error);
  });
}

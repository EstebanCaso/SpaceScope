import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

// Función para cargar modelos y añadirlos al OutlinePass
export function loadModel(scene, outlinePass) {
  const loader = new GLTFLoader();

  const cargarModelo = (ruta, nombre, posicion, escala) => {
    loader.setPath(ruta);
    loader.load(
      'scene.gltf',
      (gltf) => {
        const mesh = gltf.scene;
        mesh.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = new THREE.MeshStandardMaterial({
              color: child.material.color,
              metalness: 0.5,
              roughness: 0.5,
            });
          }
        });
        mesh.position.set(...posicion);
        mesh.scale.set(...escala);
        scene.add(mesh);
        outlinePass.selectedObjects.push(mesh);
        console.log(`Modelo "${nombre}" cargado y añadido al OutlinePass.`);

      
        
      },
      undefined,
      (error) => {
        console.error(`Error al cargar el modelo "${nombre}":`, error);
      }
    );
  };

  cargarModelo('Modelos/sputnik/', 'Sputnik', [0, 0, -20000], [5, 5, 5]);
  cargarModelo('Modelos/ISS/', 'ISS', [40000, 6000, 0], [2, 2, 2]);
  cargarModelo('Modelos/hubble/', 'Hubble', [-30000, -4500, 0], [3, 3, 3]);
  cargarModelo('Modelos/voyager/', 'Voyager', [0, 5000, 40000], [3, 3, 3]);
  cargarModelo('Modelos/satelite/', 'Satelite', [11000, 500, 11000], [3, 3, 3]);
}



// Función para cargar el SkyBox y el Sol
export function loadSky(scene) {
  const loader = new GLTFLoader();

  // Cargar el SkyBox
  loader.setPath('Modelos/SkyBox/');
  loader.load(
    'scene.gltf',
    (gltf) => {
      const mesh = gltf.scene;
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      mesh.position.set(0, 0, 0);
      mesh.scale.set(80000, 80000, 80000);
      scene.add(mesh);
      console.log('SkyBox cargado.');
    },
    undefined,
    (error) => {
      console.error('Error al cargar el SkyBox:', error);
    }
  );

  // Cargar el Sol
  loader.setPath('Modelos/sun/');
  loader.load(
    'scene.gltf',
    (gltf) => {
      const mesh = gltf.scene;
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshStandardMaterial({
            emissive: new THREE.Color(0xffff00),
            emissiveIntensity: 1, // Intensidad de la emisión
          });
        }
      });
      mesh.position.set(82000, 8000, 50000);
      mesh.scale.set(60, 60, 60);
      scene.add(mesh);

      // Agregar luz direccional que simule la luz solar
      const sunLight = new THREE.DirectionalLight(0xffffff, 10); // Luz blanca con intensidad
      sunLight.position.copy(mesh.position); 
      sunLight.castShadow = true; 
      sunLight.shadow.mapSize.width = 1024; 
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.camera.near = 0.5;
      sunLight.shadow.camera.far = 100000;

      scene.add(sunLight);
      console.log('Sol cargado y luz solar añadida.');
    },
    undefined,
    (error) => {
      console.error('Error al cargar el Sol:', error);
    }
  );

  // Cargar la Luna
  loader.setPath('Modelos/Moon/');
loader.load(
  'scene.gltf',
  (gltf) => {
    const mesh = gltf.scene;
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          emissive: new THREE.Color(0xaaaaaa), // Cambiar a un color más brillante
          emissiveIntensity: 1, // Aumentar la intensidad de la emisión
        });
      }
    });
    mesh.position.set(-102000, 10000, -45000);
    mesh.scale.set(10, 10, 10);
    scene.add(mesh);

    // Agregar luz direccional que simule la luz lunar
    const moonLight = new THREE.DirectionalLight(0xffffff, 2); // Luz blanca con intensidad
    moonLight.position.copy(mesh.position); 
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024; 
    moonLight.shadow.mapSize.height = 1024;
    moonLight.shadow.camera.near = 0.5;
    moonLight.shadow.camera.far = 100000;

    scene.add(moonLight); 
    console.log('Luna cargada y luz lunar añadida.');
  },
  undefined,
  (error) => {
    console.error('Error al cargar la luna:', error);
  }
);


  // Cargar la Tierra
  loader.setPath('Modelos/tierra/');
  loader.load(
    'scene.gltf',
    (gltf) => {
      const mesh = gltf.scene;
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      mesh.position.set(0, 0, 0);
      mesh.scale.set(3000, 3000, 3000);
      scene.add(mesh);
      console.log('Tierra cargada.');
    },
    undefined,
    (error) => {
      console.error('Error al cargar la Tierra:', error);
    }
  );
}

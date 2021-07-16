import * as THREE from 'three';
import { createScene } from './scene';
import { createCamera } from './camera';
import { createRenderer } from './renderer';
import { Cube } from './Cube';
import { createLights } from './lights';
import { resizer } from './resizer';
import {Loop} from './Loop';
// import {createTerrain} from './terrain';

class World {
  constructor(container) {
    this._scene = createScene();
    this._camera = createCamera();
    this._renderer = createRenderer();
    container.appendChild(this._renderer.domElement);
    this._resizer = resizer(container, this._camera, this._renderer);
    this._time = 0.0;
    this._loop = new Loop(this._camera, this._scene, this._renderer);
    const cube = new Cube(1, 1, 1, 'black');
    cube.getCube().position.set(4, 0, 0);
    this._loop._objectsWithBehaviour.push(cube);
    const {light, aLight} = createLights();
    this._scene.add(cube.getCube(), light, aLight);
    this._clock = new THREE.Clock();
  }

  start() {
    this._loop.start(this._clock, this._time);
  }

  stop() {
    this._loop.stop();
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }
}
export { World };
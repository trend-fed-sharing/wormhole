//Get window size
var ww = window.innerWidth,
  wh = window.innerHeight;
  
//Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
renderer.setSize(ww, wh);

//Create an empty scene
var scene = new THREE.Scene();

//Create a perpsective camera
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
camera.position.z = 400;

var cubeGeom = new THREE.BoxGeometry(30,30,30);  
var cubeMat = new THREE.MeshBasicMaterial({color:0x3498db});  
var cube = new THREE.Mesh(cubeGeom, cubeMat);  
scene.add(cube);

function render() {

  cube.rotation.y += 0.02;
  cube.rotation.x += 0.02;
  cube.rotation.z += 0.02;

  //Render the scene
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
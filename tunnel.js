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
camera.position.z = 100;

//Array of points
var points = [
  [0, 2],
  [2, 10],
  [-1, 15],
  [-3, 20],
  [0, 25]
];

//Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = 0;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}
//Create a path from the points
var path = new THREE.CatmullRomCurve3(points);

//Create the tube geometry from the path
var geometry = new THREE.TubeGeometry( path, 128, 5, 15, false );
//Basic material
var material = new THREE.MeshBasicMaterial( { color: 0x777777 } );
//Create a mesh
var tube = new THREE.Mesh( geometry, material );
//Add tube into the scene
//tube.material.side = THREE.DoubleSide;
scene.add( tube );

var geo = new THREE.EdgesGeometry( tube.geometry ); // or WireframeGeometry
var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
var wireframe = new THREE.LineSegments( geo, mat );
//tube.add( wireframe );

function render(){

  //Rotate the tube
  tube.rotation.x += 0.02;

  //Render the scene
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
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
scene.fog = new THREE.Fog(0x000000, 30, 150);

//Create a perpsective camera
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
camera.position.z = 400;

//Array of points
var points = [
  [68.5, 185.5],
  [1, 262.5],
  [270.9, 281.9],
  [345.5, 212.8],
  [178, 155.7],
  [240.3, 72.3],
  [153.4, 0.6],
  [52.6, 53.3],
  [68.5, 185.5]
];

//Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = Math.random() * 100;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}
//Create a path from the points
var path = new THREE.CatmullRomCurve3(points);
path.closed = true;


var tubeDetail = 500;
// Define the precision of the circles
var circlesDetail = 16;

// Define the radius of the finale tube
var radius = 5;

var frames = path.computeFrenetFrames(tubeDetail, true);

var color = new THREE.Color(0x000000);

//noise.seed(Math.random());

for (var i = 0; i < circlesDetail; i++) {

  for (var j = 0; j < tubeDetail; j++) {
    // Get the normal values for each circle
    var k = (j + 1) >= tubeDetail ? 0 : j + 1;
    var normal_start = frames.normals[j];
    var normal_end = frames.normals[k];
    // Get the binormal values
    var binormal_start = frames.binormals[j];
    var binormal_end = frames.binormals[k];
    // Calculate the index of the circle (from 0 to 1)
    var index_start = j / tubeDetail;
    var index_end = k / tubeDetail;
    // Get the coordinates of the point in the center of the circle
    var p_start = path.getPointAt(index_start);
    var p_end = path.getPointAt(index_end);

    var angle = (i / circlesDetail) * Math.PI * 2;
    //angle += noise.simplex2(index*10,0);
    // Calculate the sine of the angle
    var sin = Math.sin(angle);
    // Calculate the cosine from the angle
    var cos = -Math.cos(angle);

    var normalPoint = new THREE.Vector3(0,0,0);
    normalPoint.x = (cos * normal_start.x + sin * binormal_start.x);
    normalPoint.y = (cos * normal_start.y + sin * binormal_start.y);
    normalPoint.z = (cos * normal_start.z + sin * binormal_start.z);  
    normalPoint.multiplyScalar(radius);

    var geometry = new THREE.Geometry();  
    var position = p_start.clone();

    var color = new THREE.Color("hsl("+(index_start * 360 * 4)+",50%,50%)");

    position.add(normalPoint);
    geometry.vertices.push(position);
    geometry.colors.push(color);

    normalPoint.x = (cos * normal_end.x + sin * binormal_end.x);
    normalPoint.y = (cos * normal_end.y + sin * binormal_end.y);
    normalPoint.z = (cos * normal_end.z + sin * binormal_end.z);
    normalPoint.multiplyScalar(radius);

    position = p_end.clone();

    color = new THREE.Color("hsl("+(index_end * 360 * 4)+",50%,50%)");

    position.add(normalPoint);
    geometry.vertices.push(position);
    geometry.colors.push(color);     

    var material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});

    var line = new THREE.Line(geometry, material);
    scene.add(line); 
    // Loop for the amount of particles we want along each circle
  }
}

var percentage = 0;  

function render() {
  
  percentage += 0.0005;
  // Get the point where the camera should go
  var p1 = path.getPointAt(percentage % 1);
  // Get the point where the camera should look at
  var p2 = path.getPointAt((percentage + 0.01) % 1);
  camera.position.set(p1.x, p1.y, p1.z);
  camera.lookAt(p2);

  // Render the scene
  renderer.render(scene, camera);

  // Animation loop
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
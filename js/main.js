// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// var container = document.getElementById('content');
// var height = container.offsetHeight;
// var width = container.offsetWidth;
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(width, height);
// // document.body.appendChild(renderer.domElement);
// container.appendChild(renderer.domElement);

// var geometry = new THREE.CubeGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({
// 	color: 0x00ff00
// });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// var render = function() {
// 	requestAnimationFrame(render);

// 	cube.rotation.x += 0.1;
// 	cube.rotation.y += 0.1;

// 	renderer.render(scene, camera);
// };

// render();


var container, stats;

var camera, scene, renderer;

var mouseX = 0,
	mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {

	// container = document.createElement('div');
	// document.body.appendChild(container);


	var container = document.getElementById('content');
	var height = container.offsetHeight;
	var width = container.offsetWidth;
	// var renderer = new THREE.WebGLRenderer();
	// renderer.setSize(width, height);
	// document.body.appendChild(renderer.domElement);
	// container.appendChild(renderer.domElement);


	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = 100;

	// scene

	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight(0x101030);
	scene.add(ambient);

	var directionalLight = new THREE.DirectionalLight(0xffeedd);
	directionalLight.position.set(0, 0, 1).normalize();
	scene.add(directionalLight);

	// model

	var loader = new THREE.OBJMTLLoader();
	loader.load('obj/male02.obj', 'obj/male02_dds.mtl', function(object) {

		object.position.y = -80;
		scene.add(object);

	});

	//

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	
	// renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	document.addEventListener('mousemove', onDocumentMouseMove, false);

	//

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

	mouseX = (event.clientX - windowHalfX) / 2;
	mouseY = (event.clientY - windowHalfY) / 2;

}

//

function animate() {

	requestAnimationFrame(animate);
	render();

}

function render() {

	camera.position.x += (mouseX - camera.position.x) * .05;
	camera.position.y += (-mouseY - camera.position.y) * .05;

	camera.lookAt(scene.position);

	renderer.render(scene, camera);

}
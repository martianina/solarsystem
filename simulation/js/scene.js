var scene, camera, renderer, controls, stats, light;
var earth, jupiter, mars, mercury, moon, neptune, saturn, satun, sky, sun, uranus, venus;
var mercuryOrbit, venusOrbit, earthOrbit, moonOrbit, marsOrbit, jupiterOrbit, saturnOrbit, saturnOrbit, uranusOrbit, neptuneOrbit;
var loader = new THREE.TextureLoader();

function init() {
    // SCENE
    scene = new THREE.Scene();

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x000000, 1 );
    document.body.appendChild(renderer.domElement);

    // CAMERA
    var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 20000;
    // var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 1, FAR = 500;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    // enable animation loop when using damping or autorotation
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.25;
    // controls.enableZoom = false;

    // MASH OBJECTS
    addObjects();

    // ADD LICHTS
    addLights();

    // SKYBOX/FOG
    // var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    // var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    // var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    // scene.add(skyBox);
    // scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

    // axes
    // var axes = new THREE.AxisHelper(100);
    // scene.add( axes );

    // var imagePrefix = "images/dawnmountain-";
    // var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    // var imageSuffix = ".png";
    // var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

    // var materialArray = [];
    // for (var i = 0; i < 6; i++)
    //     materialArray.push( new THREE.MeshBasicMaterial({
    //         map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
    //         side: THREE.BackSide
    //     }));
    // var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    // var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    // scene.add( skyBox );





    // STATS
    stats = new Stats();
    document.getElementById('container').appendChild( stats.dom );

    // GUI/options
    var gui = new dat.GUI();
    // addGui();
}

function addObjects() {
    var defaultMaterial = new THREE.MeshPhongMaterial( { color:0x000000, shading: THREE.SmoothShading, shininess: 0 } );

// SUN
    var sunMaterial = new THREE.MeshPhongMaterial({shininess:0});
     // sunMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true } );
    sun = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    sun.position.set(0, 0, 0);
    scene.add( sun );

    getTexture('simulation/textures/sun.png', function (texture) {
        sunMaterial.map = texture;
        sun.material = sunMaterial;
        // sun.lightMap
    });

// Mercury
    mercuryOrbit = new THREE.Object3D();
    var mercuryMaterial = new THREE.MeshPhongMaterial({shininess:0});
    mercury = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    mercury.position.set(50, 0, 0);
    scene.add( mercuryOrbit );
    mercuryOrbit.add( mercury );

    getTexture('simulation/textures/mercury.jpg', function (texture) {
        mercuryMaterial.map = texture;
        mercury.material = mercuryMaterial;
    });
    getTexture('simulation/textures/mercury-normal.png', function (texture) {
        mercuryMaterial.normalMap = texture;
        mercury.material = mercuryMaterial;
    });

// Venus
    venusOrbit = new THREE.Object3D();
    var venusMaterial = new THREE.MeshPhongMaterial({shininess:0});
    venus = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    venus.position.set(100, 0, 0);
    scene.add(venusOrbit);
    venusOrbit.add( venus );

    getTexture('simulation/textures/venus.jpg', function (texture) {
        venusMaterial.map = texture;
        venus.material = venusMaterial;
    });
    getTexture('simulation/textures/venus-normal.png', function (texture) {
        venusMaterial.normalMap = texture;
        venus.material = venusMaterial;
    });

// Earth
    earthOrbit = new THREE.Object3D();
    var earthMaterial = new THREE.MeshPhongMaterial({shininess:10});
    earth = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    earth.position.set(175, 0, 0);
    scene.add(earthOrbit);
    earthOrbit.add( earth );

    getTexture('simulation/textures/earth.jpg', function (texture) {
        earthMaterial.map = texture;
        earth.material = earthMaterial;
    });
    getTexture('simulation/textures/earth-normal.png', function (texture) {
        earthMaterial.normalMap = texture;
        earth.material = earthMaterial;
    });
    getTexture('simulation/textures/earth-specular.jpg', function (texture) {
        earthMaterial.specularMap = texture;
        earth.material = earthMaterial;
    });

// Moon
    moonOrbit = new THREE.Object3D();
    var moonMaterial = new THREE.MeshPhongMaterial({shininess:0});
    moon = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    moon.position.set(25, 0, 0);
    earth.add( moon );

    getTexture('simulation/textures/moon.jpg', function (texture) {
        moonMaterial.map = texture;
        moon.material = moonMaterial;
    });
    getTexture('simulation/textures/moon-normal.png', function (texture) {
        moonMaterial.normalMap = texture;
        moon.material = moonMaterial;
    });

// Mars
    marsOrbit = new THREE.Object3D();
    var marsMaterial = new THREE.MeshPhongMaterial({shininess:0});
    mars = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    mars.position.set(250, 0, 0);
    scene.add(marsOrbit);
    marsOrbit.add( mars );

    getTexture('simulation/textures/mars.jpg', function (texture) {
        marsMaterial.map = texture;
        mars.material = marsMaterial;
    });
    getTexture('simulation/textures/mars-normal.png', function (texture) {
        marsMaterial.normalMap = texture;
        mars.material = marsMaterial;
    });

// Jupiter
    jupiterOrbit = new THREE.Object3D();
    var jupiterMaterial = new THREE.MeshPhongMaterial({shininess:0});
    jupiter = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    jupiter.position.set(300, 0, 0);
    scene.add(jupiterOrbit);
    jupiterOrbit.add( jupiter );

    getTexture('simulation/textures/jupiter.jpg', function (texture) {
        jupiterMaterial.map = texture;
        jupiter.material = jupiterMaterial;
    });

// Saturn
    saturnOrbit = new THREE.Object3D();
    var saturnMaterial = new THREE.MeshPhongMaterial({shininess:0});
    saturn = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    saturn.position.set(350, 0, 0);
    scene.add(saturnOrbit);
    saturnOrbit.add( saturn );

    getTexture('simulation/textures/saturn.jpg', function (texture) {
        saturnMaterial.map = texture;
        saturn.material = saturnMaterial;
    });

// Uranus
    uranusOrbit = new THREE.Object3D();
    var uranusMaterial = new THREE.MeshPhongMaterial({shininess:0});
    uranus = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    uranus.position.set(400, 0, 0);
    scene.add(uranusOrbit);
    uranusOrbit.add( uranus );

    getTexture('simulation/textures/uranus.jpg', function (texture) {
        uranusMaterial.map = texture;
        uranus.material = uranusMaterial;
    });

// Neptune
    neptuneOrbit = new THREE.Object3D();
    var neptuneMaterial = new THREE.MeshPhongMaterial({shininess:0});
    neptune = new THREE.Mesh( new THREE.SphereGeometry(10, 30, 30), defaultMaterial );
    neptune.position.set(450, 0, 0);
    scene.add( neptuneOrbit );
    neptuneOrbit.add( neptune );

    getTexture('simulation/textures/neptune.jpg', function (texture) {
        neptuneMaterial.map = texture;
        neptune.material = neptuneMaterial;
    });

}

function addLights () {
    // var lights = [];
    // lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    // lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    // lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    // lights[ 0 ].position.set( 0, 200, 0 );
    // lights[ 1 ].position.set( 100, 200, 100 );
    // lights[ 2 ].position.set( - 100, - 200, - 100 );

    // scene.add( lights[ 0 ] );
    // scene.add( lights[ 1 ] );
    // scene.add( lights[ 2 ] );

// Sun
    light = new THREE.PointLight( 0xffffff, 0.9);
    light.position.set( 0, 0, 0 );
    scene.add( light );

    // light = new THREE.DirectionalLight( 0x999999 );
    // light.position.set( -1, -1, -1 );
    // scene.add( light );
    // light = new THREE.AmbientLight( 0x555555 );
    // light = new THREE.AmbientLight( 0xeeeeee );
    scene.add( new THREE.AmbientLight( 0x555555 ) );

    // addLight( 0.55, 0.9, 0.5, 5000, 0, -1000 );
    // addLight( 0.08, 0.8, 0.5,    0, 0, -1000 );
    // addLight( 0.995, 0.5, 0.9, 5000, 5000, -1000 );
    // function addLight( h, s, l, x, y, z ) {
    //     var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    //     light.color.setHSL( h, s, l );
    //     light.position.set( x, y, z );
    //     scene.add( light );
    //     // var flareColor = new THREE.Color( 0xffffff );
    //     // flareColor.setHSL( h, s, l + 0.5 );
    // }
}

function animate() {

    requestAnimationFrame( animate );

    // controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    sun.rotation.x += 0.001;
    sun.rotation.y += 0.002;
    moon.rotation.y += 0.01;
    earth.rotation.y += 0.01;

    mercuryOrbit.rotation.y += 0.001;
    venusOrbit.rotation.y += 0.002;
    earthOrbit.rotation.y += 0.003;
    moonOrbit.rotation.y += 0.004;
    marsOrbit.rotation.y += 0.005;
    jupiterOrbit.rotation.y += 0.006;
    saturnOrbit.rotation.y += 0.007;
    saturnOrbit.rotation.y += 0.008;
    uranusOrbit.rotation.y += 0.009;
    neptuneOrbit.rotation.y += 0.01;

    // earth.translateZ(1);

    stats.update();
    renderer.render( scene, camera );
}

function getTexture(url, callback) {
    loader.load(
        // resource URL
        url,
        // Function when resource is loaded
        function ( texture ) {
            callback(texture);
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
}

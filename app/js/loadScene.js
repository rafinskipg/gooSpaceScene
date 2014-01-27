require([
	'goo/entities/GooRunner',
	'goo/statemachine/FSMSystem',
	'goo/addons/howler/systems/HowlerSystem',
	'goo/loaders/DynamicLoader',
	'goo/entities/SystemBus',
	'goo/entities/components/CameraComponent'
	,"goo/renderer/Camera",
	'goo/math/Vector3',
	'goo/entities/components/ScriptComponent',
	'goo/scripts/WASDControlScript',
	'goo/scripts/MouseLookControlScript',
	'goo/entities/EntityUtils',
	'goo/renderer/light/PointLight',
	'goo/scripts/OrbitCamControlScript',
	'goo/renderer/Renderer',
	'js/spaceObject'
], function (
	GooRunner,
	FSMSystem,
	HowlerSystem,
	DynamicLoader,
	SystemBus,
	CameraComponent,
	Camera,
	Vector3,
	ScriptComponent,
	WASDControlScript,
	MouseLookControlScript,
	EntityUtils,
	PointLight,
	OrbitCamControlScript,
	Renderer,
	spaceObject
) {
	'use strict';

	function init() {

		// If you try to load a scene without a server, you're gonna have a bad time
		if (window.location.protocol==='file:') {
			alert('You need to run this webpage on a server. Check the code for links and details.');
			return;

			/*

			Loading scenes uses AJAX requests, which require that the webpage is accessed via http. Setting up
			a web server is not very complicated, and there are lots of free options. Here are some suggestions
			that will do the job and do it well, but there are lots of other options.

			- Windows

			There's Apache (http://httpd.apache.org/docs/current/platform/windows.html)
			There's nginx (http://nginx.org/en/docs/windows.html)
			And for the truly lightweight, there's mongoose (https://code.google.com/p/mongoose/)

			- Linux
			Most distributions have neat packages for Apache (http://httpd.apache.org/) and nginx
			(http://nginx.org/en/docs/windows.html) and about a gazillion other options that didn't
			fit in here.
			One option is calling 'python -m SimpleHTTPServer' inside the unpacked folder if you have python installed.


			- Mac OS X

			Most Mac users will have Apache web server bundled with the OS.
			Read this to get started: http://osxdaily.com/2012/09/02/start-apache-web-server-mac-os-x/

			*/
		}

		// Make sure user is running Chrome/Firefox and that a WebGL context works
		var isChrome, isFirefox, isIE, isOpera, isSafari, isCocoonJS;
		isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
			isFirefox = typeof InstallTrigger !== 'undefined';
			isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
			isChrome = !!window.chrome && !isOpera;
			isIE = false || document.documentMode;
			isCocoonJS = navigator.appName === "Ludei CocoonJS";
		if (!(isFirefox || isChrome || isSafari || isCocoonJS || isIE === 11)) {
			alert("Sorry, but your browser is not supported.\nGoo works best in Google Chrome or Mozilla Firefox.\nYou will be redirected to a download page.");
			window.location.href = 'https://www.google.com/chrome';
		} else if (!window.WebGLRenderingContext) {
			alert("Sorry, but we could not find a WebGL rendering context.\nYou will be redirected to a troubleshooting page.");
			window.location.href = 'http://get.webgl.org/troubleshooting';
		} else {

			// Preventing brower peculiarities to mess with our control
			document.body.addEventListener('touchstart', function(event) {
				event.preventDefault();
			}, false);
			// Loading screen callback
			var progressCallback = function (handled, total) {
				var loadedPercent = (100*handled/total).toFixed();
				var loadingOverlay = document.getElementById("loadingOverlay");
				var progressBar = document.getElementById("progressBar");
				var progress = document.getElementById("progress");
				var loadingMessage = document.getElementById("loadingMessage");
				loadingOverlay.style.display = "block";
				loadingMessage.style.display = "block";
				progressBar.style.display = "block";
				progress.style.width = loadedPercent + "%";
			};

			// Create typical Goo application
			var goo = new GooRunner({
				antialias: true,
				manuallyStartGameLoop: true
			});
			var fsm = new FSMSystem(goo);
			goo.world.setSystem(fsm);
			goo.world.setSystem(new HowlerSystem());

			// The loader takes care of loading the data
			var loader = new DynamicLoader({
				world: goo.world,
				rootPath: 'res',
				progressCallback: progressCallback});

			loader.loadFromBundle('project.project', 'root.bundle', {recursive: false, preloadBinaries: true}).then(function(configs) {

				// This code will be called when the project has finished loading.
				goo.renderer.domElement.id = 'goo';
				document.body.appendChild(goo.renderer.domElement);

				// Application code goes here!
				var cameras = [];
				var indexCameras = 0;
				var changeCamera = true;
				//Inside ship camera
				var outsideAllCamera = loader.getCachedObjectForRef('entities/Camera_0.entity');
				cameras.push(outsideAllCamera);
				//Renderer.mainCamera = outsideAllCamera.cameraComponent.camera;
				//goo.renderSystem.camera = outsideAllCamera.cameraComponent.camera;
				
				//Orbit camera
				var camera = new Camera(45, 2, 2.1, 150000);
				var orbitCamera = 	EntityUtils.createTypicalEntity(goo.world, camera, new OrbitCamControlScript(), [2,2,5]);
				orbitCamera.transformComponent.transform.translation.set(100, 80, 0);
				var scripts = new ScriptComponent();
				scripts.scripts.push(new WASDControlScript({
				    domElement : goo.renderer.domElement,
				    walkSpeed : 2500.0,
				    crawlSpeed : 100.0
				}));
				orbitCamera.setComponent(scripts);
				cameras.push(orbitCamera);

				//Long distance camera
				var camera = new Camera(45, 1, 1, 150000);
				var insideShipCamera = goo.world.createEntity("CameraEntity");
				insideShipCamera.transformComponent.transform.translation.set(10, 8, 0);
				insideShipCamera.transformComponent.transform.lookAt(new Vector3(-5, 8, 0), Vector3.UNIT_Y);
				insideShipCamera.setComponent(new CameraComponent(camera));

				// Camera control set up
				var scripts = new ScriptComponent();
				scripts.scripts.push(new WASDControlScript({
				    domElement : goo.renderer.domElement,
				    walkSpeed : 2500.0,
				    crawlSpeed : 100.0
				}));
				scripts.scripts.push(new MouseLookControlScript({
				    domElement : goo.renderer.domElement
				}));
				insideShipCamera.setComponent(scripts);
				cameras.push(insideShipCamera);
                

        
				spaceObject.loadSizes();
				spaceObject.createObjects(goo);
				spaceObject.getCameras().forEach(function(i){
					cameras.push(i);
				});
				console.log(cameras);

				var light = new PointLight();
				light.color.set( 1,1,0);
				var lightEntity = EntityUtils.createTypicalEntity( goo.world, light);
				lightEntity.addToWorld();

			
				///Change cameras
				///
				cameras.forEach( function(cam){
        	cam.addToWorld();
        });

				goo.world.process();

				var getMainCamera = function(){
					if(indexCameras >= cameras.length){
						indexCameras = 0;
					}
					var camera = cameras[indexCameras].cameraComponent.camera;
					indexCameras += 1;
					return camera;
				}

				SystemBus.emit('goo.setCurrentCamera', { 
				  camera: getMainCamera()
				});

				
				window.onkeyup= function(e){
					if(e.which == 32){
						changeCamera = true;	
					}
				}

				goo.callbacks.push(function() {
					if(changeCamera === true){
						goo.world.process();
						SystemBus.emit('goo.setCurrentCamera', { 
						  camera: getMainCamera()
						});
						changeCamera = false;
					}
				});

				// Start the rendering loop!
				goo.startGameLoop();

			}).then(null, function(e) {
				// If something goes wrong, 'e' is the error message from the engine.
				alert('Failed to load scene: ' + e);
			});

		}
	}

	init();
});

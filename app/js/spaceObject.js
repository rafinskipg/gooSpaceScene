define([
  'goo/renderer/Material',
  'goo/renderer/TextureCreator',
  'js/computeSize',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'goo/renderer/shaders/ShaderLib',
  "goo/renderer/Camera",
  'goo/entities/components/CameraComponent',
  'goo/math/Vector3'
  
], function(
  Material,
  TextureCreator,
  computeSize,
  ShapeCreator,
  EntityUtils,
  ShaderLib,
  Camera,
  CameraComponent,
  Vector3
){
  var objectCreator =  {}, sizes, cameras = [];
  var sunSize = 10000;
  var goo ;
  //Astronomic things 
  var tc = new TextureCreator();
  var sunTex = tc.loadTexture2D('images/sun.png');
  var earthTex = tc.loadTexture2D('images/earth.jpg');
  var moonTex = tc.loadTexture2D('images/moon.jpg');
  var mercuryTex = tc.loadTexture2D('images/mercury.jpg');
  var marsTex = tc.loadTexture2D('images/mars.jpg');
  var venusTex = tc.loadTexture2D('images/venus.jpg');
  var jupiterTex = tc.loadTexture2D('images/jupiter.jpg');
  var neptuneTex = tc.loadTexture2D('images/neptune.jpg');
  var saturnTex = tc.loadTexture2D('images/saturn.jpg');
  var uranusTex = tc.loadTexture2D('images/uranus.jpg');

  var createAstronomicalObject = function(radius, texture) {
    var meshData = ShapeCreator.createSphere(24, 24, radius);
    var material = Material.createMaterial(ShaderLib.uber);
    material.setTexture('DIFFUSE_MAP', texture);
    var entity = EntityUtils.createTypicalEntity(goo.world, meshData, material, {
      run: function (entity) {
        entity.transformComponent.setRotation( 0, goo.world.time * 0.005, 0);
      }
    });
    entity.addToWorld();
    return entity;
  };


  var createObjectAndCamera = function(size,dist,text,sun){
    var obj = createAstronomicalObject(size*10, text);
    obj.transformComponent.setTranslation(sunSize + dist, 1, 0);
    obj.meshRendererComponent.materials[0].uniforms.materialAmbient = [1,1,1,1];
    sun.transformComponent.attachChild(obj.transformComponent);
    var camera = new Camera(45, 1, 1, 1000000);
    var newCamera = goo.world.createEntity("CameraEntity");
    obj.transformComponent.attachChild( newCamera.transformComponent);
    newCamera.transformComponent.transform.lookAt(new Vector3(-50000, 8, 0), Vector3.UNIT_Y);
    newCamera.setComponent(new CameraComponent(camera));
    cameras.push(newCamera);

    return obj;
  };

  objectCreator.loadSizes = function(){
    
    sizes =  computeSize.compute(sunSize);
    console.log(sizes);
  };

  objectCreator.createObjects = function(gooCreated){
    var objects = [];
    goo = gooCreated;
    var sun = createAstronomicalObject(sunSize, sunTex);
    sun.meshRendererComponent.materials[0].uniforms.materialAmbient = [1,1,0.3,1];
    sun.transformComponent.setTranslation( -100000, 30, 0);
    //Merc
    var mercury = createObjectAndCamera(sizes.merc_size,sizes.merc_dist_meter, mercuryTex,sun); 
    //Venus
    var venus = createObjectAndCamera(sizes.venus_size,sizes.venus_dist_meter, venusTex,sun);
    //Earth
    var earth = createObjectAndCamera(sizes.earth_size, sizes.earth_dist_meter, earthTex,sun); 
    //Moon
    var moon = createAstronomicalObject(5.15, moonTex);
    moon.transformComponent.setTranslation( 31.4, 0, 0);
    moon.meshRendererComponent.materials[0].uniforms.materialAmbient = [1,1,1,1];
    earth.transformComponent.attachChild( moon.transformComponent);

    //Mars
    var mars = createObjectAndCamera(sizes.mars_size, sizes.mars_dist_meter, marsTex,sun); 

    //jupiter
    var jupiter = createObjectAndCamera(sizes.jupiter_size, sizes.jupiter_dist_meter, jupiterTex,sun); 
    //saturn
    var saturn = createObjectAndCamera(sizes.saturn_size, sizes.saturn_dist_meter, saturnTex,sun); 

     //uranus
    var uranus = createObjectAndCamera(sizes.uranus_size, sizes.uranus_dist_meter, uranusTex,sun); 
     //neptune
    var neptune = createObjectAndCamera(sizes.neptune_size, sizes.neptune_dist_meter, neptuneTex,sun); 
  }

  objectCreator.getCameras = function (){
    console.log(cameras);
    return cameras;
  }
   return objectCreator;
});

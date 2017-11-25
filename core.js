// Initialize Babylon Canvas Rendering //

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var preloader = new BABYLON.AssetsManager(scene);
    // Scene Starts
    //            BABYLON.SceneLoader.ImportMesh("", "assets/", "untitled.babylon", scene, function(newMeshes, particleSystems, skeletons) {
    //                //          for(var i=0; i<scene.meshes.length; i++){
    //                //              scene.meshes[i].checkCollisions=true;
    //                //            }
    //            });
    //            BABYLON.SceneLoader.Load("assets/", "GalleryInterior.obj", engine, function(newScene) {
    //                // newScene[0].position = new BABYLON.Vector3(14.5, 9, -24.5);
    //            });
    //
    //            BABYLON.SceneLoader.Load("/assets/", "testobj.obj", engine, function(newScene) {
    //                // ...
    //            });
//    var meshTask = preloader.addMeshTask("Interior", "", "assets/", "untitled.babylon");
    var galleryInterior = preloader.addMeshTask("Gallery Interior", "", "assets/", "GalleryInterior.obj");

    //            BABYLON.SceneLoader.ImportMesh("testobj", "testobj.obj", scene, function (meshes) { 
    //                // newScene[0].position = new BABYLON.Vector3(14.5, 9, -24.5);
    //            });

    // Free camera
    var camera = new BABYLON.WebVRFreeCamera("camera1", new BABYLON.Vector3(87, 56, 57), scene);
    // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-15, 50, -5), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(5, 10, 5);
    camera.minZ = 0.8;
    camera.speed = 3;
    camera.keysUp.push('W'.charCodeAt(0));
    camera.keysDown.push('S'.charCodeAt(0));
    camera.keysLeft.push('A'.charCodeAt(0));
    camera.keysRight.push('D'.charCodeAt(0));
    camera.attachControl(canvas, true);
    camera.applyGravity = false;
    scene.gravity = new BABYLON.Vector3(0, -1, 0);

    //        engine.isPointerLock = true;
    //        engine.switchFullscreen(true);

    // Take control of the mouse
    var isLocked = false;
    scene.onPointerDown = function (evt) { // On click event, request pointer lock
        if (!isLocked) {
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
            if (canvas.requestPointerLock) {
                canvas.requestPointerLock();
            }
        }
        //referance for future shooting requests or whatever :P
        //evt === 0 (left mouse click)
        //evt === 1 (mouse wheel click (not scrolling))
        //evt === 2 (right mouse click)
    };
    var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
        if (!controlEnabled) {
            //camera.detachControl(canvas);
            isLocked = false;
        } else {
            //camera.attachControl(canvas);
            isLocked = true;
        }
    };
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    //        scene.onPointerDown = function () {
    //          scene.onPointerDown = undefined
    //          camera.attachControl(canvas, true);
    //            canvas.requestPointerLock();
    //        }

    // Lights
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 10, 1), scene);
    light.intensity = 0.3;
    
    var sunlight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-0.5, -1, -1.5), scene);
    sunlight.intensity = 0.6;

    var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(317, 58, 10), new BABYLON.Vector3(5.3, -3, -1), 200, 1, scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(1, 1, 1);

    // Shadows
//    var shadowGenerator = new BABYLON.ShadowGenerator(4096, light);
//        // shadowGenerator.useVarianceShadowMap = true;
//        shadowGenerator.usePoissonSampling = true; 
//        shadowGenerator.bias = 0.0001;
//        shadowGenerator.getShadowMap().renderList.push(newMesh[0],newMesh[1],newMesh[2],newMesh[3],newMesh[4], newMesh[5]);
//    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
//    shadowGenerator.getShadowMap().renderList.push(torus);
    
    // ENVIRONMENT
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    skybox.infiniteDistance = true;
    // prevent reflection to skybox
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skyboxtropical/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    
    // TODO: DEBUG Layer not working. Solve this D:
    //    BABYLON.DebugLayer.InspectorURL = 'http://myurl/babylon.inspector.bundle.js';
    //   scene.debugLayer.show({
    //    popup:true, 
    //    initialTab : 2, 
    //    parentElement:document.getElementById('#mydiv'),
    //    newColors: {
    //        backgroundColor: '#eee',
    //        backgroundColorLighter: '#fff',
    //        backgroundColorLighter2: '#fff',
    //        backgroundColorLighter3: '#fff',
    //        color: '#333',
    //        colorTop:'red', 
    //        colorBottom:'blue'
    //    }
    //});
    
//            for (mesh in scene.meshes) {
//            scene.meshes[mesh].receiveShadows = true;
//        }
//        console.log(scene.meshes[6].receiveShadows);

    galleryInterior.onSuccess = function (task) {
        task.loadedMeshes[0].position = new BABYLON.Vector3(0, 0, 0);
        engine.loadingUIText = "Loaded asset " + task.loadedMeshes[0].name;
        console.log(task.loadedMeshes[0].name);
//        for (var i = 0; i < scene.meshes.length; i++) {
//            scene.meshes[i].checkCollisions = true;
//        }
        
        
//               for (var i = 0; i < scene.meshes.length; i++) {
//            let mesh = scene.meshes[i];
//
//            shadowGenerator.getShadowMap().renderList.push(mesh);
//            mesh.receiveShadows = true;
//        }
    }

    preloader.onTaskError = function (task) {
        console.log("error on Loading" + task.name);
    }

    preloader.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    preloader.onFinish = function (tasks) {

        console.log("Finished");
        engine.runRenderLoop(function () {
            scene.render();
        });
    };
    
    preloader.load();
    return scene;

};
var scene = createScene();

// Resize //
window.addEventListener("resize", function () {
    engine.resize();
});
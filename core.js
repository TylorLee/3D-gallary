if (BABYLON.Engine.isSupported()) {

  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var newScene = new BABYLON.Scene(engine);
  var preloader = new BABYLON.AssetsManager(newScene);

<<<<<<< HEAD
  BABYLON.SceneLoader.Load("assets/models/", "museumReady2.babylon", engine, function (newScene) {
=======
  BABYLON.SceneLoader.Load("", "box.babylon", engine, function (newScene) {
>>>>>>> 5fd945f11dec8d07709ed63467bbfd660a9f6df1
    // Wait for textures and shaders to be ready
    newScene.executeWhenReady(function () {

        // MESHS

        // LIGHTING
        for(var i=0; i<newScene.lights.length; i++){
                light = newScene.lights[i]; //local var
            }
            console.log("DEBUG MSG: this is: " + light);

        // SHADOW GENERATOR
        var shadowGenerator = new BABYLON.ShadowGenerator(4000, light);
        newScene.meshes.slice(1).forEach(function(mesh) {
			  //	console.log(mesh);
				    shadowGenerator.getShadowMap().renderList.push(mesh);
        });
        // SHADOW RECEIVER
        newScene.meshes.forEach(function(mesh) {
          mesh.receiveShadows = true;
        });
        // SHADOW CONTROL
			  shadowGenerator.useVarianceShadowMap = true;
			  shadowGenerator.bias = 0.00001;
        shadowGenerator.useExponentialShadowMap = true;
			  shadowGenerator.usePoissonSampling = true;
        // shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.useKernelBlur = true;
        shadowGenerator.blurKernel = 150;


        // FREE CAMERA
<<<<<<< HEAD
        var camera = new BABYLON.WebVRFreeCamera("camera1", new BABYLON.Vector3(10, 4, 1), newScene);
=======
        var camera = new BABYLON.WebVRFreeCamera("camera1", new BABYLON.Vector3(10, 1, 10), newScene);
>>>>>>> 5fd945f11dec8d07709ed63467bbfd660a9f6df1
        // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-15, 50, -5), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.checkCollisions = true; //colider switch
        camera.ellipsoid = new BABYLON.Vector3(1, 1.5, 1);
        camera.minZ = 1;
        camera.minX = 1;
        camera.speed = .2;
        camera.keysUp.push('W'.charCodeAt(0));
        camera.keysDown.push('S'.charCodeAt(0));
        camera.keysLeft.push('A'.charCodeAt(0));
        camera.keysRight.push('D'.charCodeAt(0));
        camera.attachControl(canvas, true);
        camera.applyGravity = true; //gravity switch
        newScene.gravity = new BABYLON.Vector3(0, -.1, 0); // weight



        // ENVIRONMENT
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1500.0, newScene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", newScene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        skybox.infiniteDistance = true;
        // prevent reflection to skybox
        skyboxMaterial.disableLighting = true;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skyboxtropical/skybox", newScene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

        // SOUND
        var music = new BABYLON.Sound("ambiance-music", "assets/sounds/ambiance.mp3", newScene, null, { loop: true, autoplay: true });
        var music = new BABYLON.Sound("background-music", "assets/sounds/sound.mp3", newScene, null, { loop: true, autoplay: true });

        var foleyWalk = new BABYLON.Sound("foley-walk", "assets/sounds/foot-step1.mp3", newScene);

        var walkSpeed = 600;

        window.addEventListener("keydown", (function(walk) {
          return function(event) {
            if (!walk) return false;
            walk = false;
            setTimeout(function() { walk = true; }, walkSpeed);
            switch (event.keyCode) {
              case 68: return move("right");
              case 83: return move("down");
              case 65: return move("left");
              case 87: return move("up");
            }
          };
        })(true), false);

        function move(direction) {
          foleyWalk.play();
        }


        // POINT LOCKER
        var isLocked = false;
        newScene.onPointerDown = function (evt) { // On click event, request pointer lock
            if (!isLocked) {
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }
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

        // PRE LOADER
        preloader.onTaskError = function (task) {
            console.log("error on Loading" + task.name);
        }

        preloader.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
            engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
        };

        preloader.onFinish = function (tasks) {

            console.log("Finished");
            engine.runRenderLoop(function () {
                newScene.render();
            });
        };
        preloader.load();
        return newScene;

    });
  }, function (progress) {
        // To do: give progress feedback to user
      });
}

// Resize //
window.addEventListener("resize", function () {
    engine.resize();
});

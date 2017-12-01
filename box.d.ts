declare module box{

    export function initScene(scene : BABYLON.Scene, resourcesRootDir : string = "./", positionOffset? : BABYLON.Vector3, sceneTransitionName? : string, overriddenMillis? : number, overriddenSound? : BABYLON.Sound, options? : {}) : void;

    export function matReadAhead(materialsRootDir) : void;
    export function defineMaterials(scene : BABYLON.Scene, materialsRootDir : string = "./") : void;

    class Sphere extends BABYLON.Mesh {
        constructor(name: string, scene: BABYLON.Scene, materialsRootDir: string = "./", source? : Sphere);
    }

    class Plane extends BABYLON.Mesh {
        constructor(name: string, scene: BABYLON.Scene, materialsRootDir: string = "./", source? : Plane);
    }

    class Cube extends default: BABYLON.Mesh {
        constructor(name: string, scene: BABYLON.Scene, materialsRootDir: string = "./", source? : Cube);
    }

    export function defineLights(scene : BABYLON.Scene, positionOffset? : BABYLON.Vector3) : void;

    export function defineShadowGen(scene : BABYLON.Scene) : void;

    export function freshenShadowRenderLists(scene : BABYLON.Scene) : void;
}

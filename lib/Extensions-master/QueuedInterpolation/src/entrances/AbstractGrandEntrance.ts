/// <reference path="../meshes/Mesh.ts"/>
module QI {
    export class AbstractGrandEntrance {
        
        protected _options : IMotionEventOptions = {};
        
        /**
         * @constructor - This is the required constructor for a GrandEntrance.  This is what Tower of Babel
         * generated code expects.
         * @param {QI.Mesh} _mesh - Root level mesh to display.
         * @param {Array<number>} durations - The millis of various sections of entrance.
         * @param {BABYLON.Sound} soundEffect - An optional sound to play as a part of entrance.
         * @param {boolean} disposeSound - When true, dispose the sound effect on completion. (Default false)
         */
        constructor(public _mesh: QI.Mesh, public durations : Array<number>, protected soundEffect? : BABYLON.Sound, disposeSound? : boolean) {
            if (this.soundEffect) {
                this._options.sound = this.soundEffect;
                if (disposeSound) {
                    var ref = this;
                    ref.soundEffect.onended = function() { ref.soundEffect.dispose(); }
                }
            }
        }
        
        public makeEntrance() : void {
            throw "Must be over-ridden by sub-classes"
        }
    }
}
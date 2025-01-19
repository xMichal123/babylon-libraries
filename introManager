class IntroManager {
    constructor() {
    }

    init(imgUrl, callback) {
        var introImage = new BABYLON.GUI.Image("intro", imgUrl);
        introImage.width = "100%";
        introImage.height = "100%";
        introImage.isPointerBlocker = true;

        introImage.onPointerClickObservable.add(() => {
            advancedTexture.removeControl(introImage);
            
            if (callback) {
                callback();
            }
        });

        advancedTexture.addControl(introImage);
    }
}

window.introManager = new IntroManager();

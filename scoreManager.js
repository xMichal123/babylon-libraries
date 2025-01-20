class ScoreManager {
    constructor() {
        this.scoreBlocks = [];
        this._animTick = -1;
    }

    init(model, updateFunction) {
        this.model = [];
        this.lastValues = [];
        this.updateFunction = updateFunction;

        var horizontalPanel = new BABYLON.GUI.StackPanel();
        horizontalPanel.isVertical = false; // Set to false for horizontal stacking
        horizontalPanel.top = "-40%";
        horizontalPanel.left = "20px";
        horizontalPanel.height = "20px";
        horizontalPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        advancedTexture.addControl(horizontalPanel);

        for (let row of model) {
            let rowText = new BABYLON.GUI.TextBlock();
            rowText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            rowText.text = " " + row.initials + ":" + row.value + " ";
            rowText.color = "white";
            rowText.fontSize = 24;
            rowText.width = row.width ? row.width : "80px";
            horizontalPanel.addControl(rowText);
            this.scoreBlocks.push(rowText);
            this.lastValues.push(row.value);
            this.model.push(row);
        }
        
        scene.onBeforeRenderObservable.add(() => {
            for (let i = 0; i < this.model.length; i++) {
                if (this.model[i].value != this.lastValues[i]) {
                    this.scoreBlocks[i].text = " " + this.model[i].initials + ":" + this.model[i].value + " ";
                    this._animTick = 0;

                    if (updateFunction) {
                        updateFunction(this.model[i].initials, this.model[i].value - this.lastValues[i]);
                    }

                    if (this.model[i].value > this.lastValues[i]) {
                        this.scoreBlocks[i].color = "lightgreen";
                    } else {
                        this.scoreBlocks[i].color = "red";
                    }
                }

                this.lastValues[i] = this.model[i].value;
            }

            if (this._animTick >= 0) {
                if (this._animTick < 60) {
                    this._animTick++;
                } else {
                    for (let sb of this.scoreBlocks) {
                        sb.color = "white";
                    }

                    this._animTick = -1;
                }
            }
        });
    }
}

window.scoreManager = new ScoreManager();

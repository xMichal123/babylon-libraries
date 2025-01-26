class GameControlsManager {
    constructor() {
        this.introImage = null;
        this.pauseButton = null;
    }

    initialize() {
        const helpThis = this;

        this.pauseButton = this.addButton("pause-button.png", () => {
            helpThis.background.isVisible = true;
            helpThis.introImage.isVisible = true;
        });

        this.pauseButton.top = "20px";
        this.pauseButton.left = "-20px";
        this.pauseButton.width = 0.1;
        this.pauseButton.height = 0.04;
        this.pauseButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.pauseButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.pauseButton.isVivible = false;
        advancedTexture.addControl(this.pauseButton);

        // Add a background rectangle
        this.background = new BABYLON.GUI.Rectangle();
        this.background.width = "500px";
        this.background.height = "300px";
        this.background.color = "white";
        this.background.thickness = 2;
        this.background.background = "rgba(0, 0, 0, 0.7)";
        this.background.cornerRadius = 20;
        this.background.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.background.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.background.isVisible = false;
        this.background.zIndex = 1000;
        advancedTexture.addControl(this.background);

        // StackPanel for layout
        this.panel = new BABYLON.GUI.StackPanel();
        this.panel.width = "90%";
        this.panel.isVertical = true;
        this.panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.background.addControl(this.panel);

        // Game paused text
        this.gameOverText = new BABYLON.GUI.TextBlock();
        this.gameOverText.text = "Game Paused";
        this.gameOverText.fontSize = "36px";
        this.gameOverText.height = "60px";
        this.gameOverText.color = "white";
        this.gameOverText.paddingBottom = "20px";
        this.panel.addControl(this.gameOverText);

        this.resumeButton = this.addButton("resume-button.png", () => {
            helpThis.hide();
        });

        this.resumeButton.width = "400px";
        this.resumeButton.height = "100px";

        this.panel.addControl(this.resumeButton);

        // Grid for fixed stats
        this.grid = new BABYLON.GUI.Grid();
        this.grid.width = "100%";
        this.grid.height = "100px";
        this.grid.addColumnDefinition(0.5); // 50% width for labels
        this.grid.addColumnDefinition(0.5); // 50% width for values

        const rowHeight = 50;

        this.grid.addRowDefinition(rowHeight);
        this.grid.addRowDefinition(rowHeight);

        this.addButtons(1);

        this.panel.addControl(this.grid);
    }

    hide() {
        this.introImage.isVisible = false;
        this.background.isVisible = false;
    }

    addButtons(row) {
        const but1 = this.addButton("stop-button.png");
        const but2 = this.addButton("restart-button.png", () => {
            this.hide(); // Hide on play again
            gameManager.restart(); // Custom callback for resetting the game
        });

        this.grid.addControl(but1, row, 0);
        this.grid.addControl(but2, row, 1);
    }

    init(imgUrl, callback) {
        if (this.introImage) {
            advancedTexture.removeControl(this.introImage);
            this.introImage.dispose();
        } else {
            this.initialize();
        }
        
        this.introImage = new BABYLON.GUI.Image("intro", imgUrl);
        this.introImage.width = "100%";
        this.introImage.height = "100%";
        this.introImage.isPointerBlocker = true;

        this.introImage.onPointerClickObservable.add(() => {
            this.hide();
            this.pauseButton.isVisible = true;
            
            if (callback) {
                callback();
            }
        });

        advancedTexture.addControl(this.introImage);
    }

    addButton(name, action = null) {
        var button = BABYLON.GUI.Button.CreateImageOnlyButton(name, "https://raw.githubusercontent.com/xMichal123/babylon-libraries/main/resources/" + name);
        button.width = 0.9;
        button.color = "white";
        button.thickness = 0;
        button.cornerRadius = 20;

        if (action) {
            button.onPointerClickObservable.add(action);
        }

        return button;
    }
}

window.gameControlsManager = new GameControlsManager();

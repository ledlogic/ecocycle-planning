var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function(engine, canvas) {
	engine.runRenderLoop(function() {
		if (sceneToRender && sceneToRender.activeCamera) {
			sceneToRender.render();
		}
	});
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() {
	return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
};
var createScene = function() {
	var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	// GUI
	var ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

	addTextBlock(ui, "Ecocycle Planning", "0", "4%", 48, "Bahnschrift Condensed");
	
	addTextBlock(ui, "Scarcity Trap", "-38%", "48%", 24, "Bahnschrift");
	addTextBlock(ui, "Considered valuable, but don't invest enough time in..", "-38%", "52%", 10, "Bahnschrift Light", "100px");

	addTextBlock(ui, "Gestation", "-19.25%", "25.5%", 24, "Bahnschrift");
	addTextBlock(ui, "Currently don't do but might do.", "-19.25%", "29.5%", 10, "Bahnschrift Light", "100px");

	addTextBlock(ui, "Maturity", "19.25%", "25.5%", 24, "Bahnschrift");
	addTextBlock(ui, "Something that provides us value.", "19.25%", "29.5%", 10, "Bahnschrift Light", "100px");

	addTextBlock(ui, "Rigidity Trap", "38%", "48%", 24, "Bahnschrift");
	addTextBlock(ui, "Something we should let go of or change but keep doing.", "38%", "52%", 10, "Bahnschrift Light", "100px");

	addTextBlock(ui, "Creative Destruction", "19.25%", "68%", 24, "Bahnschrift");
	addTextBlock(ui, "Actively changing or rethinking.", "19.25%", "72%", 10, "Bahnschrift Light", "100px");

	addTextBlock(ui, "Birth", "-19.25%", "68%", 24, "Bahnschrift");
	addTextBlock(ui, "Recently started investing time in.", "-19.25%", "72%", 10, "Bahnschrift Light", "100px");

	addInfinity(scene, 2);
	addInfinity(scene, 1.9);
	
	return scene;
}

window.initFunction = async function() {
	var asyncEngineCreation = async function() {
		try {
			return createDefaultEngine();
		} catch (e) {
			console.log("the available createEngine function failed. Creating the default engine instead");
			return createDefaultEngine();
		}
	}
	window.engine = await asyncEngineCreation();
	if (!engine) throw 'engine should not be null.';
	startRenderLoop(engine, canvas);
	window.scene = createScene();
};

initFunction().then(() => {
	sceneToRender = scene
});

// Resize
window.addEventListener("resize", function() {
	engine.resize();
});

// addInfinity
function addInfinity(scene, baseScale) {
	var points2 = [];
	var deltaRads = Math.PI / 144;
	var scale = 1;
	for (var t = 0; t < 2 * Math.PI; t += deltaRads) {
		scale = baseScale * 2 / (3 - Math.cos(2 * t));
		points2.push(new BABYLON.Vector3(scale * Math.cos(t), scale * Math.sin(2 * t) / 2, 0));
	}

	// close the loop, return to 0
	points2.push(points2[0]);
	
	BABYLON.MeshBuilder.CreateLines('track', { points: points2 }, scene);
}

// addTextBlock
function addTextBlock(at, t, x, y, fs, ff, w, h) {
	var ret = new BABYLON.GUI.TextBlock();
	ret.text = t;
	ret.color = "white";
	ret.fontSize = fs;
	ret.fontFamily = ff;
	ret.left = x;
	ret.top = y;
	ret.textWrapping = 1;
	ret.textVerticalAlignment = 0;
	if (w) ret.width = w;
	if (h) ret.height = h;
	at.addControl(ret);
}
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

var hWidth = 100;
var vWidth = 80;
var hPct = hWidth / 1200 * 100;
var vPct = vWidth / 1200 * 100;
var hPad = 8;
var vPad = 8;
var foreColor = "#49A742";
var lineColor = new BABYLON.Color3(.29,.65,.26);

var createScene = function() {
	var x, y = 0;

	var scene = new BABYLON.Scene(engine);
	scene.clearColor = BABYLON.Color3.White();

	var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	// GUI
	var ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

	addTextBlock(ui, "Ecocycle Planning", "0", "4%", 48, "Bahnschrift Condensed");
	
	x = -38;
	y = 48;
	
	console.log("scarcity");
	addTextBlock(ui, "Scarcity Trap", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Considered valuable, but don't invest enough time in.", pct(x), pct(y+4), 10, "Bahnschrift", "100px");

	var items = [
		"Scar 1 xxxxxxxxxxx yyyyyyyyy",
		"Scar 2 xxxxxxxxxxx yyyyyyyyy",
		"Scar 3 xxxxxxxxxxx yyyyyyyyy",
		"Scar 4 xxxxxxxxxxx yyyyyyyyy"
	];
	addTextBlockItems(ui, x, y, 1, items);	

	x = -19.25;
	y = 25.5;
	console.log("gestation");
	addTextBlock(ui, "Gestation", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Currently don't do but might do.", pct(x), pct(y+4), 10, "Bahnschrift", "100px");

	var items = [
		"Gest 1 xxxxxxxxxxx yyyyyyyyy",
		"Gest 2 xxxxxxxxxxx yyyyyyyyy",
		"Gest 3 xxxxxxxxxxx yyyyyyyyy",
		"Gest 4 xxxxxxxxxxx yyyyyyyyy"
	];
	addTextBlockItems(ui, x, y, 0, items);	

	x = 19.25;
	y = 25.5;
	console.log("maturity");
	addTextBlock(ui, "Maturity", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Something that provides us value.", pct(x), pct(y+4), 10, "Bahnschrift", "100px");

	var items = [
		"Mat 1 xxxxxxxxxxx yyyyyyyyy",
		"Mat 2 xxxxxxxxxxx yyyyyyyyy",
		"Mat 3 xxxxxxxxxxx yyyyyyyyy"
	];
	addTextBlockItems(ui, x, y, 0, items);	

	x = 38;
	y = 48;
	console.log("rigidity");
	addTextBlock(ui, "Rigidity Trap", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Something we should let go of or change but keep doing.", pct(x), pct(y+4), 10, "Bahnschrift", "100px");

	var items = [
		"Rigid 1 xxxxxxxxxxx yyyyyyyyy",
		"Rigid 2 xxxxxxxxxxx yyyyyyyyy",
		"Rigid 3 xxxxxxxxxxx yyyyyyyyy",
		"Rigid 4 xxxxxxxxxxx yyyyyyyyy"
	];
	addTextBlockItems(ui, x, y, 1, items);	

	x = 19.25;
	y = 68;
	console.log("destruction");
	addTextBlock(ui, "Creative Destruction", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Actively changing or rethinking.", pct(x), pct(y+4), 10, "Bahnschrift", "100px");

	var items = [
		"Dest 1 xxxxxxxxxxx yyyyyyyyy",
		"Dest 2 xxxxxxxxxxx yyyyyyyyy",
		"Dest 3 xxxxxxxxxxx yyyyyyyyy",
		"Dest 4 xxxxxxxxxxx yyyyyyyyy"
	];
	addTextBlockItems(ui, x, y, 0, items);
	
	x = -19.25;
	y = 68;
	console.log("birth");
	addTextBlock(ui, "Birth", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Recently started investing time in.", pct(x), pct(y+4), 10, "Bahnschrift", "100px");
	
	var items = [
		"Birth 1 xxxxxxxxxxx yyyyyyyyy",
		"Birth 2 xxxxxxxxxxx yyyyyyyyy",
	];
	addTextBlockItems(ui, x, y, 0, items);	

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
	
	var linesMesh = BABYLON.MeshBuilder.CreateLines('track', { points: points2 }, scene);
	linesMesh.color = lineColor;
}

// addTextBlock
function addTextBlock(at, t, x, y, fs, ff, w, h) {
	var ret = new BABYLON.GUI.TextBlock();
	ret.text = t;
	ret.color = foreColor;
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

function addTextBlockRadial(at, t, x, y, fs, ff, hv, i, n) {
	var rx = parseInt(x.replace("%",""),10);
	var ry = parseInt(y.replace("%",""),10);
	var ly = ry > 48 ? 1 : -1;
	var w = null;
	var h = null;
	var nx = 0;
	var ny = 0;
	if (hv === 0) {
		nx = pct(rx + (hPct + hPad) * (i - n + (n+1)/2)/2);
		ny = pct(ry * 1.125 + (ly < 0 ? -8 : 0));
		w = pct(hPct);
	} else {
		w = pct(vPct);
		nx = pct(rx * 1.225 + (ly > 0 ? 0.5 : 0));
		ny = pct(ry + (vPct + vPad) * (i - n + (n+1)/2)/2);
	}
	//console.log(r, rx, ry, lx, ly, lx2, ly2, nx, ny);
	addTextBlock(at, t, nx, ny, fs, ff, w, h);
}

function pct(p) {
	return p+"%";
}

function addTextBlockItems(ui, x, y, hv, items) {
	for (var i=0; i<items.length; i++) {
		addTextBlockRadial(ui, items[i], pct(x), pct(y), 10, "Bahnschrift Light", hv, i, items.length);
	}
}
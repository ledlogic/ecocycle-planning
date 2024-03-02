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

var createScene = function() {
	var x, y = 0;

	var scene = new BABYLON.Scene(engine);

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
	addTextBlock(ui, "Considered valuable, but don't invest enough time in.", pct(x), pct(y+4), 10, "Bahnschrift Light", "100px");

	addTextBlockRadial(ui, "Scar 1 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 1, 5);
	addTextBlockRadial(ui, "Scar 2 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 2, 5);
	addTextBlockRadial(ui, "Scar 3 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 3, 5);
	addTextBlockRadial(ui, "Scar 4 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 4, 5);
	addTextBlockRadial(ui, "Scar 5 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 5, 5);

	x = -19.25;
	y = 25.5;
	console.log("gestation");
	addTextBlock(ui, "Gestation", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Currently don't do but might do.", pct(x), pct(y+4), 10, "Bahnschrift Light", "100px");

	addTextBlockRadial(ui, "Gest 1 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 1, 3);
	addTextBlockRadial(ui, "Gest 2 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 2, 3);
	addTextBlockRadial(ui, "Gest 3 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 3, 3);

	x = 19.25;
	y = 25.5;
	console.log("maturity");
	addTextBlock(ui, "Maturity", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Something that provides us value.", pct(x), pct(y+4), 10, "Bahnschrift Light", "100px");

	addTextBlockRadial(ui, "Maturity 1 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 1, 3);
	addTextBlockRadial(ui, "Maturity 2 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 2, 3);
	addTextBlockRadial(ui, "Maturity 3 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 3, 3);

	x = 38;
	y = 48;
	console.log("rigidity");
	addTextBlock(ui, "Rigidity Trap", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Something we should let go of or change but keep doing.", pct(x), pct(y+4), 10, "Bahnschrift Light", "100px");

	addTextBlockRadial(ui, "Rigid 1 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 1, 3);
	addTextBlockRadial(ui, "Rigid 2 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 2, 3);
	addTextBlockRadial(ui, "Rigid 3 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 1, 3, 3);

	x = 19.25;
	y = 68;
	console.log("destruction");
	addTextBlock(ui, "Creative Destruction", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Actively changing or rethinking.", pct(x), pct(y+4), 10, "Bahnschrift Light", "100px");

	addTextBlockRadial(ui, "Dest 1 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 1, 3);
	addTextBlockRadial(ui, "Dest 2 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 2, 3);
	addTextBlockRadial(ui, "Dest 3 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 3, 3);

	x = -19.25;
	y = 68;
	console.log("birth");
	addTextBlock(ui, "Birth", pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, "Recently started investing time in.", pct(x), pct(y+4), 10, "Bahnschrift Light", "100px");

	addTextBlockRadial(ui, "Birth 1 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 1, 5);
	addTextBlockRadial(ui, "Birth 2 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 2, 5);
	addTextBlockRadial(ui, "Birth 3 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 3, 5);
	addTextBlockRadial(ui, "Birth 4 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 4, 5);
	addTextBlockRadial(ui, "Birth 5 xxxxxxxxxxx yyyyyyyyy", pct(x), pct(y), 10, "Bahnschrift Light", 0, 5, 5);

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

function addTextBlockRadial(at, t, x, y, fs, ff, hv, i, n) {
	var r = i/n;
	var rx = parseInt(x.replace("%",""),10);
	var ry = parseInt(y.replace("%",""),10);
	var lx = rx / Math.abs(rx);
	var ly = ry > 48 ? 1 : -1;
	var lx2 = lx * r;
	var ly2 = ly * r;
	
	var w = null;
	var h = null;
	var nx = 0;
	var ny = 0;
	if (hv === 0) {
		nx = pct(rx + (hPct + hPad) * (i - n + 1)/2);
		ny = pct(ry * 1.125 + (ly < 0 ? -8 : 0));
		w = pct(hPct);
	} else {
		w = pct(vPct);
		nx = pct(rx * 1.225 + (ly > 0 ? 0.5 : 0));
		ny = pct(ry + (vPct + vPad) * (i - n + 1)/2);
	}
	console.log(r, rx, ry, lx, ly, lx2, ly2, nx, ny);
	//console.log(y, ry, ly);	
	addTextBlock(at, t, nx, ny, fs, ff, w, h);
}

function pct(p) {
	return p+"%";
}
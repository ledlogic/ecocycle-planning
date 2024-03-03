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
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = BABYLON.Color3.White();

	var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	// GUI
	var ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

	addTextBlock(ui, "Ecocycle Planning", "0", "4%", 48, "Bahnschrift Condensed");
	
	addStop(ui, "Scarcity Trap", "Considered valuable, but don't invest enough time in.", -38, 48, 1, [
		"Server and software framework upgrades",
		"Data Quality Tooling",
		"Documentation",
		"Performance Testing",
		"Sharing knowledge across teams",
		"Employee Training"
	]);

	addStop(ui, "Gestation", "Currently don't do but might do.", -19.25, 25.5, 0, [
		"LiquiBase",
		"Docker",
		"Kafka",
		"Debugging tools for rendering"
	]);

	addStop(ui, "Maturity", "Something that provides us value.", 19.25, 25.5, 0, [
		"Order engine",
		"Configurators",
		"Promotion code engine",
		"Webmonitor Monitoring Tool"
	]);

	addStop(ui, "Rigidity Trap", "Something we should let go of or change but keep doing.", 38, 48, 1, [
		"Date-driven releases",
		"Exceeding meeting times",
		"Interupts to sprint SDLC process",
		"Plan changes",
		"Manual deployment steps",
		"Late game changing of data",
		"Changing development staff on rendering projects"
	]);

	addStop(ui, "Creative Destruction", "Actively changing or rethinking.", 19.25, 68, 0, [
		"Ensure releasable code by EOS",
		"Scripting upgrades",
		"Restructuring f5 rules",
		"Non-flash rendering process",
		"Switch to gitflow"
	]);
	
	addStop(ui, "Birth", "Recently started investing time in.", -19.25, 68, 0, [
		"Nginx courses",
		"Monitoring Database Tooling",
		"Third party surveying tools"
	]);

	addInfinity(scene, 2);
	
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

// addTextBlockRadial
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
	addTextBlock(at, (i+1) + ") " + t, nx, ny, fs, ff, w, h);
}

// pct
function pct(p) {
	return p+"%";
}

// addStop
function addStop(ui, title, desc, x, y, hv, items) {
	addTextBlock(ui, title, pct(x), pct(y), 24, "Bahnschrift");
	addTextBlock(ui, desc, pct(x), pct(y+4), 10, "Bahnschrift", "100px");
	for (var i=0; i<items.length; i++) {
		addTextBlockRadial(ui, items[i], pct(x), pct(y), 10, "Bahnschrift Light", hv, i, items.length);
	}
}

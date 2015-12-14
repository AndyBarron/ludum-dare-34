(function() {
  debug('Begin setup');
  debug('Init renderer');
  // create renderer
  window.render = new PIXI.autoDetectRenderer(800, 600);
  // add view to page
  document.querySelector('.display-wrapper').appendChild(render.view);
  // set up stage
  debug('Init stage and bg');
  window.stage = new PIXI.Container();
  // set up background color
  var bgGraphics = new PIXI.Graphics();
  window.bgColor = 0x007799;
  stage.addChild(bgGraphics);
  // set up scene switching
  debug('Init scene system');
  window.update = null;
  window.scene = new PIXI.Container();
  var innerScene = scene;
  stage.addChild(scene);
  // set up animation loop
  var lastTime = Date.now();
  var animate = function animate() {
    // TODO bg draw only if color changed
    bgGraphics.beginFill(bgColor, 1.0);
    bgGraphics.drawRect(0, 0, 800, 600);
    bgGraphics.endFill();
    if (scene != innerScene) {
      debug("Changing scene");
      if (!scene) {
        debug("No scene detected! Inserting empty scene");
        scene = new PIXI.Container();
      }
      stage.removeChild(innerScene);
      stage.addChild(scene);
      innerScene = scene;
      // TODO are following dummy lines necessary?
      render.render(stage);
      if (update) {
        update(0);
      }
    }
    // timing and update
    var time = Date.now();
    if (update) {
      var delta = (time - lastTime) / 1000.0;
      update(delta);
    }
    lastTime = time;
    render.render(stage);
    window.requestAnimationFrame(animate);
  };
  animate();
  debug('End setup');
})();

import { Application, Assets, Sprite } from 'pixi.js'

(async () => {
  const appConfig = { background: '#1099bb', resizeTo: window }
  const app = new Application()
  await app.init(appConfig)
  document.body.appendChild(app.canvas)
  
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const sprite = new Sprite(texture)
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;

  app.stage.addChild(sprite)
  
  app.ticker.add((time) => {
    sprite.rotation += 0.1 * time.deltaTime;
  })
})()

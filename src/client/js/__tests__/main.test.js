/* global document, Event */
import WTF from '../main';

// mock the Detect import
jest.mock('../utils/detect');

/**
 * @test {WTF}
 */
describe('WTF', () => {
  const instance = new WTF();

  /**
   * @test {WTF#constructor}
   */
  it('.constructor()', () => {
    expect(WTF).toBeDefined();
  });

  /**
   * @test {WTF#load}
   */
  it('.load()', () => {
    expect(instance.app).toEqual(null);
    instance.load();
    expect(instance.app).toBeDefined();
    expect(instance.body).toBeDefined();
    expect(instance.chatInput).toBeDefined();
  });

  /**
   * @test {WTF#documentReady}
   */
  it('.documentReady()', () => {
    expect(instance.app).toEqual(null);
    instance.documentReady();
    expect(instance.app).toBeDefined();
    expect(instance.body).toBeDefined();
    expect(instance.chatInput).toBeDefined();
  });

  /**
   * @test {WTF#addClasses}
   */
  it('.addClasses()', () => {
    instance.documentReady();
    instance.addClasses();
    expect(instance.chatInput).toBeDefined();
    expect(instance.body[0].className).toEqual('windows opera');
  });

  /**
   * @test {WTF#addResizeListeners}
   */
  it('.addResizeListeners()', () => {
    instance.documentReady();
    const map = {};
    document.addEventListener = jest.fn((event, callback) => {
      map[event] = callback;
    });
    instance.addResizeListeners();
    expect(map.touchstart).toBeDefined();
    expect(map.touchmove).toBeDefined();
    expect(map.touchmove(new Event('test'))).toEqual(false);
  });

  /**
   * @test {WTF#initGame}
   */
  it('.initGame()', () => {
    const wtf = new WTF();
    expect(wtf.app).toEqual(null);
    wtf.documentReady();
    wtf.initGame();
    expect(wtf.app.readyCallback).toBeDefined();
  });
});

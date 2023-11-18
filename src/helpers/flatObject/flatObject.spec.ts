import { flatObject } from "./flatObject";

describe('flatObject', () => {
  it('should keep shallow object as it is', () => {
    const data = {
      testKey: 10,
      testKey2: 5
    };

    expect(flatObject(data)).toStrictEqual(data);
  });

  it('should flatten a deep object', () => {
    const data = {
      testKey: {
        testKeyDeep: true
      },
      testKey2: {
        testKey2Deep: 'test'
      }
    };

    expect(flatObject<string | boolean>(data)).toStrictEqual({
      'testKey.testKeyDeep': true,
      'testKey2.testKey2Deep': 'test'
    });
  });
});
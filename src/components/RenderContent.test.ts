import { RenderContent } from '../index';
import { extractContent } from './RenderContent';

describe('RenderContent', () => {

  test('extractContent should return empty array when content is null', async () => {
    // Call function
    const result = extractContent(null);
    // Assert
    expect(result).toEqual([]);
  });

  test('extractContent should correctly handle single resources', async () => {
    // Call function
    const result = extractContent({
      id: 'itemId',
      type: 'itemType',
      foo: 'bar'
    });
    // Assert
    expect(result).toEqual([{
      componentName: 'itemType',
      props: {
        id: 'itemId',
        type: 'itemType',
        foo: 'bar'
      }
    }]);
  });

  test('extractContent should correctly handle resource arrays', async () => {
    // Call function
    const result = extractContent([
      {
        id: 'itemId',
        type: 'itemType',
        foo: 'bar'
      },
      {
        id: 'itemId2',
        type: 'itemType2',
        foo2: 'bar2'
      }
    ]);
    // Assert
    expect(result).toEqual([
      {
        componentName: 'itemType',
        props: {
          id: 'itemId',
          type: 'itemType',
          foo: 'bar'
        }
      },
      {
        componentName: 'itemType2',
        props: {
          id: 'itemId2',
          type: 'itemType2',
          foo2: 'bar2'
        }
      }
    ]);
  });

  test('RenderContent should have been initialised correctly', async () => {
    expect(RenderContent.render).not.toBeUndefined();
    expect(RenderContent.props).not.toBeUndefined();
  });

});

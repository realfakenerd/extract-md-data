import path from 'path';
import { getMarkdownFilepathsSync } from '../lib/files';
import extract from '../';

let testMarkdownFilepaths: string[];

beforeAll(() => {
  const dir = path.resolve(__dirname, 'markdowns');
  testMarkdownFilepaths = getMarkdownFilepathsSync(dir);
});

describe('extract()', () => {
  const rootDir = path.resolve(__dirname);
  const srcDir = path.resolve(rootDir, 'markdowns');

  const jsons = extract(rootDir, srcDir);

  it('Returns objects of expected format', () => {
    expect(typeof jsons[0].content).toMatch('string');
    expect(typeof jsons[0].fm.title).toMatch('string');
    expect(typeof jsons[0].relativePath).toMatch('string');
    expect(typeof jsons[0].slug).toMatch('string');
    expect(typeof jsons[0].filename).toMatch('string');
    expect(Array.isArray(jsons[0].fm.tags)).toBe(true);
  });

  it('Returns an object for every markdown file', () => {
    expect(jsons).toHaveLength(testMarkdownFilepaths.length);
  });
});

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const archive = require("../src/ls-archive");

describe("Archive extension dispatch keeps real path casing", () => {
  let directory, files;
  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), "ls-archive-case-"));
    files = [];
  });
  afterEach(() => {
    for (const file of files) fs.unlinkSync(file);
    fs.rmdirSync(directory);
  });
  const call = (method, ...args) =>
    new Promise((resolve, reject) => {
      method(...args, (error, value) => (error ? reject(error) : resolve(value)));
    });
  for (const [fixture, extension] of [
    ["one-file.zip", ".ZIP"],
    ["one-file.tar", ".TAR"],
    ["one-file.tar.gz", ".TAR.GZ"],
    ["one-file.tgz", ".TgZ"],
    ["one-file.tbz", ".TbZ"],
    ["one-file.tbz2", ".TBZ2"],
    ["one-file.tar.bz2", ".TAR.BZ2"],
  ]) {
    it(`lists and reads a real ${extension} archive like its lowercase control`, async () => {
      const source = path.join(__dirname, "fixtures", fixture);
      const baseline = await call(archive.list, source);
      const fileEntry = baseline.find((entry) => entry.isFile());
      expect(fileEntry).toBeDefined();
      const expected = await call(archive.readFile, source, fileEntry.getPath());
      const target = path.join(directory, `MiXeD${extension}`);
      files.push(target);
      fs.copyFileSync(source, target);
      expect(archive.isPathSupported(target)).toBe(true);
      const actual = await call(archive.list, target);
      expect(actual.map((entry) => entry.getPath())).toEqual(
        baseline.map((entry) => entry.getPath()),
      );
      expect(await call(archive.readFile, target, fileEntry.getPath())).toEqual(expected);
    });
  }
});

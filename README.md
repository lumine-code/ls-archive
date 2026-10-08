# ls-archive

Lists and reads files inside archive files.

Fork of [pulsar-edit/node-ls-archive](https://github.com/pulsar-edit/node-ls-archive).

## Features

- **Multiple formats**: reads `.tar`, `.tar.gz`, `.tgz`, `.tar.bz2`, `.tbz`, `.tbz2`, and the `.zip` family (`.zip`, `.epub`, `.jar`, `.love`, `.war`, `.egg`, `.whl`, `.xpi`, `.nupkg`).
- **List entries**: returns a flat list or a nested tree of the files and folders inside an archive.
- **Read files**: extracts the contents of a single entry inside an archive as a buffer.
- **Decompress streams**: reads whole gzip and bzip2 payloads directly.
- **Small footprint**: pure JavaScript on top of `tar`, `yauzl`, and `unbzip2-stream`, with no native build step.

## Installation

```sh
npm install @lumine-code/ls-archive
```

## Usage

```js
const archive = require("@lumine-code/ls-archive");

archive.list("project.zip", (error, entries) => {
  if (error) throw error;
  for (const entry of entries) {
    console.log(entry.getPath());
  }
});
```

A `lsa` command-line tool is also included:

```sh
lsa project.zip project.tar.gz
```

## API

### archive.isPathSupported(archivePath)

Returns `true` when the archive path has a supported extension, `false` otherwise.

`archivePath` - The string path to the archive file.

### archive.list(archivePath, [options], callback)

List the files and folders inside the archive file path. The `callback` gets two arguments `(error, archiveEntries)`.

`archivePath` - The string path to the archive file.

`options` - An optional object. Set `tree: true` to receive the entries nested under their parent [ArchiveEntry](#archiveentry) directories instead of a flat list.

`callback` - The function to call after reading completes with an error or an array of [ArchiveEntry](#archiveentry) objects.

### archive.readFile(archivePath, filePath, callback)

Read the contents of the file path in the archive path and invoke the callback with those contents. The `callback` gets two arguments `(error, filePathContents)`.

`archivePath` - The string path to the archive file.

`filePath` - The string path inside the archive to read.

`callback` - The function to call after reading completes with an error or the buffer contents.

### archive.readGzip(gzipArchivePath, callback)

Read the contents of the gzipped archive path and invoke the callback with the buffer contents of the uncompressed payload. The `callback` gets two arguments `(error, pathContents)`.

`gzipArchivePath` - The string path to the gzipped archive file.

`callback` - The function to call after reading completes with an error or the buffer contents.

### archive.readBzip(bzipArchivePath, callback)

Read the contents of the bzipped archive path and invoke the callback with the buffer contents of the uncompressed payload. The `callback` gets two arguments `(error, pathContents)`.

`bzipArchivePath` - The string path to the bzipped archive file.

`callback` - The function to call after reading completes with an error or the buffer contents.

### ArchiveEntry

Class representing a path entry inside an archive file.

- `.isFile()` - Returns `true` when the entry is a file.
- `.isDirectory()` - Returns `true` when the entry is a directory.
- `.isSymbolicLink()` - Returns `true` when the entry is a symbolic link.
- `.getPath()` - Returns the string path of the entry.
- `.getName()` - Returns the last path segment of the entry.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!

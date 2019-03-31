import Module from './unzip.mjs';

class ZipReader {
  constructor() {
    Module.onRuntimeInitialized = () => {
      this._loadZipEntries = Module.cwrap('load_zip_entries', 'number', ['number']);
      this._addZipEntryPtr = Module.addFunction(this.addZipEntry.bind(this));
    };
  }

  loadZipEntries(zipBuffer) {
    this.files = [];
    Module.FS.writeFile('archive.zip', new Uint8Array(zipBuffer));
    this._loadZipEntries(this._addZipEntryPtr);
    return this.files;
  }

  addZipEntry(namePtr, size, isDirectory) {
    const name = Module.UTF8ToString(namePtr);
    this.files.push({ name, size, isDirectory });
  }
}

export default ZipReader;

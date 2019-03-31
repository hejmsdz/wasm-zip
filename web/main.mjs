import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.min.js';
import ZipReader from './ZipReader.mjs';

new Vue({
  el: '#app',
  data: {
    files: [],
    uploadedFileName: null,
    uploadProgress: 0,
    uploadComplete: false
  },
  created: function() {
    this.zipReader = new ZipReader();
  },
  methods: {
    handleFileChange: function(e) {
      this.uploadComplete = false;
      this.uploadProgress = 0;
      const file = e.target.files[0];
      
      if (file) {
        this.uploadedFileName = file.name;
        const reader = new FileReader();
        reader.onprogress = e => this.uploadProgress = 100 * e.loaded / e.total;
        reader.onload = e => {
          const buffer = e.target.result;
          this.files = this.zipReader.loadZipEntries(buffer);
          this.uploadComplete = true;
        }
        reader.readAsArrayBuffer(file);
      } else {
        this.uploadedFileName = null;
      }
    }
  }
});

unzip: c/unzip.c
	emcc c/unzip.c c/zip/src/zip.c \
	     -o web/unzip.mjs \
	     -O3 \
	     -s WASM=1 \
	     -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "addFunction", "UTF8ToString", "FS"]' \
	     -s FORCE_FILESYSTEM=1 -s RESERVED_FUNCTION_POINTERS=1 \
	     -s MODULARIZE_INSTANCE=1 -s EXPORT_ES6=1

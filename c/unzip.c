#include "zip/src/zip.h"
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int load_zip_entries(void (*callback)(const char*, int, int)) {
    struct zip_t *zip = zip_open("archive.zip", 0, 'r');

    int i, n = zip_total_entries(zip);
    for (i = 0; i < n; ++i) {
        zip_entry_openbyindex(zip, i);
        {
            const char *name = zip_entry_name(zip);
            int size = zip_entry_size(zip);
            int isdir = zip_entry_isdir(zip);
            callback(name, size, isdir);
        }
        zip_entry_close(zip);
    }
    zip_close(zip);
    return n;
}

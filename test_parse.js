const fs = require('fs');
const html = fs.readFileSync('tiktok_dump.html', 'utf8');

const match = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/);

if (match && match[1]) {
    try {
        const data = JSON.parse(match[1]);
        console.log("JSON parsed.");

        // Helper to find key recursively
        function findKey(obj, key) {
            if (typeof obj !== 'object' || obj === null) return;
            if (obj.hasOwnProperty(key)) {
                console.log(`Found key '${key}'! Value type: ${typeof obj[key]}`);
                if (Array.isArray(obj[key])) {
                    console.log(`Array length: ${obj[key].length}`);
                    if (obj[key].length > 0) console.log("First item:", JSON.stringify(obj[key][0]).substring(0, 100));
                }
            }
            for (const k in obj) {
                findKey(obj[k], key);
            }
        }

        findKey(data, 'itemList');

        // Check status code
        if (data.__DEFAULT_SCOPE__ && data.__DEFAULT_SCOPE__["webapp.user-detail"]) {
            console.log("Status Code:", data.__DEFAULT_SCOPE__["webapp.user-detail"].statusCode);
        }

    } catch (e) {
        console.error("Error", e);
    }
}

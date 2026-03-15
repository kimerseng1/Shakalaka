module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    user: "postgres",
    host: "localhost",
    database: "movie_db",
    password: "movie1234",
    port: 5432
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/movie.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "movieService",
    ()=>movieService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const movieService = {
    // Get all movies
    async getMovies () {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query("SELECT * FROM movie ORDER BY id DESC");
        return result.rows;
    },
    // Search movies
    async searchMovies (search) {
        if (!search) {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query("SELECT * FROM movie ORDER BY id DESC");
            return result.rows;
        }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`SELECT * FROM movie
       WHERE LOWER(title) LIKE LOWER($1)
       ORDER BY id DESC`, [
            `%${search}%`
        ]);
        return result.rows;
    },
    // Create movie
    async createMovie (data) {
        const { title, duration, type, subtitle, videoUrl } = data;
        // accept either poster or posterUrl from client
        const poster = data.poster ?? data.posterUrl ?? null;
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`INSERT INTO movie (title, duration, type, subtitle, "videoUrl", poster)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`, [
            title,
            duration,
            type,
            subtitle,
            videoUrl,
            poster
        ]);
        return result.rows[0];
    },
    // Update movie
    async updateMovie (id, data) {
        const { title, duration, type, subtitle, videoUrl } = data;
        const poster = data.poster ?? data.posterUrl ?? null;
        if (!id) throw new Error("Movie ID is missing");
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query(`UPDATE movie
       SET title=$1,
           duration=$2,
           type=$3,
           subtitle=$4,
           "videoUrl"=$5,
           poster=$6
       WHERE id=$7
       RETURNING *`, [
            title,
            duration,
            type,
            subtitle,
            videoUrl,
            poster,
            id
        ]);
        if (result.rows.length === 0) {
            throw new Error(`Movie with id=${id} not found`);
        }
        return result.rows[0];
    },
    // Delete movie
    async deleteMovie (id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pool"].query("DELETE FROM movie WHERE id=$1", [
            id
        ]);
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/controller/movie.contoller.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "movieController",
    ()=>movieController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/movie.service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function normalizeMovie(row) {
    if (!row) return row;
    // prefer posterUrl if already present, otherwise map poster -> posterUrl
    return {
        ...row,
        posterUrl: row.posterUrl ?? row.poster ?? null
    };
}
const movieController = {
    async getMovies () {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["movieService"].getMovies();
        return rows.map((r)=>normalizeMovie(r));
    },
    async searchMovies (search) {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["movieService"].searchMovies(search);
        return rows.map((r)=>normalizeMovie(r));
    },
    async createMovie (data) {
        const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["movieService"].createMovie(data);
        return normalizeMovie(row);
    },
    async updateMovie (id, data) {
        const row = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["movieService"].updateMovie(id, data);
        return normalizeMovie(row);
    },
    async deleteMovie (id) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$movie$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["movieService"].deleteMovie(id);
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/movies/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$controller$2f$movie$2e$contoller$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/controller/movie.contoller.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$controller$2f$movie$2e$contoller$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$controller$2f$movie$2e$contoller$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function PUT(req, context) {
    try {
        // context.params may be a Promise in dev; handle both cases
        let params = context?.params ?? context;
        if (params && typeof params.then === 'function') {
            params = await params;
        }
        const id = params?.id ?? context?.id;
        if (!id) throw new Error("Movie ID is missing");
        const data = await req.json();
        // Validate posterUrl if provided (only syntax)
        if (data.posterUrl) {
            try {
                new URL(String(data.posterUrl));
            } catch (err) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: 'Poster URL must be a valid URL'
                }, {
                    status: 400
                });
            }
        }
        // pass id through as-is (string) to the controller/service
        const movie = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$controller$2f$movie$2e$contoller$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["movieController"].updateMovie(id, data);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            movie
        });
    } catch (error) {
        console.error("PUT /api/movies/:id error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error instanceof Error ? error.message : "Server error"
        }, {
            status: 500
        });
    }
}
async function DELETE(req, context) {
    try {
        // handle promise-like params shape from Next dev validator
        let params = context?.params ?? context;
        if (params && typeof params.then === 'function') {
            params = await params;
        }
        const id = params?.id ?? context?.id;
        if (!id) throw new Error("Movie ID is missing");
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$controller$2f$movie$2e$contoller$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["movieController"].deleteMovie(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Movie deleted successfully"
        });
    } catch (error) {
        console.error("DELETE /api/movies/:id error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error instanceof Error ? error.message : "Server error"
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5c2e13a6._.js.map
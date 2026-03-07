"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.4.1",
    "engineVersion": "55ae170b1ced7fc6ed07a15f110549408c501bb3",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id             String   @id @default(uuid())\n  email          String   @unique\n  password       String\n  nickname       String\n  activityLevel  String?  @map(\"activity_level\")\n  goalCalories   Int      @default(2000) @map(\"goal_calories\")\n  willpowerScore Int      @default(100) @map(\"willpower_score\")\n  createdAt      DateTime @default(now()) @map(\"created_at\")\n\n  @@map(\"users\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nickname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"activityLevel\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"activity_level\"},{\"name\":\"goalCalories\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"goal_calories\"},{\"name\":\"willpowerScore\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"willpower_score\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"}],\"dbName\":\"users\"}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"email\",\"password\",\"nickname\",\"activityLevel\",\"goalCalories\",\"willpowerScore\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "NwsQCxwAACkAMB0AAAQAEB4AACkAMB8BAAAAASABAAAAASEBACoAISIBACoAISMBACsAISQCACwAISUCACwAISZAAC0AIQEAAAABACABAAAAAQAgCxwAACkAMB0AAAQAEB4AACkAMB8BACoAISABACoAISEBACoAISIBACoAISMBACsAISQCACwAISUCACwAISZAAC0AIQEjAAAuACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAIHwEAAAABIAEAAAABIQEAAAABIgEAAAABIwEAAAABJAIAAAABJQIAAAABJkAAAAABAQgAAAkAIAgfAQAAAAEgAQAAAAEhAQAAAAEiAQAAAAEjAQAAAAEkAgAAAAElAgAAAAEmQAAAAAEBCAAACwAwAQgAAAsAMAgfAQA0ACEgAQA0ACEhAQA0ACEiAQA0ACEjAQA1ACEkAgA2ACElAgA2ACEmQAA3ACECAAAAAQAgCAAADgAgCB8BADQAISABADQAISEBADQAISIBADQAISMBADUAISQCADYAISUCADYAISZAADcAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBhUAAC8AIBYAADAAIBcAADMAIBgAADIAIBkAADEAICMAAC4AIAscAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAQAbACEiAQAbACEjAQAcACEkAgAdACElAgAdACEmQAAeACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAscAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAQAbACEiAQAbACEjAQAcACEkAgAdACElAgAdACEmQAAeACEOFQAAIAAgGAAAKAAgGQAAKAAgJwEAAAABKAEAAAAEKQEAAAAEKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAJwAhLwEAAAABMAEAAAABMQEAAAABDhUAACUAIBgAACYAIBkAACYAICcBAAAAASgBAAAABSkBAAAABSoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACQAIS8BAAAAATABAAAAATEBAAAAAQ0VAAAgACAWAAAjACAXAAAgACAYAAAgACAZAAAgACAnAgAAAAEoAgAAAAQpAgAAAAQqAgAAAAErAgAAAAEsAgAAAAEtAgAAAAEuAgAiACELFQAAIAAgGAAAIQAgGQAAIQAgJ0AAAAABKEAAAAAEKUAAAAAEKkAAAAABK0AAAAABLEAAAAABLUAAAAABLkAAHwAhCxUAACAAIBgAACEAIBkAACEAICdAAAAAAShAAAAABClAAAAABCpAAAAAAStAAAAAASxAAAAAAS1AAAAAAS5AAB8AIQgnAgAAAAEoAgAAAAQpAgAAAAQqAgAAAAErAgAAAAEsAgAAAAEtAgAAAAEuAgAgACEIJ0AAAAABKEAAAAAEKUAAAAAEKkAAAAABK0AAAAABLEAAAAABLUAAAAABLkAAIQAhDRUAACAAIBYAACMAIBcAACAAIBgAACAAIBkAACAAICcCAAAAASgCAAAABCkCAAAABCoCAAAAASsCAAAAASwCAAAAAS0CAAAAAS4CACIAIQgnCAAAAAEoCAAAAAQpCAAAAAQqCAAAAAErCAAAAAEsCAAAAAEtCAAAAAEuCAAjACEOFQAAJQAgGAAAJgAgGQAAJgAgJwEAAAABKAEAAAAFKQEAAAAFKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAJAAhLwEAAAABMAEAAAABMQEAAAABCCcCAAAAASgCAAAABSkCAAAABSoCAAAAASsCAAAAASwCAAAAAS0CAAAAAS4CACUAIQsnAQAAAAEoAQAAAAUpAQAAAAUqAQAAAAErAQAAAAEsAQAAAAEtAQAAAAEuAQAmACEvAQAAAAEwAQAAAAExAQAAAAEOFQAAIAAgGAAAKAAgGQAAKAAgJwEAAAABKAEAAAAEKQEAAAAEKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAJwAhLwEAAAABMAEAAAABMQEAAAABCycBAAAAASgBAAAABCkBAAAABCoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACgAIS8BAAAAATABAAAAATEBAAAAAQscAAApADAdAAAEABAeAAApADAfAQAqACEgAQAqACEhAQAqACEiAQAqACEjAQArACEkAgAsACElAgAsACEmQAAtACELJwEAAAABKAEAAAAEKQEAAAAEKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAKAAhLwEAAAABMAEAAAABMQEAAAABCycBAAAAASgBAAAABSkBAAAABSoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACYAIS8BAAAAATABAAAAATEBAAAAAQgnAgAAAAEoAgAAAAQpAgAAAAQqAgAAAAErAgAAAAEsAgAAAAEtAgAAAAEuAgAgACEIJ0AAAAABKEAAAAAEKUAAAAAEKkAAAAABK0AAAAABLEAAAAABLUAAAAABLkAAIQAhAAAAAAAAATIBAAAAAQEyAQAAAAEFMgIAAAABMwIAAAABNAIAAAABNQIAAAABNgIAAAABATJAAAAAAQAAAAAFFQAGFgAHFwAIGAAJGQAKAAAAAAAFFQAGFgAHFwAIGAAJGQAKAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkL"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map
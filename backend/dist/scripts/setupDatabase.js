"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase credentials in backend/.env");
}
const schemaSql = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../schema.sql"), "utf-8");
console.log("Applying Supabase schema...");
const tmpFilename = path_1.default.resolve(__dirname, "../../schema-temp.sql");
fs_1.default.writeFileSync(tmpFilename, schemaSql);
(0, child_process_1.execSync)(`npx supabase db reset --project-ref ${supabaseUrl} --accept-defaults`, { stdio: "inherit" });
fs_1.default.unlinkSync(tmpFilename);
console.log("Schema applied.");

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error("Missing Supabase credentials in backend/.env");
}

const schemaSql = fs.readFileSync(path.resolve(__dirname, "../../schema.sql"), "utf-8");
console.log("Applying Supabase schema...");

const tmpFilename = path.resolve(__dirname, "../../schema-temp.sql");
fs.writeFileSync(tmpFilename, schemaSql);
execSync(`npx supabase db reset --project-ref ${supabaseUrl} --accept-defaults`, { stdio: "inherit" });
fs.unlinkSync(tmpFilename);
console.log("Schema applied.");

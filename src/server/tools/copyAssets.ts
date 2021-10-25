/* copyAssets.ts MODEL
Student Name: Joshua Harding
Student ID: 301186067
Date: dd/mm/yyyy = 20/10/2021 */

/* This is a helper function that copys our resources into the dist folder before building,
so that all the transpiled js files can access their needed resources after building.
It is used in package.json */

// just need to copy the files with unix commands using shelljs
import shell from "shelljs";
// Recursively copy all the view templates and assets located in src/server/views and src/public folders into our dist folder
shell.cp("-R", ["src/public"], "dist/");
shell.cp("-R", ["src/server/views/"], "dist/server/");
// Clean up unnecessary ts files
shell.rm(["dist/public/scripts/*.ts"]);
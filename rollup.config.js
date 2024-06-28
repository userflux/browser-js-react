import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

export default {
	input: "src/index.js", // Your main entry point
	output: [
		{
			file: "dist/index.js",
			format: "cjs",
			exports: "named",
		},
		{
			file: "dist/index.esm.js",
			format: "esm",
		},
	],
	external: ["react"], // Declares React as an external dependency
	plugins: [
		resolve({
			extensions: [".js", ".jsx"],
		}),
		commonjs(),
		babel({
			babelHelpers: "bundled",
			exclude: "node_modules/**",
			presets: ["@babel/preset-env", "@babel/preset-react"],
			extensions: [".js", ".jsx"],
		}),
	],
}

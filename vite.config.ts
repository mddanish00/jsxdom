import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: false,
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'cjs'],
			fileName: 'index',
		},
		rollupOptions: {
			output: {
				banner: "'use client';",
				interop: 'auto',
				inlineDynamicImports: true,
			},
		},
	},
	plugins: [
		dts({
			rollupTypes: true,
			afterBuild: () => {
				fs.copyFileSync('dist/index.d.cts', 'dist/index.d.ts');
			},
		}),
	],
});
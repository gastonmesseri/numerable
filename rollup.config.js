import path from 'path';
import typescript from 'rollup-plugin-typescript2';

const base = (input, outputDir, extension, format) => ({
    input,
    preserveModules: true,
    treeshake: false,
    output: {
        format,
        dir: outputDir,
        entryFileNames: c => {
            const filename = path.basename(c.facadeModuleId);
            const file = filename.split('.');
            file[file.length - 1] = extension;
            return file.join('');
        }
    },
    watch: {
        include: './**',
        exclude: [
            'node_modules',
            '**/*.spec.ts'
        ],
        clearScreen: false
    },
    plugins: [
        typescript({
            tsconfig: 'tsconfig.rollup-build.json',
            useTsconfigDeclarationDir: true
        }),
    ],
});

module.exports = [
    base('./src/index.ts', './dist', '.mjs', 'esm'),
    base('./src/index.ts', './dist', '.js', 'commonjs'),
    base('./src/locale/index.ts', './dist/locale', '.mjs', 'esm'),
    base('./src/locale/index.ts', './dist/locale', '.js', 'commonjs'),
];

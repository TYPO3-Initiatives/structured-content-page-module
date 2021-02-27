/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

module.exports = function (grunt) {

  const sass = require('node-sass');

  /**
   * Grunt stylefmt task
   */
  grunt.registerMultiTask('formatsass', 'Grunt task for stylefmt', function () {
    var options = this.options(),
      done = this.async(),
      stylefmt = require('stylefmt'),
      scss = require('postcss-scss'),
      files = this.filesSrc.filter(function (file) {
        return grunt.file.isFile(file);
      }),
      counter = 0;
    this.files.forEach(function (file) {
      file.src.filter(function (filepath) {
        var content = grunt.file.read(filepath);
        var settings = {
          from: filepath,
          syntax: scss
        };
        stylefmt.process(content, settings).then(function (result) {
          grunt.file.write(file.dest, result.css);
          grunt.log.success('Source file "' + filepath + '" was processed.');
          counter++;
          if (counter >= files.length) done(true);
        });
      });
    });
  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      sources: 'Sources/',
      root: '../',
      sass: '<%= paths.sources %>Sass/',
      typescript: '<%= paths.sources %>/TypeScript/',
      sysext: '<%= paths.root %>typo3/sysext/',
      page: '<%= paths.root %>Resources/',
      node_modules: 'node_modules/',
      t3icons: '<%= paths.node_modules %>@typo3/icons/dist/'
    },
    stylelint: {
      options: {
        configFile: '<%= paths.root %>.stylelintrc',
      },
      sass: ['<%= paths.sass %>**/*.scss']
    },
    formatsass: {
      sass: {
        files: [{
          expand: true,
          cwd: '<%= paths.sass %>',
          src: ['**/*.scss'],
          dest: '<%= paths.sass %>'
        }]
      }
    },
    sass: {
      options: {
        implementation: sass,
        outputStyle: 'expanded',
        precision: 8,
        includePaths: [
          'node_modules/bootstrap/scss',
          'node_modules/font-awesome/scss',
          'node_modules/tagsort'
        ]
      },
      page: {
        files: {
          "<%= paths.page %>Public/Css/page.css": "<%= paths.sass %>page.scss"
        }
      },
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')(),
          require('postcss-clean')({
            rebase: false,
            level: {
              1: {
                specialComments: 0
              }
            }
          }),
          require('postcss-banner')({
            banner: 'This file is part of the TYPO3 CMS project.\n' +
            '\n' +
            'It is free software; you can redistribute it and/or modify it under\n' +
            'the terms of the GNU General Public License, either version 2\n' +
            'of the License, or any later version.\n' +
            '\n' +
            'For the full copyright and license information, please read the\n' +
            'LICENSE.txt file that was distributed with this source code.\n' +
            '\n' +
            'The TYPO3 project - inspiring people to share!',
            important: true,
            inline: false
          })
        ]
      },
      page: {
        src: '<%= paths.page %>Public/Css/*.css'
      },
    },
    exec: {
      ts: ((process.platform === 'win32') ? 'node_modules\\.bin\\tsc.cmd' : './node_modules/.bin/tsc') + ' --project tsconfig.json',
      'yarn-install': 'yarn install'
    },
    eslint: {
      options: {
        cache: true,
        cacheLocation: './.cache/eslintcache/',
        configFile: 'eslintrc.js'
      },
      files: {
        src: [
          '<%= paths.typescript %>/**/*.ts',
          './types/**/*.ts'
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: '<%= paths.sass %>**/*.scss',
        tasks: 'css'
      },
      ts: {
        files: '<%= paths.typescript %>/**/*.ts',
        tasks: 'scripts'
      }
    },
    copy: {
      options: {
        punctuation: ''
      },
      ts_files: {
        files: [{
          expand: true,
          cwd: '<%= paths.root %>Build/JavaScript/',
          src: ['**/*.js', '**/*.js.map'],
          dest: '<%= paths.page %>Public/JavaScript/',
          rename: function (dest, src) {
              console.log(src, dest);
            var srccleaned = src.replace('Resources/Public/TypeScript', 'Resources/Public/JavaScript');
            srccleaned = srccleaned.replace('Tests/', 'Tests/JavaScript/');
            var destination = dest + srccleaned;

            // Apply terser configuration for regular files only
            var config = {
              terser: {
                typescript: {
                  files: []
                }
              }
            };
            var uglyfile = {};
            uglyfile[destination] = destination;
            config.terser.typescript.files.push(uglyfile);
            grunt.config.merge(config);

            return destination;
          }
        }]
      },
    },
    newer: {
      options: {
        cache: './.cache/grunt-newer/'
      }
    },
    rollup: {
      options: {
        format: 'amd',
        onwarn: function(warning) {
          if (warning.code === 'THIS_IS_UNDEFINED' && grunt.file.match('*/lit-html/directives/async-*.js')) {
            // lit-html's Symbol.asyncIterator polyfill in async-{append/replace}.js contains
            // a global check for `this`: `(this && this.__asyncValues) || function (o) {`.
            // rollup will rewrite that to `function (o) {` and warn about rewriting `this`.
            // The rewrite is perfectly ok, the AMD module will act as a singleton, so no
            // global window object is needed here. The warning is therefore silenced.
            return;
          }
          console.warn( warning.message );
        }
      },
      'lit-html': {
        options: {
          preserveModules: true,
          plugins: () => [
            {
              name: 'terser',
              renderChunk: code => require('terser').minify(code, grunt.config.get('terser.options'))
            }
          ]
        },
        files: {
          '<%= paths.core %>Public/JavaScript/Contrib/lit-html': [
            'node_modules/lit-html/lit-html.js',
            'node_modules/lit-html/directives/*.js',
            'node_modules/lit-html/lib/*.js',
            // omitted, empty
            '!node_modules/lit-html/lib/render-options.js',
            '!node_modules/lit-html/lib/template-processor.js',
          ]
        }
      },
      'lit-element': {
        options: {
          preserveModules: true,
          plugins: () => [
            {
              name: 'terser',
              renderChunk: code => require('terser').minify(code, grunt.config.get('terser.options'))
            },
            {
              name: 'externals',
              resolveId: (source) => {
                if (source === 'lit-html/lit-html.js') {
                  return {id: 'lit-html', external: true}
                }
                if (source === 'lit-html/lib/shady-render.js') {
                  return {id: 'lit-html/lib/shady-render', external: true}
                }
                return null
              }
            }
          ]
        },
        files: {
          '<%= paths.core %>Public/JavaScript/Contrib/lit-element': [
            'node_modules/lit-element/lit-element.js',
            'node_modules/lit-element/lib/*.js',
          ]
        }
      },
    },
    terser: {
      options: {
        output: {
          ecma: 8
        }
      },
      typescript: {
        options: {
          output: {
            preamble: '/*\n' +
              ' * This file is part of the TYPO3 CMS project.\n' +
              ' *\n' +
              ' * It is free software; you can redistribute it and/or modify it under\n' +
              ' * the terms of the GNU General Public License, either version 2\n' +
              ' * of the License, or any later version.\n' +
              ' *\n' +
              ' * For the full copyright and license information, please read the\n' +
              ' * LICENSE.txt file that was distributed with this source code.\n' +
              ' *\n' +
              ' * The TYPO3 project - inspiring people to share!' +
              '\n' +
              ' */',
            comments: /^!/
          }
        },
        // Generated by copy:ts_files task
        files: {}
      }
    },
    lintspaces: {
      html: {
        src: [
          '<%= paths.root %>/Resources/Private/**/*.html'
        ],
        options: {
          editorconfig: '../.editorconfig'
        }
      }
    }
  });

  // Register tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-npmcopy');
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  /**
   * grunt default task
   *
   * call "$ grunt"
   *
   * this will trigger the CSS build
   */
  grunt.registerTask('default', ['css']);

  /**
   * grunt lint
   *
   * call "$ grunt lint"
   *
   * this task does the following things:
   * - eslint
   * - stylelint
   * - lintspaces
   */
  grunt.registerTask('lint', ['eslint', 'stylelint', 'lintspaces']);

  /**
   * grunt format
   *
   * call "$ grunt format"
   *
   * this task does the following things:
   * - formatsass
   * - lint
   */
  grunt.registerTask('format', ['formatsass', 'stylelint']);

  /**
   * grunt css task
   *
   * call "$ grunt css"
   *
   * this task does the following things:
   * - formatsass
   * - sass
   * - postcss
   */
  grunt.registerTask('css', ['formatsass', 'newer:sass', 'newer:postcss']);

  /**
   * grunt update task
   *
   * call "$ grunt update"
   *
   * this task does the following things:
   * - yarn install
   * - copy some components to a specific destinations because they need to be included via PHP
   */
  grunt.registerTask('update', ['exec:yarn-install', 'rollup']);

  /**
   * grunt compile-typescript task
   *
   * call "$ grunt compile-typescript"
   *
   * This task does the following things:
   * - 1) Check all TypeScript files (*.ts) with ESLint which are located in sysext/<EXTKEY>/Resources/Private/TypeScript/*.ts
   * - 2) Compiles all TypeScript files (*.ts) which are located in sysext/<EXTKEY>/Resources/Private/TypeScript/*.ts
   */
  grunt.registerTask('compile-typescript', ['tsconfig', 'eslint', 'exec:ts']);

  /**
   * grunt scripts task
   *
   * call "$ grunt scripts"
   *
   * this task does the following things:
   * - 1) Compiles TypeScript (see compile-typescript)
   * - 2) Copy all generated JavaScript files to public folders
   * - 3) Minify build
   */
  grunt.registerTask('scripts', ['compile-typescript', 'newer:copy:ts_files', 'newer:terser:typescript']);

  /**
   * grunt clear-build task
   *
   * call "$ grunt clear-build"
   *
   * Removes all build-related assets, e.g. cache and built files
   */
  grunt.registerTask('clear-build', function () {
    grunt.option('force');
    grunt.file.delete('.cache');
    grunt.file.delete('JavaScript');
  });

  /**
   * grunt tsconfig task
   *
   * call "$ grunt tsconfig"
   *
   * this task updates the tsconfig.json file with modules paths for all sysexts
   */
  grunt.task.registerTask('tsconfig', function () {
    var config = grunt.file.readJSON("tsconfig.json");
    config.compilerOptions.paths = {};
    var sysext = grunt.config.get('paths.sysext');
    grunt.file.expand(sysext + '*/Resources/Public/JavaScript').forEach(function (dir) {
      var extname = ('_' + dir.match(/sysext\/(.*?)\//)[1]).replace(/_./g, function (match) {
        return match.charAt(1).toUpperCase();
      });
      var namespace = 'TYPO3/CMS/' + extname + '/*';
      var path = dir + "/*";
      var extensionTypeScriptPath = path.replace('Public/JavaScript', 'Public/TypeScript').replace(sysext, '');
      config.compilerOptions.paths[namespace] = [path, extensionTypeScriptPath];
    });
    config.compilerOptions.paths['TYPO3/CMS/Page/*'] = ['../Resources/Public/JavaScript', '../Resources/Public/TypeScript'];

    grunt.file.write('tsconfig.json', JSON.stringify(config, null, 4));
  });

  /**
   * grunt build task
   *
   * call "$ grunt build"
   *
   * this task does the following things:
   * - execute update task
   * - execute copy task
   * - compile sass files
   * - uglify js files
   * - minifies svg files
   * - compiles TypeScript files
   */
  grunt.registerTask('build', ['clear-build', 'update', 'compile-typescript', 'copy', 'format', 'css', 'terser']);
};

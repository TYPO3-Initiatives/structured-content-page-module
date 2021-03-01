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
  grunt.registerTask('update', ['exec:yarn-install']);

  /**
   * grunt compile-typescript task
   *
   * call "$ grunt compile-typescript"
   *
   * This task does the following things:
   * - 1) Check all TypeScript files (*.ts) with ESLint which are located in sysext/<EXTKEY>/Resources/Private/TypeScript/*.ts
   * - 2) Compiles all TypeScript files (*.ts) which are located in sysext/<EXTKEY>/Resources/Private/TypeScript/*.ts
   */
  grunt.registerTask('compile-typescript', ['eslint', 'exec:ts']);

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

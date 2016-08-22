# W3BP

A boilerplate for web-based applications based on H5BP but simpler.

## Features

 - Pug (or jade) as the preprocessor for web pages.
 - Stylus as the preprocessor for stylesheets.
  - With nib to provide CSS3 extensions.
 - Babel.js transpiling all JavaScript to ES5.
 - All images are minifed before copying into output.

## Usage

To use, simply fork/clone the repo and start modifying files.
If there's anything wrong or you think it's missing something, please submit issues and PRs.

**Notes:**

 - Uses `gulp` as the build system.
  - `gulp` or `gulp default` will build the application into the 'dist' directory.
  - `gulp watch` will:
   - Enable browser-sync for the distribution directory.
   - Watch for file changes, rebuild the respective sources, then reload browser-sync. 

## Author

Designed & developed by [Karim Alibhai](https://github.com/karimsa).

## License

All code licensed under the [MIT](LICENSE) license.
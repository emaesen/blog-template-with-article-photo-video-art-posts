'use strict';
/**
 * Image manipulation functions
 */
const sharp = require('sharp');

const { bytesToKbytes } = require('strapi-plugin-upload/utils/file');

const getMetadatas = buffer =>
  sharp(buffer)
    .metadata()
    .catch(() => ({})); // ignore errors

const getDimensions = buffer =>
  getMetadatas(buffer)
    .then(({ width = null, height = null, size = null }) => ({ width, height, size }))
    .catch(() => ({})); // ignore errors

/* ----- start EM customized ----- */
/* smaller thumbnail */
const THUMBNAIL_RESIZE_OPTIONS = {
  width: 125,
  height: 125,
  fit: 'inside',
};
/* ----- end EM customized ----- */

/* ----- start EM customized ----- */
/* extra config settings */
const QUALITY = strapi.config.get('plugins.upload.quality', 60)
const PROGRESSIVE = strapi.config.get('plugins.upload.progressive', true)
const MAXPNGCOLORS = strapi.config.get('maxPngColors', 18)
/* ----- end EM customized ----- */

console.log ("Image upload QUALITY:" + QUALITY)
console.log ("Image upload PROGRESSIVE:" + PROGRESSIVE)
console.log ("Image upload MAXPNGCOLORS:" + MAXPNGCOLORS)

/* ----- start EM customized ----- */
/* add quality, progressive, colors and different image formats */
const resizeTo = (buffer, options, quality, progressive, colors) =>
  sharp(buffer)
    .resize(options)
    .jpeg({ quality, progressive, force: false })
    .png({ compressionLevel: Math.floor((quality / 100) * 9), quality, progressive, colors, force: false })
    .webp({ quality, force: false })
    .tiff({ quality, force: false })
    .toBuffer()
    .catch(() => null);
/* ----- end EM customized ----- */


const generateThumbnail = async file => {
  if (!(await canBeProccessed(file.buffer))) {
    return null;
  }

  /* ----- EM customized ----- */
  /* add size */
  const { width, height, size } = await getDimensions(file.buffer);
  const origSize = size

  if (width > THUMBNAIL_RESIZE_OPTIONS.width || height > THUMBNAIL_RESIZE_OPTIONS.height) {
    /* ----- EM customized ----- */
    /* add QUALITY, PROGRESSIVE, MAXPNGCOLORS */
    const newBuff = await resizeTo(file.buffer, THUMBNAIL_RESIZE_OPTIONS, QUALITY, PROGRESSIVE, MAXPNGCOLORS);

    if (newBuff) {
      const { width, height, size } = await getMetadatas(newBuff);
      /* ----- EM customized ----- */
      /* only generate file if size is smaller than the original */
      if (size < origSize) {
        console.log(`Generating ${file.hash}_thumb${file.ext}` )
        /* ----- EM customized ----- */
        /* change values for name and hash: append key */
        return {
          name: file.name.replace(/(\.[^.]+)$/, "_thumb$1"),
          hash: `${file.hash}_thumb`,
          ext: file.ext,
          mime: file.mime,
          width,
          height,
          size: bytesToKbytes(size),
          buffer: newBuff,
          path: file.path ? file.path : null,
        };
      } else {
        console.log(`Not generating ${file.hash}_thumb${file.ext} (too large)` )
      }
    }
  }

  return null;
};


const optimize = async buffer => {
  const {
    sizeOptimization = false,
    autoOrientation = false,
  } = await strapi.plugins.upload.services.upload.getSettings();

  if (!sizeOptimization || !(await canBeProccessed(buffer))) {
    return { buffer };
  }

  const sharpInstance = autoOrientation ? sharp(buffer).rotate() : sharp(buffer);

  return sharpInstance
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const output = buffer.length < data.length ? buffer : data;

      return {
        buffer: output,
        info: {
          width: info.width,
          height: info.height,
          size: bytesToKbytes(output.length),
        },
      };
    })
    .catch(() => ({ buffer }));
};

/* ----- start EM customized ----- */
/* more and different breakpoints */
const DEFAULT_BREAKPOINTS = {
  w3300: 3300,
  w2520: 2520,
  w2200: 2200,
  w1680: 1680,
  w1100: 1100,
  w840: 840,
  w550: 550,
  w370: 370,
  w275: 275,
  w220: 220
};
/* ----- end EM customized ----- */

const getBreakpoints = () => strapi.config.get('plugins.upload.breakpoints', DEFAULT_BREAKPOINTS);

const generateResponsiveFormats = async file => {
  const {
    responsiveDimensions = false,
  } = await strapi.plugins.upload.services.upload.getSettings();

  if (!responsiveDimensions) return [];

  if (!(await canBeProccessed(file.buffer))) {
    return [];
  }

  const originalDimensions = await getDimensions(file.buffer);

  const breakpoints = getBreakpoints();
  return Promise.all(
    Object.keys(breakpoints).map(key => {
      const breakpoint = breakpoints[key];

      if (breakpointSmallerThan(breakpoint, originalDimensions)) {
        return generateBreakpoint(key, { file, breakpoint, originalDimensions });
      }
    })
  );
};

const generateBreakpoint = async (key, { file, breakpoint, originalDimensions}) => {
  /* ----- EM customized ----- */
  /* remove height constraint, add QUALITY, PROGRESSIVE, MAXPNGCOLORS */
  const newBuff = await resizeTo(file.buffer, {
    width: breakpoint,
    fit: 'inside',
  }, QUALITY, PROGRESSIVE, MAXPNGCOLORS);

  if (newBuff) {
    /* ----- EM customized ----- */
    /* only generate file if size is smaller than the original */
    const { width, height, size } = await getMetadatas(newBuff);
    const origSize = originalDimensions.size
    if (size < origSize) {
      console.log(`Generating ${file.hash}_${key}${file.ext}` )
      /* ----- EM customized ----- */
      /* change values for name and hash: append key */
      return {
        key,
        file: {
          name: file.name.replace(/(\.[^.]+)$/, "_" + key + "$1"),
          hash: `${file.hash}_${key}`,
          ext: file.ext,
          mime: file.mime,
          width,
          height,
          size: bytesToKbytes(size),
          buffer: newBuff,
          path: file.path ? file.path : null,
        },
      };
    } else {
      console.log(`Not generating ${file.hash}_${key}${file.ext} (too large)` )
    }

  }
  
  return null;
};

const breakpointSmallerThan = (breakpoint, { width, height }) => {
  return breakpoint < width || breakpoint < height;
};

const formatsToProccess = ['jpeg', 'png', 'webp', 'tiff'];
const canBeProccessed = async buffer => {
  const { format } = await getMetadatas(buffer);
  return format && formatsToProccess.includes(format.toLowerCase());
};

module.exports = {
  getDimensions,
  generateResponsiveFormats,
  generateThumbnail,
  bytesToKbytes,
  optimize,
};

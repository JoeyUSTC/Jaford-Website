// One-time export on the isolated artwork branch; not part of website builds.
const sharp = require(process.env.RUNNER_TEMP + "/jaford-artwork/node_modules/sharp");
const fs = require("node:fs");
(async () => {
  const source = "public/images/products/custom-3d-printing-process.png";
  const output = source.replace(".png", ".webp");
  const {data, info} = await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const corners = [[0,0],[info.width-1,0],[0,info.height-1],[info.width-1,info.height-1]].map(([x,y])=>data[(y*info.width+x)*4+3]);
  if (corners.some(alpha=>alpha!==0)) throw new Error("Artwork background corners must be transparent.");
  await sharp(source).webp({quality:84,alphaQuality:100,effort:6}).toFile(output);
  const metadata = await sharp(output).metadata();
  if (!metadata.hasAlpha) throw new Error("Export lost transparency.");
  const bytes = fs.statSync(output).size;
  if (bytes > 300000) throw new Error("Artwork exceeds 300 kB budget.");
  console.log(JSON.stringify({output,width:metadata.width,height:metadata.height,bytes,hasAlpha:metadata.hasAlpha,corners}));
})().catch(error=>{console.error(error);process.exitCode=1;});

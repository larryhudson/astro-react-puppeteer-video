import puppeteer from "puppeteer";
import fs from "fs";
import stream from "stream";
import { spawn } from "child_process";

async function main() {
  const videoHeight = 720;
  const videoWidth = 1280;

  const videoOutputPath = "output.mp4";

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: videoWidth,
      height: videoHeight,
    },
  });

  const browserPage = await browser.newPage();

  await browserPage.goto("http://localhost:4321");

  // await browserPage.waitForSelector("#map-is-ready");

  let currentTimeSecs = 0;
  const framesPerSecond = 30;
  const secondsPerFrame = 1.0 / framesPerSecond;

  // get the duration of the video from the '#video-duration' element
  // const videoDurationSecs = await browserPage.evaluate(() => {
  //     return Number(document.querySelector("#video-duration").getAttribute("data-duration"));
  // })
  await browserPage.waitForSelector(".map-idle");

  // TODO: get this from the webpage
  const videoDurationSecs = await browserPage.evaluate(() => {
    return window.totalDuration;
  })

  console.log({ videoDurationSecs });

  const imagesStream = new stream.PassThrough();

  const ffmpegProcess = spawn("ffmpeg", [
    "-y",
    "-f",
    "image2pipe",
    "-s",
    `${videoWidth}x${videoHeight}`,
    "-framerate",
    framesPerSecond.toString(),
    "-i",
    "-",
    videoOutputPath,
  ]);

  ffmpegProcess.stdout.on("data", (data) => console.log(data.toString()));
  ffmpegProcess.stderr.on("data", (data) => console.log(data.toString()));
  ffmpegProcess.on("close", (code) => {
    console.log(`done writing video! (${code})`);
  });

  imagesStream.pipe(ffmpegProcess.stdin);

  let previousScreenshot: Buffer | null = null;

  while (currentTimeSecs < videoDurationSecs) {
    const frameNum = currentTimeSecs * framesPerSecond;
    console.log("Frame number", frameNum);
    await browserPage.evaluate((currentTimeSecs) => {
      const frameEvent = new CustomEvent("goToTime", {
        detail: { time: currentTimeSecs }, // Example detail, adjust as necessary
      });
      document.dispatchEvent(frameEvent);
    }, currentTimeSecs);

    await browserPage.waitForSelector(".map-idle");

    // check if there is a div element with the id 'use-previous'

    // const isClean = await browserPage.evaluate(() => {
    //   return !document
    //     .getElementById("video-wrapper")
    //     ?.classList.contains("dirty");
    // });

    // console.log({isClean})

    // if (isClean && previousScreenshot) {
    //     console.log("using previous")
    //   imagesStream.write(previousScreenshot);
    // } else {
    const screenshot = await browserPage.screenshot({
      type: "png",
    });
    imagesStream.write(screenshot);
    // previousScreenshot = screenshot;

    // await browserPage.evaluate(() => {
    //   document.dispatchEvent(new CustomEvent("setClean"));
    // });
    // }

    currentTimeSecs += secondsPerFrame;
  }

  imagesStream.end();
  await new Promise((resolve) => {
    ffmpegProcess.on("close", resolve);
  });
  // await browser.close();
}

main();

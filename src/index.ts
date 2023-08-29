// Libs
import { existsSync, rmSync } from "fs";

import ffmpeg from "ffmpeg";

// Data
const TRIM_LENGTH = Number(process.env.TRIM_LENGTH!);
const VIDEO_PATH = process.env.VIDEO_PATH!;
const MULTI_TRIMMING = Number(process.env.MULTI_TRIMMING!);

const video = await new ffmpeg(VIDEO_PATH);

// Code
const videoSeconds = video.metadata.duration?.seconds!;
console.info(
  `The video has ${videoSeconds} seconds. Creating ${
    videoSeconds / TRIM_LENGTH
  } trims...`,
);

// Loop the entire video.
for (let i = 0; i * TRIM_LENGTH < videoSeconds; i += MULTI_TRIMMING) {
  const promisesArr: Promise<string>[] = [];

  // Create X (MULTI_TRIMMING) promises to trim some piece from the video.
  for (let trim = 0; trim < MULTI_TRIMMING; trim++) {
    const trimI = i + trim;
    const trimOutput = `./data/video_${trimI}.mp4`;

    // Delete if file already exists.
    console.info("Starting the trim #" + trimI);
    if (existsSync(trimOutput)) rmSync(trimOutput);

    // Add to the promises array the promise that'll create the video_X.mp4.
    promisesArr.push(
      video
        .setVideoStartTime(trimI * TRIM_LENGTH)
        .setVideoDuration(TRIM_LENGTH)
        .save(trimOutput),
    );
  }
  await Promise.all(promisesArr);
}

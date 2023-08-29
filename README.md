# Video trimmer
[![Code Quality](https://github.com/GSaiki26/video-trimmer/actions/workflows/quality.yaml/badge.svg?branch=master&event=push)](https://github.com/GSaiki26/video-trimmer/actions/workflows/quality.yaml) [![Code Security](https://github.com/GSaiki26/video-trimmer/actions/workflows/security.yaml/badge.svg?branch=master&event=push)](https://github.com/GSaiki26/video-trimmer/actions/workflows/security.yaml) [![Project Build](https://github.com/GSaiki26/video-trimmer/actions/workflows/build.yaml/badge.svg?branch=master&event=push)](https://github.com/GSaiki26/video-trimmer/actions/workflows/build.yaml)

The video trimmer is a Oven Bun application using TS and ffmpeg to trim differents parts from a video equally.

# Usage
## Env variables
In order to use this software, you'll need to configure the environment variables (an example file can be found on the / folder). Here's the description:
- `MULTI_TRIMMING`: The amount of promises that'll be created asynchronous to trim some piece of the video.
- `TRIM_LENGTH`: The amount of time, in seconds, that each trim'll get.
- `VIDEO_PATH`: The path to the main video. The default path is: "./data/video.mp4"

## Video
The video need to match the `VIDEO_PATH` env. It's recommended to just move the wanted video to the default `VIDEO_PATH` value.

# Running
You can simply run this project using Docker, as below:
```sh
# With docker-compose
docker-compose up --build

# With raw docker
docker rm -f video-trimmer;
docker build -t video-trimmer .;
docker run -ti --name video-trimmer -v ./data:/app/data:rw --env-file ./video-trimmer.env video-trimmer;
```

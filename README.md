# 3D SVG Engine

Inspired by the [OneLoneCoder_oclEngine3D](https://github.com/OneLoneCoder/Javidx9/tree/master/ConsoleGameEngine/BiggerProjects/Engine3D).

## What is this?
Just a hobby project to learn what goes into a 3D rendering engine. Most of the code was written while following along with [this video series](https://youtu.be/ih20l3pJoeU) but rewriting it to be a javascript project instead of C++.

No 3rd party libraries are used in this project. All rendering is done using standard SVG drawing routines, so rendering can be very slow but very good at scale. Because SVG defines shapes instead of pixels, the same scene will take the same time to render at 10x10 as it will at 1920x1080.

![img](/images/mountains.jpg)

Wireframe rendering is quite a bit slower due to the need to draw each line of every triangle, thus turning one polygon into three lines. There may be a way to check if a line exists before drawing a new one, but the current version does not make any attempt at that kind of optimization.

![img](/images/mountains_wf.jpg)

## Running
As long as index.html and Library.js are in the same directory, there is no setup required. You can download this project and unzip it to your desktop and just double-click index.html to open it in a browser and it will run.

### Controls

| Key | Action |
| --- | --- |
| Up Arrow | Move camera up |
| Down Arrow | Move camera down |
| Left Arrow | Move camera left |
| Right Arrow | Move camera right |
| W Key | Move camera forward |
| S Key | Move camera backward |
| A Key | Pan camera left |
| D Key | Pan camera right |

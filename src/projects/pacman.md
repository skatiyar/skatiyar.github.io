---
title: Pacman
description: Classic Pacman with procedurally generated infinite vertical maze.
type: opensource
repo: https://github.com/skatiyar/pacman
url: https://skatiyar.info/pacman/
date: '2018-11-10'
ranking: 3
---

I came across Eller's algorithm for maze generation, a few months back. Eller's algorithm creates a perfect maze, by generating next row, on basis of current row. Giving us ability to create maze with infinite rows.

Since then I have been toying with idea of creating a game around it. It wasn't until a few days ago that I finally decided to use Pacman as the basis for game. I had experimented with Ebiten 2D game engine a bit and this gave me a good opportunity to use it. For maze generation I slightly modified Eller's algorithm to create non-perfect mazes.

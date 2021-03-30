# Quacker

Listen for global shortcuts and run Javascript in response.

**This software is currently pre-production and is not currently recommended for use.**

## Why?

Having bought the fantastic [Duckypad](https://github.com/dekuNukem/duckyPad) macro keypad, I wanted a solution where I could send key commands to take equivalent and complex actions on Windows and Mac.

## Security

**TLDR: Use at your own risk.**

Shortcuts can be set up to run any given Javascript in a NodeJS `vm` context. This means that that complex actions can be executed: it also means that a lot of damage can be done, including but not limited to the permanent removal of files and installation of malicious software.

**Do not run any Javascript that you do not understand and trust.**

Be wary when copying and pasting or otherwise importing Javascript to run in response to a shortcut.

This project including source and executables are distributed under the [MIT license](https://github.com/harryjubb/quacker/blob/master/LICENSE) and the liability and warranty limitations of that license apply.

## Attributions

The duck icon used for Quacker is designed by [OpenMoji](https://openmoji.org) – the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#). The original has been modified to be filled in white, and to be resized and converted to application icons. Modified versions are available in this repository at `src/img/1F986_black_filled*.*`. The original and modified versions are licensed separately to the rest of the project, under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#).
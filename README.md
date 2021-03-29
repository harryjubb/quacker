# Quacker

Listen for global shortcuts and run Javascript in response.

## Why?

Having bought the fantastic [Duckypad](https://github.com/dekuNukem/duckyPad) macro keypad, I wanted a solution where I could send key commands to take equivalent and complex actions on Windows and Mac.

## Security

**TLDR: Use at your own risk.**

Shortcuts can be set up to run any given Javascript in a NodeJS `vm` context. This means that that complex actions can be executed: it also means that a lot of damage can be done, including but not limited to the permanent removal of files and installation of unwanted software.

**Do not run any Javascript that you do not understand and trust.**

Be wary when copying and pasting or otherwise importing Javascript to run in response to a shortcut.

This project including source and executables are distributed under the [MIT license](https://github.com/harryjubb/quacker/blob/master/LICENSE) and the liability and warranty limitations of that license apply.
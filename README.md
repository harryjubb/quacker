# Quacker

Listen for global shortcuts and ~quack~ run Javascript in response.

**This software is currently pre-production and is incomplete.**

## Why?

Having bought the fantastic [Duckypad](https://github.com/dekuNukem/duckyPad) macro keypad, I wanted a solution where I could send key commands to take equivalent and complex actions on Windows and Mac. The name is of course inspired by Duckypad: quacking actions in response to keyboard shortcuts.

> quacker
>
> _noun_
> 
> One who quacks

Via [Wiktionary](https://en.wiktionary.org/wiki/quacker) (unaltered, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/))

## Security

**TLDR: Use at your own risk.**

Shortcuts can be set up to run any given Javascript in a NodeJS `vm` context. This means that that complex actions can be executed: it also means that a lot of damage can be done, including but not limited to the permanent removal of files and installation of malicious software.

**Do not run any Javascript that you do not understand and trust.**

Be wary when copying and pasting or otherwise importing Javascript to run in response to a shortcut.

This project including source and executables are distributed under the [MIT license](https://github.com/harryjubb/quacker/blob/master/LICENSE) and the liability and warranty limitations of that license apply.

## Need help? Want to share scripts?

Please use the [discussions](https://github.com/harryjubb/quacker/discussions) section to ask questions and share usage notes. Please search existing discussions to see if anything matches your question before creating a new one.

If you have an example shortcut that you'd like to share, please feel free to make a [pull request](https://github.com/harryjubb/quacker/pulls) to add the JSON export to the `examples` directory. Please edit to export to ensure only the shortcut(s) relevant to the example are included.

## Found a bug? Want a new feature?

Please use the [issues](https://github.com/harryjubb/quacker/issues) section to file bug reports. Please search existing issues to see if anything matches your issue before creating a new one. Please fill in the relevant issue template. 

## Developing

Yarn (classic) is used as the package manager. There is an `nvmrc` to match the Node version used with the version used by Electron.

### Setup

```nvm install && nvm use && yarn && yarn run robotjs:rebuild```

### Development

```yarn start```

### Building

```yarn make```

## Attributions

The duck icon used for Quacker is designed by [OpenMoji](https://openmoji.org) – the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#). The original has been modified to be filled in white, and to be resized and converted to application icons. Modified versions are available in this repository at `src/img/1F986_black_filled*.*`. The original and modified versions are licensed separately to the rest of the project, under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/#).

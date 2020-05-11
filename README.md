# autocolor

Convert color code to proper syntax based on different languages.

## Features

For colorcode will only transform when it's in format. Currently will only transform in `dart` language.

```
#ffffff
#000 
#fff_10 
#ffffff_10
```

#### Dart

In `dart` will be able to transform into ARGB or RGBO syntax.

```
#ffffff => Colors.fromRGBO(255, 255, 255, 1)
#fffff  => Colors.fromARGB(255, 255, 255, 255) 
```

## Requirements

At least version `1.32.0` or `latest` version of vscode.

## Extension Settings

This extension contributes the following settings:

* `autocolor.enable`: enable/disable this extension

## Release Notes

### 1.0.0

Initial release of autocolor. Currently will only support HEX to RGBO and ARGB in `Dart`. 

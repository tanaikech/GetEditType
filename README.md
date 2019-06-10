# GetEditType

<a name="TOP"></a>
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="Overview"></a>

# Overview

**GetEditType is a GAS library for retrieving the edit types of the OnEdit event trigger of Spreadsheet using Google Apps Script (GAS).**

<a name="Description"></a>

# Description

In the case that the OnEdit event trigger (simple and installable triggers) is used at Spreadsheet, when users manually edited the cell of Spreadsheet, the trigger is fired. At this time, there is the case that I want to know the edit type. For example, I would like to know about the following edit types.

1. Empty cell was edited
2. Cell with a value was overwritten by a value.
3. Value of cell with a value was removed.
4. Value was added by the copied-down action.
5. Value of the clipboard was directly pasted to a cell.
6. Cell was moved.

Above situations will also occur at the multiple cells.

These situations might be modified by Google's update. So I created this as a library. By this, when the specification was modified by the update, users and I can use the latest specification by updating the library.

# Library's project key

```
13DgweRAOSLMaRiAVcOIYAwoUmsAIrRW_DcfKchwaHJrLP3H-MdcENzZr
```

<a name="Howtoinstall"></a>

# How to install

In order to use this library, please install this as a library.

1. [Install GetEditType library](https://developers.google.com/apps-script/guides/libraries).
   - Library's project key is **`13DgweRAOSLMaRiAVcOIYAwoUmsAIrRW_DcfKchwaHJrLP3H-MdcENzZr`**.

<a name="Usage"></a>

# About scopes

This library doesn't use any scopes.

# Usage

After this library was installed to the container-bound script of Spreadsheet, you can use the following sample script. This sample script can be used for the simple OnEdit event trigger and installable OnEdit event trigger.

**When you use this library, please edit a cell at Spreadsheet. By this, the event object is returned and this library returns the result using the event object.**

## For simple trigger

```javascript
function onEdit(e) {
  var res = GetEditType.Do(e);
  Logger.log(res);
}
```

## For installable trigger

```javascript
function onEdit_sample(e) {
  var res = GetEditType.Do(e);
  Logger.log(res);
}
```

> When you want to use the installable trigger, generally, please don't install the trigger to the funciton of `onEdit()`. Because when the OnEdit event trigger is installed to `onEdit()`, the trigger is run 2 times for the simple trigger and installable trigger. Please be careful this. [Ref](https://gist.github.com/tanaikech/88f7fd5ed14da5e9afde18310da61cb5)

## Returned value

This library is returned the following values as an object.

| editCell           | type                         | description                                                                                                 |
| :----------------- | :--------------------------- | :---------------------------------------------------------------------------------------------------------- |
| MULTIPLE           | REMOVE_VALUES                | Values of multiple cells were removed.<br>Empty values were pasted.                                         |
| MULTIPLE           | PUT_VALUES_TO_MULTIPLE_CELLS | Values were put to multiple cells.<br>Copied down was run for multiple cells.<br>Cells were moved.          |
| SINGLE             | PUT_VALUE                    | Empty cell was edited.                                                                                      |
| SINGLE             | OVERWRITE_CELL               | Cell with a value was overwritten by a value.                                                               |
| SINGLE             | REMOVE_VALUE                 | Value of cell was removed.<br>Empty value was pasted.<br>Value of empty cell was removed.                   |
| SINGLE             | OTHER                        | Value of the clipboard was directly pasted to a cell.<br>Copied down was run for a cell.<br>Cell was moved. |
| SINGLE<br>MULTIPLE | UNKNOWN                      | This is the unknown edit type. If you can report this situation, I would like to update this library.       |

- About range, source and so on, please directly retrieve them from the event object.

## References

- [Simple Triggers](https://developers.google.com/apps-script/guides/triggers/#onedite)

- [Installable Triggers](https://developers.google.com/apps-script/guides/triggers/installable)

- [Event Objects](https://developers.google.com/apps-script/guides/triggers/events#edit)

- [Stackoverflow: google script detect empty cell after edit](https://stackoverflow.com/q/51548360)

- [Stackoverflow: How to make the onEdit() event object e work when copying and pasting values into blank cells or non-blank cells in Google Sheets?](https://stackoverflow.com/q/56445944)

---

<a name="Licence"></a>

# Licence

[MIT](LICENCE)

<a name="Author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

If you have any questions and commissions for me, feel free to tell me.

<a name="Update_History"></a>

# Update History

- v1.0.0 (June 10, 2019)

  1. Initial release.

[TOP](#TOP)

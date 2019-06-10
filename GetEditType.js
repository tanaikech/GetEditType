/**
 * GitHub  https://github.com/tanaikech/GetEditType<br>
 * Main method of GetEditType.<br>
 * @param {object} eventObject Event object which is returned when the OnEdit event trigger is fired.
 * @return {object} Response including the type of OnEdit and description.
 */
function Do(eventObject) {
  if (!eventObject) {
    throw new Error("Event object cannot be found.");
  }
  Array.prototype.check = function () {return this.some(function(row) {return row.some(function(col) {return col.toString() != ""})})};
  var cellValues = eventObject.range.getValues();
  var cellFormulas = eventObject.range.getFormulas();
  var obj = {};
  if (cellValues.length > 1 || cellValues[0].length > 1 || cellFormulas.length > 1 || cellFormulas[0].length > 1) {
    obj.editCell = "MULTIPLE";

    if ((eventObject.value == null) && (eventObject.oldValue == null) && !cellValues.check() && !cellFormulas.check()) {
      obj.type = "REMOVE_VALUES";
      obj.description = [
        "Values of multiple cells were removed.",
        "Empty values were pasted."
      ];
      
    } else if((eventObject.value == null) && (eventObject.oldValue == null) && (cellValues.check() || cellFormulas.check())) {
      obj.type = "PUT_VALUES_TO_MULTIPLE_CELLS";
      obj.description = [
        "Values were put to multiple cells.",
        "Copied down was run for multiple cells.",
        "Cells were moved."
      ]
    } else {
      obj.type = "UNKNOWN";
      obj.description = [
        "This is the unknown edit type. If you can report this situation, I would like to update this library."
      ];
    }
    
  } else {
    obj.editCell = "SINGLE";

    if ((eventObject.value != null) && (eventObject.oldValue == null)) {
      obj.type = "PUT_VALUE";
      obj.description = [
        "Empty cell was edited."
      ];
      
    } else if(eventObject.oldValue != undefined) {
      obj.type = "OVERWRITE_CELL";
      obj.description = [
        "Cell with a value was overwritten by a valueventObject."
      ];
      
    } else if((eventObject.value == null) && (eventObject.oldValue == null) && !cellValues.check() && !cellFormulas.check()) {
      obj.type = "REMOVE_VALUE";
      obj.description = [
        "Value of cell was removed.",
        "Empty value was pasted.",
        "Value of empty cell was removed."
      ];
      
    } else if((eventObject.value == null) && (eventObject.oldValue == null) && (cellValues.check() || cellFormulas.check())) {
      obj.type = "OTHER";
      obj.description = [
        "Value of the clipboard was directly pasted to a cell.",
        "Copied down was run for a cell.",
        "Cell was moved."
      ];
    } else {
      obj.type = "UNKNOWN";
      obj.description = [
        "This is the unknown edit type. If you can report this situation, I would like to update this library."
      ];
    }
  }
  return obj;
}

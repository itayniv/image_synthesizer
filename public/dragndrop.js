//// drag 01 ////


if (window.FileReader) {
  var drop;
  addEventHandler(window, 'load', function() {
    var status = document.getElementById('status');
    drop = document.getElementById('drop1');
    var list = document.getElementById('list1');

    function cancel(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }

    // Tells the browser that we *can* drop on this target
    addEventHandler(drop, 'dragover', cancel);
    addEventHandler(drop, 'dragenter', cancel);
    addEventHandler(drop, 'drop', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } // stops the browser from redirecting off to the image.

      var dt = e.dataTransfer;
      var files = dt.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        var reader = new FileReader();

        //attach event handlers here...

        reader.readAsDataURL(file);
        addEventHandler(reader, 'loadend', function(e, file) {

          var bin = this.result;
          var newFile = document.createElement('div');
          // newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B';
          list.appendChild(newFile);

          var fileNumber = list.getElementsByTagName('div').length;
          // status.innerHTML = fileNumber < files.length ?
          // 'Loaded 100% of file ' + fileNumber + ' of ' + files.length + '...' :
          // 'Done loading. processed ' + fileNumber + ' files.';

          var img1cont = document.getElementById('img1container');
          var img1 = document.getElementById('image01');
          img1.file = file;
          img1.src = bin;
          img1cont.appendChild(img1);
        }.bindToEventHandler(file));
      }

      ///Trigger ML
      var img1 = document.getElementById('image01');
      predict1(img1);
      var hideDrop = document.getElementById('drop1');
      // hideDrop.style.opacity = 0;
      return false;

    });
    Function.prototype.bindToEventHandler = function bindToEventHandler() {
      var handler = this;
      var boundParameters = Array.prototype.slice.call(arguments);
      console.log("boundParameters",boundParameters);
      //create closure
      return function(e) {
        boundParameters.unshift(e);
        handler.apply(this, boundParameters);
      }
    };
  });
}


////// end of drag 01 ///////



//
// //// drag 02 ////
//
if (window.FileReader) {
  var drop;
  addEventHandler(window, 'load', function() {
    var status = document.getElementById('status');
    drop = document.getElementById('drop2');
    var list = document.getElementById('list2');

    function cancel(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }

    // Tells the browser that we *can* drop on this target
    addEventHandler(drop, 'dragover', cancel);
    addEventHandler(drop, 'dragenter', cancel);
    addEventHandler(drop, 'drop', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } // stops the browser from redirecting off to the image.

      var dt = e.dataTransfer;
      var files = dt.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        var reader = new FileReader();

        //attach event handlers here...

        reader.readAsDataURL(file);
        addEventHandler(reader, 'loadend', function(e, file) {

          var bin = this.result;
          var newFile = document.createElement('div');
          // newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B';
          list.appendChild(newFile);

          var fileNumber = list.getElementsByTagName('div').length;
          // status.innerHTML = fileNumber < files.length ?
          // 'Loaded 100% of file ' + fileNumber + ' of ' + files.length + '...' :
          // 'Done loading. processed ' + fileNumber + ' files.';

          var img2cont = document.getElementById('img2container');
          var img2 = document.getElementById('image02');
          img2.file = file;
          img2.src = bin;
          img2cont.appendChild(img2);
        }.bindToEventHandler(file));
      }

      ///Trigger ML
      var img2 = document.getElementById('image02');
      predict2(img2);
      var hideDrop = document.getElementById('drop2');
      // hideDrop.style.opacity = 0;
      return false;

    });
    Function.prototype.bindToEventHandler = function bindToEventHandler() {
      var handler = this;
      var boundParameters = Array.prototype.slice.call(arguments);
      console.log("boundParameters",boundParameters);
      //create closure
      return function(e) {
        boundParameters.unshift(e);
        handler.apply(this, boundParameters);
      }
    };
  });
}

////// end of drag 02 ///////




function addEventHandler(obj, evt, handler) {
  if (obj.addEventListener) {
    // W3C method
    obj.addEventListener(evt, handler, false);
  } else if (obj.attachEvent) {
    // IE method.
    obj.attachEvent('on' + evt, handler);
  } else {
    // Old school method.
    obj['on' + evt] = handler;
  }
}

if ($.super_cookie().check("data")) {
   $('#nothing').hide();
//  Read cookie values as JSON object
     var data = $.super_cookie().read_JSON("data");
     var timeline = $.super_cookie().read_JSON("timeline");
     doc = new jsPDF();
     var rowCounterPdf = 0; 
     var processedPictures = $.super_cookie().read_JSON("processedPictures");  
     RemakePictures();
   }

   else {
        data = [];
        timeline =[];
        var doc = new jsPDF();
        var processedPictures = 0;
        rowCounterPdf = 0;
        doc.setFontSize(22);
        doc.text(20, 20, '        AdamGoodPlanner Triplist.');
        doc.setFontSize(18);
        rowCounterPdf = rowCounterPdf + 30;
        doc.text(20,rowCounterPdf, 'Order.');
        rowCounterPdf = rowCounterPdf + 20;
       
}

function Print() {
   var imgData ='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QCARXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAACQAAAAAQAAAJAAAAABAAKgAgAEAAAAAQAAAUKgAwAEAAAAAQAAAVYAAAAA/+EJIWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/PgD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+IPRElDQ19QUk9GSUxFAAEBAAAPNGFwcGwCEAAAbW50clJHQiBYWVogB+AAAQADAA0AAAAQYWNzcEFQUEwAAAAAQVBQTAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARZGVzYwAAAVAAAABiZHNjbQAAAbQAAAQaY3BydAAABdAAAAAjd3RwdAAABfQAAAAUclhZWgAABggAAAAUZ1hZWgAABhwAAAAUYlhZWgAABjAAAAAUclRSQwAABkQAAAgMYWFyZwAADlAAAAAgdmNndAAADnAAAAAwbmRpbgAADqAAAAA+Y2hhZAAADuAAAAAsbW1vZAAADwwAAAAoYlRSQwAABkQAAAgMZ1RSQwAABkQAAAgMYWFiZwAADlAAAAAgYWFnZwAADlAAAAAgZGVzYwAAAAAAAAAIRGlzcGxheQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1sdWMAAAAAAAAAIgAAAAxockhSAAAAFAAAAahrb0tSAAAADAAAAbxuYk5PAAAAEgAAAchpZAAAAAAAEgAAAdpodUhVAAAAFAAAAexjc0NaAAAAFgAAAgBkYURLAAAAHAAAAhZ1a1VBAAAAHAAAAjJhcgAAAAAAFAAAAk5pdElUAAAAFAAAAmJyb1JPAAAAEgAAAnZubE5MAAAAFgAAAohoZUlMAAAAFgAAAp5lc0VTAAAAEgAAAnZmaUZJAAAAEAAAArR6aFRXAAAADAAAAsR2aVZOAAAADgAAAtBza1NLAAAAFgAAAt56aENOAAAADAAAAsRydVJVAAAAJAAAAvRmckZSAAAAFgAAAxhtcwAAAAAAEgAAAy5jYUVTAAAAGAAAA0B0aFRIAAAADAAAA1hlc1hMAAAAEgAAAnZkZURFAAAAEAAAA2RlblVTAAAAEgAAA3RwdEJSAAAAGAAAA4ZwbFBMAAAAEgAAA55lbEdSAAAAIgAAA7BzdlNFAAAAEAAAA9J0clRSAAAAFAAAA+JqYUpQAAAADgAAA/ZwdFBUAAAAFgAABAQATABDAEQAIAB1ACAAYgBvAGoAac7st+wAIABMAEMARABGAGEAcgBnAGUALQBMAEMARABMAEMARAAgAFcAYQByAG4AYQBTAHoA7QBuAGUAcwAgAEwAQwBEAEIAYQByAGUAdgBuAP0AIABMAEMARABMAEMARAAtAGYAYQByAHYAZQBzAGsA5gByAG0EGgQ+BDsETAQ+BEAEPgQyBDgEOQAgAEwAQwBEIA8ATABDAEQAIAZFBkQGSAZGBikATABDAEQAIABjAG8AbABvAHIAaQBMAEMARAAgAGMAbwBsAG8AcgBLAGwAZQB1AHIAZQBuAC0ATABDAEQgDwBMAEMARAAgBeYF0QXiBdUF4AXZAFYA5AByAGkALQBMAEMARF9pgnIAIABMAEMARABMAEMARAAgAE0A4AB1AEYAYQByAGUAYgBuAOkAIABMAEMARAQmBDIENQRCBD0EPgQ5ACAEFgQaAC0ENAQ4BEEEPwQ7BDUEOQBMAEMARAAgAGMAbwB1AGwAZQB1AHIAVwBhAHIAbgBhACAATABDAEQATABDAEQAIABlAG4AIABjAG8AbABvAHIATABDAEQAIA4qDjUARgBhAHIAYgAtAEwAQwBEAEMAbwBsAG8AcgAgAEwAQwBEAEwAQwBEACAAQwBvAGwAbwByAGkAZABvAEsAbwBsAG8AcgAgAEwAQwBEA4gDswPHA8EDyQO8A7cAIAO/A7gDzAO9A7cAIABMAEMARABGAOQAcgBnAC0ATABDAEQAUgBlAG4AawBsAGkAIABMAEMARDCrMOkw/AAgAEwAQwBEAEwAQwBEACAAYQAgAEMAbwByAGUAcwAAdGV4dAAAAABDb3B5cmlnaHQgQXBwbGUgSW5jLiwgMjAxNgAAWFlaIAAAAAAAAPMWAAEAAAABFspYWVogAAAAAAAAccAAADmKAAABZ1hZWiAAAAAAAABhIwAAueYAABP2WFlaIAAAAAAAACPyAAAMkAAAvdBjdXJ2AAAAAAAABAAAAAAFAAoADwAUABkAHgAjACgALQAyADYAOwBAAEUASgBPAFQAWQBeAGMAaABtAHIAdwB8AIEAhgCLAJAAlQCaAJ8AowCoAK0AsgC3ALwAwQDGAMsA0ADVANsA4ADlAOsA8AD2APsBAQEHAQ0BEwEZAR8BJQErATIBOAE+AUUBTAFSAVkBYAFnAW4BdQF8AYMBiwGSAZoBoQGpAbEBuQHBAckB0QHZAeEB6QHyAfoCAwIMAhQCHQImAi8COAJBAksCVAJdAmcCcQJ6AoQCjgKYAqICrAK2AsECywLVAuAC6wL1AwADCwMWAyEDLQM4A0MDTwNaA2YDcgN+A4oDlgOiA64DugPHA9MD4APsA/kEBgQTBCAELQQ7BEgEVQRjBHEEfgSMBJoEqAS2BMQE0wThBPAE/gUNBRwFKwU6BUkF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';
    doc.addImage(imgData, 'JPEG', 150, 10, 50, 50);
     doc.setFontSize(22);
     doc.text(30, 20, 'AdamGoodPlanner Triplist.');
     doc.setFontSize(15);
     rowCounterPdf = rowCounterPdf + 30;
     rowCounterPdf = rowCounterPdf + 60;
     doc.setFontSize(10);
     doc.text(60, 280, 'Group 3 - IBM Watson Innovation Course - VU-Amsterdam');
for (i = 0; i < data.length; i++) { 
    doc.setFontSize(12);
    doc.text(20, rowCounterPdf, (i+1)+'.');
    rowCounterPdf = rowCounterPdf + 4;
    doc.setFontSize(10);
    doc.text(100, rowCounterPdf, data[i].name);
    rowCounterPdf = rowCounterPdf + 7;
    doc.text(100, rowCounterPdf, 'Adress: '+data[i].location);
    rowCounterPdf = rowCounterPdf + 7;
    doc.text(100, rowCounterPdf, 'Phone: '+data[i].phone);
    rowCounterPdf = rowCounterPdf + 10;
}
doc.save('Test.pdf');
location.reload();
}


function AddImage(number){
    getBase64FromImageUrl(data[number-1].photo, function (data) {
    doc.addImage(data,'JPEG',40,(((processedPictures)*28)+90),20,20);
    processedPictures++;
  });
}



function getBase64FromImageUrl(url,callback) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        callback(canvas.toDataURL("image/jpeg"));     
    };

    img.src = url;

}

         function loadData(){
        document.getElementById('schedule').innerHTML = "<a href=\"#\" id=  \"schedule\"> Schedule for today <span class=\"badge\">"+data.length+"</span></a>";
        if(data.length > 1) {
        $('#nothing').hide();
        $('#TimeLine').show(); 
        window.location.hash = "#TimeLine";
        }
        else {
          $('#nothing').show();
          $('#TimeLine').hide();
        }

      }

      function RefreshData(){
        
        $('#nothing').hide();
        $('#TimeLine').hide(); 
        document.getElementById('Name_Location_1').innerHTML = result[0].name;
        document.getElementById('Category_Location_1').innerHTML = result[0].category;
        document.getElementById('Sort_Location_1').innerHTML = result[0].location;
        document.getElementById('Phone_Location_1').innerHTML = result[0].phone;
        document.getElementById('Photo_Location_1').src = result[0].photo;
        document.getElementById('Congestion_Location_1').innerHTML = "CrowdLevel: "+result[0].congestion;

        document.getElementById('Name_Location_2').innerHTML = result[1].name;
        document.getElementById('Category_Location_2').innerHTML = result[1].category;
        document.getElementById('Sort_Location_2').innerHTML = result[1].location;
        document.getElementById('Phone_Location_2').innerHTML = result[1].phone;
        document.getElementById('Photo_Location_2').src = result[1].photo;
        document.getElementById('Congestion_Location_2').innerHTML = "CrowdLevel: "+result[1].congestion;

        document.getElementById('Name_Location_3').innerHTML = result[2].name;
        document.getElementById('Category_Location_3').innerHTML = result[2].category;
        document.getElementById('Sort_Location_3').innerHTML = result[2].location;
        document.getElementById('Phone_Location_3').innerHTML = result[2].phone;
        document.getElementById('Photo_Location_4').src = result[2].photo;
        document.getElementById('Congestion_Location_3').innerHTML = "CrowdLevel: "+result[2].congestion;

        document.getElementById('Name_Location_4').innerHTML = result[3].name;
        document.getElementById('Category_Location_4').innerHTML = result[3].category;
        document.getElementById('Sort_Location_4').innerHTML = result[3].location;
        document.getElementById('Phone_Location_4').innerHTML = result[3].phone;
        document.getElementById('Photo_Location_4').src = result[3].photo;
        document.getElementById('Congestion_Location_4').innerHTML = "CrowdLevel: "+result[3].congestion;

        document.getElementById('Name_Location_5').innerHTML = result[4].name;
        document.getElementById('Category_Location_5').innerHTML = result[4].category;
        document.getElementById('Sort_Location_5').innerHTML = result[4].location;
        document.getElementById('Phone_Location_5').innerHTML = result[4].phone;
        document.getElementById('Photo_Location_5').src = result[4].photo;
        document.getElementById('Congestion_Location_5').innerHTML = "CrowdLevel: "+result[4].congestion;
        $('#Recommendations').show(); 
        window.location.hash = "#Recommendations"; 
      }

    
    function AddLocation(location){
      if(data.length == 4) {
        alert("You have to maximum of locations in your planning for one day.");
        } 
          else {  
        if (confirm("Do you wanna add " +location.name+ " to your timeline?") == true) {
        data[data.length] = location;
        SavePad();
        MakeTimeLineElement(location,data.length);
        sortRowTimeLine(); 
        } 
      }
    }

    function RemoveLocation(elementNumber){
      processedPictures = 0;
       $(("#TimeLine_"+data.length)).hide(); 
        data.splice(elementNumber,1);
        SavePad();
        sortRowTimeLine();
    }      



function MakeTimeLineElement(location,nr) {
        document.getElementById(('Timeline_Name_Location_'+nr)).innerHTML = "<h4>"+location.name + "</h4>";
        document.getElementById(('Timeline_Category_Location_'+nr)).innerHTML = "<p><small class=\"text-muted\"><i class=\"glyphicon glyphicon-bookmark\" id=\"Timeline_Category_Location_1\">   "+location.category+"</i> </small></p>";
        document.getElementById(('Timeline_Sort_Location_'+nr)).innerHTML = "Location: "+location.location;
        document.getElementById(('Timeline_Photo_Location_'+nr)).src = location.photo;
        document.getElementById(('Timeline_Sort_Phone_'+nr)).innerHTML = location.phone;
        document.getElementById(('Timeline_Sort_Distance_'+nr)).innerHTML = "Distance: "+location.distance+" m";
        SavePad();
        $(("#TimeLine_"+nr)).show();   
        document.getElementById('schedule').innerHTML = "<a href=\"#\" id=  \"schedule\"> Schedule for today <span class=\"badge\">"+data.length+"</span></a>";
         
}

function CloseRecommendations() {
  location.reload();
  

}

function SavePad() {
  $.super_cookie({expires: 7,path: "/"}).create("data",data);
  $.super_cookie({expires: 7,path: "/"}).create("timeline",timeline);
  $.super_cookie({expires: 7,path: "/"}).create("processedPictures",processedPictures);


}

function RefillTimeLine() {
  for (i = 0; i < data.length; i++) { 
        MakeTimeLineElement(data[i],i+1);
        }
        $('#TimeLine').show();
      }

function RemakePictures(){
  processedPictures = 0;
  doc = new jsPDF();
  for (i = 0; i < data.length; i++) { 
  AddImage(i+1);
}
}


function predictDistance(input) {
var placesDistance;
placesDistance="["
placesDistance= placesDistance+"{\"id\": \""+data[0].id+"\"},"; 
for (i = 0; i < 5; i++) { 
  placesDistance= placesDistance+"{\"id\": \""+input[i].id+"\"},"; 
}
placesDistance = placesDistance.substring(0, placesDistance.length-1);
placesDistance = placesDistance+"]";
 var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
}

getJSON('http://127.0.0.1:5000/plan?places='+placesDistance).then(function(data) {
distance = data;
document.getElementById('Distance_Location_1').innerHTML = "Distance:" +(distance[1].distance)+" m";
document.getElementById('Distance_Location_2').innerHTML = "Distance: "+(distance[2].distance)+" m";
document.getElementById('Distance_Location_3').innerHTML = "Distance: "+(distance[3].distance)+" m";
document.getElementById('Distance_Location_4').innerHTML = "Distance: "+(distance[4].distance)+" m";
document.getElementById('Distance_Location_5').innerHTML = "Distance: "+(distance[5].distance)+" m";
for (i = 0; i < 5; i++) { 
  result[i].distance = distance[i+1].distance;
}
sortRowRecommendation();

}, function(status) { //error detection....
  alert('We cannot make a estimation on the moment');
});


}

var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}



function sortRowRecommendation(number){
    sortHandlerRecommendation(function () {
    $('#myPleaseWait').modal('hide');  
    RefreshData();
  });
}

function sortHandlerRecommendation(callback) {

result.sort(sort_by('distance', false, parseInt));
        callback();     
    }


function sortRowTimeLine(number){
    sortHandlerTimeLine(function () { 
    SavePad(); 
    location.reload();
  });
}

function sortHandlerTimeLine(callback) {
data.sort(sort_by('distance', false, parseInt));
        callback();     
    }















function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '19vbsZy5JiKqdgTIVu5C10gmr6sgr4RCx-JSpwLqe38I',  // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'Assumptions',  // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
   // valueRenderOption: '',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    //dateTimeRenderOption: '',  // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  var x, txt = '';
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result.values);
    txt += "<table border='1'>"
    
    // for (x in myObj) {
    //     txt += "<tr><td>" + myObj[x].name + "</td></tr>";
    // }
    var values = response.result.values;
    var len = response.result.values.length;
    values.forEach(function(value) {
      console.log(value);
    });
    /*for(x in values){
      txt += "<tr><td>" + values[x] + "</td></tr>";
    }
    txt += "</table>"*/
   /* var html = "<table border='1|1'>";
for (var i = 0; i < rows.length; i++) {
    html+="<tr>";
    html+="<td>"+rows[i].name+"</td>";
    html+="<td>"+rows[i].age+"</td>";
    html+="<td>"+rows[i].email+"</td>";

    html+="</tr>";

}
html+="</table>";*/
    for(var row=0; row<values.length; row++){
      txt += "<tr><td>"
      for(var col=0; col<values[row].length; col++){
        if (row === 0){
          txt += "<tr><th>" + values[row][col] + "</th></tr>";
        }
        else{
          txt += "<tr><td>" + values[row][col] + "</td></tr>";
        }
        
      }
      txt +="</td></tr>"
    }        
    document.getElementById("results").innerHTML = txt;
    console.log(txt);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
  var API_KEY = 'AIzaSyDBchx0H7PB7myN9O3xPSo9FEr3_i1zSg4';  // TODO: Update placeholder with desired API key.

  var CLIENT_ID = '714862903372-63o5d1e7i1oke2hu4dr05qv6gv33ebcj.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}   
makeApiCall();
/*function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
makeApiCall();
}*/
}
function handleSignInClick(event) {
gapi.auth2.getAuthInstance().signIn();
}
function handleSignOutClick(event) {
gapi.auth2.getAuthInstance().signOut();
}
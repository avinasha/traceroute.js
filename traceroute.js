var traceroute = function(adr) {
  var order = ['activex', 'java'];
  for (var i = 0, _len = order.length; i < _len; i++) {
    backend = order[i];
    if (traceroute[backend].test)
      return traceroute[backend].trace(adr);
  }
};
traceroute.activex = {
  test: 'ActiveXObject' in window,
  trace: function(adr) {
    return new ActiveXObject('WScript.Shell').Exec("%comspec% /c tracert.exe " + adr);
  }
};
traceroute.java = {
  test: navigator.javaEnabled,
  trace: function(adr) {
    var ex, ln, pr, rd, result;
    ex = /windows/.test(java.lang.System.getProperty('os.name').toLowerCase()) ? '%comspec% /c tracert.exe' : 'traceroute';
    pr = java.lang.Runtime.getRuntime().exec(ex + ' ' + adr);
    rd = new java.io.BufferedReader(new java.io.InputStreamReader(pr.getInputStream()));
    pr.waitFor();
    result = '';
    while ((ln = rd.readLine()) !== null) {
      result += ln + '\n';
    }
    return result;
  }
};

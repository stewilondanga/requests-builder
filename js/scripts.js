var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();

// helper function from MDN
var parseHeaders = function parseHeaders(xhr) {
  var headers = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
  var headerMap = {};
  headers.forEach(function(line) {
    var parts = line.split(': ');
    var header = parts.shift().toLowerCase();
    var value = parts.join(': ');
    headerMap[header] = value;
  });
  return headerMap;
};

/*var app = new Vue({
  el: '#app',
  data: {
    method: 'GET',
    url: 'https://yesno.wtf',
    auth: 'none',
    path: '/api',
    httpUser: '',
    httpPassword: '',
    params: [],
    bodyParams: [],
    contentType: 'application/json',
    response: {
      status: '',
      headers: '',
      body: "" } },


  computed: {
    rawRequestBody: function rawRequestBody() {var
      bodyParams = this.bodyParams;
      if (this.contentType === 'application/json') {
        try {
          var obj = JSON.parse('{\n            ' +
          bodyParams.
          filter(function (p) {return !!p.key;}).
          map(function (p) {return '"' + p.key + '": "' + p.value + '"';}).join() + '\n          }');

          return JSON.stringify(obj);
        } catch (ex) {
          return "invalid";
        }
      } else {
        return bodyParams.
        filter(function (p) {return !!p.key;}).
        map(function (p) {return p.key + '=' + encodeURIComponent(p.value);}).join('&');
      }
    },
    queryString: function queryString() {
      var result = this.params.
      filter(function (p) {return !!p.key;}).
      map(function (p) {return p.key + '=' + encodeURIComponent(p.value);}).join('&');
      return result == '' ? '' : '?' + result;
    } },

  methods: {
    sendRequest: function sendRequest() {var _this = this;
      var xhr = new XMLHttpRequest();
      var user = this.auth === 'Basic' ? this.httpUser : null;
      var pswd = this.auth === 'Basic' ? this.httpPassword : null;
      xhr.open(this.method, this.url + this.path + this.queryString, true, user, pswd);
      if (this.method === "POST" || this.method === "PUT") {
        var requestBody = this.rawRequestBody;
        xhr.setRequestHeader('Content-Length', requestBody.length);
        xhr.setRequestHeader('Content-Type', this.contentType + '; charset=utf-8');
        xhr.send(requestBody);
      } else {
        xhr.send();
      }
      xhr.onload = function (e) {
        _this.response.status = xhr.status;
        var headers = _this.response.headers = parseHeaders(xhr);
        if ((headers["content-type"] || "").startsWith("application/json")) {
          _this.response.body = JSON.stringify(JSON.parse(xhr.responseText), null, 2);
        } else {
          _this.response.body = xhr.responseText;
        }
      };
    },
    addRequestParam: function addRequestParam() {
      this.params.push({ key: '', value: '' });
      return false;
    },
    removeRequestParam: function removeRequestParam(index) {
      this.params.splice(index, 1);
    },
    addRequestBodyParam: function addRequestBodyParam() {
      this.bodyParams.push({ key: '', value: '' });
      return false;
    },
    removeRequestBodyParam: function removeRequestBodyParam(index) {
      this.bodyParams.splice(index, 1);
    } } });

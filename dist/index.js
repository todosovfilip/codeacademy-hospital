'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _expressUnless = require('express-unless');

var _expressUnless2 = _interopRequireDefault(_expressUnless);

var _index = require('./indexRouter/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
const port = process.env.PORT || 3702;

app.use((0, _morgan2.default)('dev'));
app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());
app.use(_bodyParser2.default.urlencoded({
    extended: false
}));
app.use(_bodyParser2.default.json());

app.use(_index2.default);

app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
});
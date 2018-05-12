var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WikiViewer = function (_React$Component) {
  _inherits(WikiViewer, _React$Component);

  function WikiViewer(props) {
    _classCallCheck(this, WikiViewer);

    return _possibleConstructorReturn(this, (WikiViewer.__proto__ || Object.getPrototypeOf(WikiViewer)).call(this, props));
  }

  _createClass(WikiViewer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: "https://en.wikipedia.org/wiki/Special:Random", target: "_blank" },
          "Click Here for a Random Article"
        ),
        React.createElement(SearchBar, null)
      );
    }
  }]);

  return WikiViewer;
}(React.Component);

var SearchBar = function (_React$Component2) {
  _inherits(SearchBar, _React$Component2);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    //m
    var _this2 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this2.styleclass = { active: 'active' };

    _this2.state = { formValue: '',
      currentClasses: '',
      articleData: '' };
    _this2.handleChange = _this2.handleChange.bind(_this2);
    _this2.handleClick = _this2.handleClick.bind(_this2);
    _this2.handleQuery = _this2.handleQuery.bind(_this2);
    return _this2;
  }

  _createClass(SearchBar, [{
    key: "handleClick",
    value: function handleClick(e) {
      // console.log(this.styleclass.active);  
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      //set state to form value
      this.setState({ formValue: e.target.value });
    }
  }, {
    key: "handleQuery",
    value: function handleQuery(e) {
      //on Submit, query wikipedia entry
      e.preventDefault();
      this.queryWikipedia(this.state.formValue);
      this.setState({ formValue: '' });
    }
  }, {
    key: "queryWikipedia",
    value: function queryWikipedia(keyword) {
      //replace keyword spaces with + symbols
      keyword = keyword.replace(/ /g, '+');

      $.ajax({
        context: this,
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&srsearch=' + keyword,
        dataType: 'jsonp',
        success: function success(response) {
          this.setState({ articleData: response.query.search });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { onSubmit: this.handleQuery },
          React.createElement("input", { onClick: this.handleClick, onChange: this.handleChange, type: "text", placeholder: "Search...", value: this.state.formValue })
        ),
        React.createElement(ArticleList, { articleData: this.state.articleData })
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var ArticleList = function (_React$Component3) {
  _inherits(ArticleList, _React$Component3);

  function ArticleList(props) {
    _classCallCheck(this, ArticleList);

    var _this3 = _possibleConstructorReturn(this, (ArticleList.__proto__ || Object.getPrototypeOf(ArticleList)).call(this, props));

    _this3.state = {
      listItems: ''
    };
    return _this3;
  }

  _createClass(ArticleList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.articleData) {

        var items = nextProps.articleData.map(function (article) {
          return React.createElement(
            "li",
            { key: article.title },
            React.createElement(
              "h2",
              null,
              article.title
            ),
            React.createElement(
              "p",
              null,
              article.snippet
            )
          );
        });

        this.setState({ listItems: items });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        null,
        this.state.listItems
      );
    }
  }]);

  return ArticleList;
}(React.Component);

ReactDOM.render(React.createElement(WikiViewer, null), document.getElementById('container'));
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, bitches! I am a CommentBox.
      </div>
    );
  }
});


// tutorial2.js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, bitches! I am a a CommentList
      </div>
      );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="CommentForm">
        Hello, bitches! I am a CommentForm.
      </div>
      );
  }
});

// tutorial3.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
      );
  }
});

// tutorial4.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className = "comment">
      <h2 className = "commentAuthor">
        {this.props.author}
      </h2>
        {this.props.children}
      </div>
      );
  }
});

//tutorial5.js
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
        );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
      );
      }
    });


// tutorial6.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className= "comment">
        <h2 className= "commentAuthor">
          {this.props.author}
        </h2>
          {marked(this.props.children.toString())}
      </div>
      );
  }
});

// tutorial7.js
var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
      );
  }
})

// tutorial8.js
var data = [
  {id: 1, author: "Portia Burton", text: "Say, hello to the party people"},
  {id: 2, author: "Connie Yip", text: "Hello party people!"}
]
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);

      // // tutorial4.js
      // var Comment = React.createClass({
      //   render: function() {
      //     return (
      //       <div className="comment">
      //         <h2 className="commentAuthor">
      //           {this.props.author}
      //         </h2>
      //           {marked(this.props.children.toString())}
      //       </div>
      //       );
      //   }
      // });
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./NewsDetails.css";

class NewsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.location.currentCard);
    // console.log(this.props.location.Published);
    if (this.props.location.currentCard === undefined) {
      return <Redirect to="/" />;
    }
    const {
      currentCard,
      NewsLists,
      Published,
      ErrorStatus
    } = this.props.location;
    return (
      <div>
        <div className="img-overlay">
          {ErrorStatus[currentCard] === "true" ? (
            <img
              className="img-fluid"
              src={require("../../Images/default-png-5.png")}
              alt="News card"
            />
          ) : (
            <img
              className="img-fluid"
              src={
                NewsLists[currentCard].urlToImage === null
                  ? require("../../Images/default-png-5.png")
                  : NewsLists[currentCard].urlToImage
              }
              alt="News card"
            />
          )}

          <div className="project-overlay">
            <div className="container ff">
              <a href="/" className="previous round pull-left">
                &#8249;
              </a>
              <div class="clearfix"></div>
              <div className="row justify-content-center align-items-center h-100 card-content">
                <div className="col-md-12">
                  <h4 className="news-title">{NewsLists[currentCard].title}</h4>
                  <p className="test">- {NewsLists[currentCard].author}</p>
                  <p className="test">Published At: {Published}</p>
                  <a href={NewsLists[currentCard].url}>
                    {NewsLists[currentCard].source.name}
                  </a>
                  <h5 className="desc">Description</h5>
                  <p>{NewsLists[currentCard].description}</p>
                  <h5 className="">Content</h5>
                  <p>{NewsLists[currentCard].content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsDetails;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./NewsList.css";

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NewsLists: [],
      copyLists: [],
      val: "",
      value: "all",
      status: false,
      currentCard: "",
      errored: []
    };
  }

  onSearch = event => {
    if (event.target.value !== "") {
      if (this.state.value === "author") {
        let updated = this.state.NewsLists.filter(c => {
          if (c.author !== null) {
            return (
              c.author
                .toLowerCase()
                .search(event.target.value.toLowerCase()) !== -1
            );
          }
        });
        if (updated.length > 0) {
          this.setState({
            val: event.target.value,
            NewsLists: updated,
            status: false
          });
        } else {
          this.setState({ status: true });
        }
      } else if (this.state.value === "site") {
        let updatedSiteList = this.state.NewsLists.filter(c => {
          const site = c.source.name;
          return (
            site.toLowerCase().search(event.target.value.toLowerCase()) !== -1
          );
        });
        if (updatedSiteList.length > 0) {
          this.setState({
            val: event.target.value,
            NewsLists: updatedSiteList,
            status: false
          });
        } else {
          this.setState({ status: true });
        }
      } else if (this.state.value === "publish date") {
        let updatedPublished_list = this.state.NewsLists.filter(c => {
          const date = this.convertDate(c.publishedAt);
          return date.search(event.target.value) !== -1;
        });

        if (updatedPublished_list.length > 0) {
          this.setState({
            val: event.target.value,
            NewsLists: updatedPublished_list,
            status: false
          });
        } else {
          this.setState({ status: true });
        }
      } else if (this.state.value === "all") {
        let updated = this.state.NewsLists.filter(c => {
          if (c.author !== null) {
            return (
              c.author
                .toLowerCase()
                .search(event.target.value.toLowerCase()) !== -1
            );
          }
        });
        let updatedSiteList = this.state.NewsLists.filter(c => {
          const site = c.source.name;
          return (
            site.toLowerCase().search(event.target.value.toLowerCase()) !== -1
          );
        });
        let updatedPublished_list = this.state.NewsLists.filter(c => {
          const date = this.convertDate(c.publishedAt);
          return date.search(event.target.value) !== -1;
        });

        let NewLists = updated.concat(updatedSiteList);
        NewLists = NewLists.concat(updatedPublished_list);
        let unique_array = Array.from(new Set(NewLists));
        if (
          updated.length > 0 ||
          updatedSiteList.length > 0 ||
          updatedPublished_list.length > 0
        ) {
          this.setState({
            val: event.target.value,
            NewsLists: unique_array,
            status: false
          });
        } else {
          this.setState({ status: true });
        }
      }
    } else {
      const main1 = document.getElementById("main-news-div");

      main1.classList.remove("add-ht");
      this.setState({ NewsLists: this.state.copyLists, status: false });
    }
  };

  convertDate = date => {
    const check = date.split("T");
    const ff = check[0].split("-");
    const year = ff[0];
    const month = ff[1];
    const day = ff[2];
    const newDate = day + "/" + month + "/" + year;
    return newDate;
  };

  change = event => {
    this.setState({ value: event.target.value });
  };

  onCardDetails = key => {
    this.setState({ currentCard: key });
  };
  checkUrl = key => {
    this.setState({ errored: { [key]: "true" } });
  };

  componentDidMount() {
    fetch("http://www.mocky.io/v2/5d8686a032000024b607b40e")
      .then(res => res.json())
      .then(response => {
        this.setState({
          NewsLists: response.articles,
          copyLists: response.articles
        });
      });
  }

  render() {
    if (this.state.status) {
      const main = document.getElementById("main-news-div");
      main.classList.add("add-ht");
    }

    if (this.state.currentCard !== "") {
      const main = document.getElementById("sub-app");
      main.style.paddingBottom = "0px";
      return (
        <Redirect
          to={{
            pathname: "/details",
            currentCard: this.state.currentCard,
            NewsLists: this.state.NewsLists,
            ErrorStatus: this.state.errored,
            Published: this.convertDate(
              this.state.NewsLists[this.state.currentCard].publishedAt
            )
          }}
        />
      );
    }

    const { NewsLists } = this.state;
    return (
      <div className="container pt-5" id="main-news-div">
        <div className="row">
          <div className="top-bar">
            <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 col-md-8">
              <div className="input-group">
                <div className="input-group-prepend">
                  <button
                    id="button-addon2"
                    type="submit"
                    className="btn btn-link text-warning"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  aria-describedby="button-addon2"
                  className="form-control border-0 bg-light"
                  onChange={event => this.onSearch(event)}
                />
              </div>
            </div>
            <div className="input-group-btn search-panel col-md-3">
              <select
                name="search_param"
                id="search_param"
                className="btn btn-default dropdown-toggle bg-light rounded rounded-pill shadow-sm mb-4"
                data-toggle="dropdown"
                onChange={e => this.change(e)}
                value={this.state.value}
              >
                <option value="all">All</option>
                <option value="publish date">Publish date</option>
                <option value="author">Author</option>
                <option value="site">Site</option>
              </select>
            </div>
          </div>

          <div className="container">
            <div className="row">
              {this.state.status ? (
                <div className="norecords margin-auto">No Records Found!!</div>
              ) : (
                NewsLists.map((list, key) => (
                  <div
                    key={key}
                    className="col-xs-12 col-sm-6 col-md-4 col-lg-3 list-card"
                  >
                    <div
                      className="card"
                      onClick={() => this.onCardDetails(key)}
                    >
                      {this.state.errored[key] === "true" ? (
                        <img
                          className="card-img-top"
                          src={require("../../Images/default-png-5.png")}
                          onError={() => this.checkUrl(key)}
                          alt="Card cap"
                        />
                      ) : (
                        <img
                          className="card-img-top"
                          src={
                            list.urlToImage === null
                              ? require("../../Images/default-png-5.png")
                              : list.urlToImage
                          }
                          onError={() => this.checkUrl(key)}
                          alt="Card cap"
                        />
                      )}
                      <div className="card-block">
                        <p className="wheat">
                          {this.convertDate(list.publishedAt)}
                        </p>
                        <h6 className="card-title">{list.title}</h6>
                        <p className="wheat author pb-2">{list.author}</p>
                        <p className="card-text">{list.description}</p>
                        <a className="text-left" href={list.url}>
                          {list.source.name}
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsList;

import React, { Component } from 'react';
import './news.css';
import ReactHtmlParser from 'react-html-parser';

class NewsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            news: []
        };
    }

    componentDidMount() {
        fetch("/data/news.json")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    news: result.news
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, news } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            <ul className="news">
                {news.map((item, index) => (
                <li className="news__item" key={index}>
                    {ReactHtmlParser(item.body)}
                </li>
                ))}
            </ul>
            );
        }
    }
}

export default NewsSection;

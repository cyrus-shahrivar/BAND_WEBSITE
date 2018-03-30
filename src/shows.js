import React, { Component } from 'react';
import './shows.css';
import ReactHtmlParser from 'react-html-parser';

class ShowsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            shows: []
        };
    }

    componentDidMount() {
        fetch("/data/shows.json")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    shows: result.shows
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
        const { error, isLoaded, shows } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            <ul className="shows">
                {shows.map((item, index) => (
                <li className="show" key={index}>
                    <div className="show__title">{item.date}</div>
                    <a className="show__eventLink" href={item.eventWebsite}>{item.event}</a>
                    <div className="show__venue">
                        <div className="show__venue-name">{item.venue.name}</div>
                        <span className="show__address">{item.venue.address}, </span><span className="show__phone">{item.venue.phone}</span>
                        <a className="show__venue-website" href={item.venue.website}>{item.venue.website}</a>
                    </div>
                    {ReactHtmlParser(item.details)}
                </li>
                ))}
            </ul>
            );
        }
    }
}

export default ShowsSection;

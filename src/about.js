import React, { Component } from 'react';
import './about.css';

class AboutSection extends Component {
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          bandMembers: []
      };
  }

  componentDidMount() {
    fetch("/data/about.json")
      .then(res => res.json())
      .then(
      (result) => {
          this.setState({
              isLoaded: true,
              bandMembers: result.bandMembers
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
      const { error, isLoaded, bandMembers } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          return (
          <ul className="about">
              {bandMembers.map((item, index) => (
              <li className="about__member" key={item.bandName + index}>
                  <div className="about__title">{item.bandName}</div>
                  <div className="about__real-name">{item.realName}</div>
                  <div className="about__role">{item.role}</div>
                  <div className="about__description">
                      {item.description.map((para, index) => (
                          <p key={"para" + index}>{para}</p>
                      ))}
                      <img className="about__image" src={item.image} alt=""/>
                  </div>
              </li>
              ))}
          </ul>
          );
      }
  }
}

export default AboutSection;

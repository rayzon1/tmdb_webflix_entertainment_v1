import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../modules/component-modules/carousel-comp.module.css";
import $ from 'jquery';

export default function CarouselHead({ mediaNews }) {

  const shortenText = string => {
    const maxLength = 60;
    const newStr = string != null && string.substr(0, maxLength) + "...";
    return newStr;
  };

  return (
    <div
      className={styles.root}
    >
      <Carousel className={styles.container}>
        {mediaNews &&
          mediaNews.articles.map(data => (
            <Carousel.Item fade={true}>
              <img
                src={data.urlToImage}
                alt="First slide"
                className={styles.images}
              />
              <Carousel.Caption>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    textShadow: "rgb(0, 0, 0) 2px 2px 4px"
                  }}
                >
                  <h3 className={styles.title}>{$(window).width() > 1300 ? data.title : shortenText(data.title)}</h3>
                </a>
                <p className={styles.description}>{shortenText(data.description)}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

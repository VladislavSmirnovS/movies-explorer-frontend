import "./AboutMe.css";

import imageStudent from "../../images/student.png";

function AboutMe() {
  return (
    <section id="about-me" className="about-me page__section">
      <h2 className="about-me__title content__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__block">
          <h3 className="about-me__info-name">Владислав</h3>
          <p className="about-me__info-title">Фронтенд-разработчик, 29 лет</p>
          <p className="about-me__description">
            Я живу в Санкт-Петербурге, закончил факультет экспертизы недвижимости СПбГАСУ. 
            У меня есть жена и сын. Я люблю активные виды спорта, а еще увлекаюсь музыкой.
            Год назад начал кодить. С 2016г года работал в компании "ГОРЭЛТЕХ" на должности менеджер
            проектов. После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>

          <ul className="about-me__links">
            <li className="about-me__link-item">
              <a
                href="https://www.linkedin.com/in/vladislav-smirnov-2a967a226/"
                target="_blank"
                rel="noreferrer"
                className="about-me__link"
              >
                LinkedIn
              </a>
            </li>
            <li className="about-me__link-item">
              <a
                href="https://github.com/VladislavSmirnovS"
                target="_blank"
                rel="noreferrer"
                className="about-me__link"
              >
                Github
              </a>
            </li>
            <li className="about-me__link-item">
              <a
                href="https://t.me/VladislavSmirnovS"
                target="_blank"
                rel="noreferrer"
                className="about-me__link"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__image"
          alt="Фотография струдента"
          src={imageStudent}
        />
      </div>
    </section>
  );
}

export default AboutMe;

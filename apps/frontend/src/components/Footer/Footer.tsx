import Logo from '@/assets/svgs/LogoIcon'
import Telegram from '@/assets/svgs/TelegramIcon'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {window.innerWidth > 777 ? (
          <div className="footer__main">
            <div className="footer__column">
              <Logo />
            </div>
            <div className="footer__column">
              <div className="footer__header">Меню</div>
            </div>
            <div className="footer__column">
              <div className="footer__header">Техподдержка</div>
            </div>
            <div className="footer__column">
              <div className="footer__header">Мы в соцсетях</div>
            </div>
            <div className="footer__column">
              <div className="footer__text text__light">
                ©2024 «Благополучие»
              </div>
              <div className="footer__text text__light">Все права защищены</div>
              <div className="footer__text">
                <a
                  rel="noreferrer"
                  href="https://telegra.ph/Politika-v-otnoshenii-obrabotki-personalnyh-dannyh-12-09-3"
                  target="_blank"
                  className="underline"
                >
                  Политика конфиденциальности
                </a>
              </div>
            </div>
            <div className="footer__column">
              <div className="footer__text">
                <a
                  rel="noreferrer"
                  href="https://telegra.ph/Novogodnij-ehkspress-Blagopoluchiya-soberi-vagon-podarkov-12-11"
                  target="_blank"
                >
                  Правила игры
                </a>
              </div>
            </div>
            <div className="footer__column">
              <div className="footer__text">
                <a
                  href="https://t.me/snegurochkablago"
                  rel="noreferrer"
                  target="_blank"
                >
                  Снегурочка на связи
                </a>
              </div>
            </div>
            <div className="footer__column">
              <div className="footer__icon">
                <a
                  href="https://t.me/+QnoomH1zp9k0OGUy"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Telegram />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="footer__main">
            <div className="footer__row">
              <Logo />
            </div>

            <div className="footer__row">
              <div className="footer__icon">
                <a
                  href="https://t.me/+QnoomH1zp9k0OGUy"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Telegram />
                </a>
              </div>
            </div>

            <div className="footer__row">
              <div className="footer__column">
                <div className="footer__text text__light">
                  ©2024 «Благополучие»
                </div>
                <div className="footer__text text__light">
                  Все права защищены
                </div>
                <div className="footer__text">
                  <a
                    rel="noreferrer"
                    href="https://telegra.ph/Politika-v-otnoshenii-obrabotki-personalnyh-dannyh-12-09-3"
                    target="_blank"
                    className="underline"
                  >
                    Политика конфиденциальности
                  </a>
                </div>
              </div>
            </div>

            <div className="footer__row">
              <div className="footer__columns">
                <div className="footer__column">
                  <div className="footer__header">Меню</div>
                  <div className="footer__text">
                    <a
                      rel="noreferrer"
                      href="https://telegra.ph/Novogodnij-ehkspress-Blagopoluchiya-soberi-vagon-podarkov-12-11"
                      target="_blank"
                    >
                      Правила игры
                    </a>
                  </div>
                </div>

                <div className="footer__column">
                  <div className="footer__header">Техподдержка</div>
                  <div className="footer__text">
                    <a
                      href="https://t.me/snegurochkablago"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Снегурочка на связи
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}

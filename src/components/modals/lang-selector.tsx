import React, { Component } from "react";
import i18n from "../../services/i18n";
import { withTranslation, WithTranslation } from "react-i18next";
import {
  setLanguage,
  setAutoLanguage,
  getAutoLanguage,
  getLanguage,
} from "../../services/language";

interface IState {
  language: string;
}

class LangSelector extends Component<WithTranslation, IState> {
  constructor(props: WithTranslation) {
    super(props);
    if (getAutoLanguage()) {
      this.state = {
        language: "Auto",
      };
    } else {
      switch (getLanguage()) {
        case "en":
          this.state = {
            language: "English",
          };
          break;
        case "pt":
          this.state = {
            language: "Portugues",
          };
          break;
        case "en-US":
          this.state = {
            language: "English",
          };
          break;
        case "pt-BR":
          this.state = {
            language: "Portugues",
          };
          break;
        default:
          this.state = {
            language: "Auto",
          };
          break;
      }
    }
  }

  changeLanguage = (e: string) => {
    var autoLanguage = false;
    var language = "en";
    switch (e) {
      case "Auto":
        autoLanguage = true;
        language = "en";
        break;
      case "English":
        autoLanguage = false;
        language = "en";
        break;
      case "Portugues":
        autoLanguage = false;
        language = "pt";
        break;
      default:
        autoLanguage = false;
        language = "en";
        break;
    }
    setAutoLanguage(autoLanguage);
    setLanguage(language);
    i18n.changeLanguage(getLanguage());
    this.setState({
      language: e,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal fade"
        id="languageModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="languageModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="languageModal">
                {t("modals.changeLanguage")}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle btn-outline-primary"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.language}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      this.changeLanguage("Auto");
                    }}
                  >
                    Auto
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      this.changeLanguage("English");
                    }}
                  >
                    English
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      this.changeLanguage("Portugues");
                    }}
                  >
                    Portugues
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {t("modals.close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(LangSelector);

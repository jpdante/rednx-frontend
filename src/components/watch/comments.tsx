/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Video } from "../../model";

import styles from "./watch.module.scss";
import TextareaAutosize from "react-autosize-textarea";
import { withTranslation } from "react-i18next";
import api from "../../api";
import { StoreProps } from "../../undux";
import Store from "../../undux";

interface IProps extends StoreProps {
  video: Video | null;
}

interface IState {
  video: Video | null;
  tempComment: string;
  comments: any[];
}

class Description extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      video: null,
      tempComment: "",
      comments: [],
    };
  }

  async sendComment(e: any) {
    e.preventDefault();
    if (!this.props.auth.get("isLogged")) return;
    if (this.state.video === undefined || this.state.video === null) return;
    const { t } = this.props;
    if (this.state.tempComment.length < 10) {
      alert(t("errors.commentTooSmall"));
      return;
    }
    if (this.state.tempComment.length > 500) {
      alert(t("errors.commentTooBig"));
      return;
    }
    var escapedComment = this.state.tempComment
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const response = await api.sendComment(
      this.state.video.id,
      this.state.tempComment
    );
    if (response.data.success) {
      var commentsArray = this.state.comments;
      commentsArray.unshift({
        id: response.data.id,
        msg: escapedComment,
        likes: 0,
        dislikes: 0,
        accountUsername: this.props.profile.get("username"),
        accountPicture: this.props.profile.get("picture"),
        isLiked: null,
      });
      this.setState({
        comments: commentsArray,
        tempComment: "",
      });
    } else {
      alert(t(response.data.message));
    }
  }

  async componentDidMount() {
    if (this.state.video === undefined || this.state.video === null) return;
    let response = await api.getComments(this.state.video.id);
    if (response.data.success) {
      var commentsArray = this.state.comments;
      response.data.comments.forEach((comment: any) => {
        commentsArray.push(comment);
      });
      this.setState({
        comments: commentsArray,
      });
    } else {
      console.error("Failed to get comments!");
      console.error(response.data);
    }
  }

  render() {
    const { t, auth, profile } = this.props;
    return (
      <div className={styles.commentsContainer}>
        <div className={styles.postComment}>
          {auth.get("isLogged") ? (
            <div className={`${styles.media} media`}>
              <img
                src={`http://s3.tryhosting.com.br/pp/${profile.get(
                  "picture"
                )}.webp`}
                alt="profile pic"
              />
              <div className={`${styles.authComment} media-body`}>
                <TextareaAutosize
                  className="form-control"
                  placeholder={t("pages.watch.commentPlaceHolder")}
                  rows={1}
                  onChange={(e: any) => {
                    if (e.target.value.length > 500) {
                      e.target.value = e.target.value.substring(0, 500);
                    }
                    this.setState({ tempComment: e.target.value });
                  }}
                  value={this.state.tempComment}
                />
                <small>
                  Voce tem {500 - this.state.tempComment.length} caracteres
                  restantes.
                </small>
                <button
                  className={`${styles.sendBtn} btn btn-primary btn-sm`}
                  disabled={this.state.tempComment.length < 10}
                  onClick={this.sendComment}
                >
                  {t("pages.watch.send")}
                </button>
              </div>
            </div>
          ) : (
            <h5 className={styles.notAuthenticated}>
              {t("pages.watch.needLogin.youNeed")}{" "}
              <a role="button" data-toggle="modal" data-target="#loginModal">
                {t("pages.watch.needLogin.toLogin")}
              </a>{" "}
              {t("pages.watch.needLogin.toSend")}
            </h5>
          )}
        </div>
        <ul className="list-unstyled">
          {this.state.comments.map((comment) => (
            <li className={`${styles.media} media`} key={comment.id}>
              <img
                src={`http://public.tryhosting.com.br/pp/${comment.accountPicture}.webp`}
                alt="..."
              />
              <div
                className={`media-body ${styles.comment}`}
                dangerouslySetInnerHTML={{
                  __html: `<a className="mt-0 mb-1">${comment.accountUsername}</a>
                  ${comment.msg}`,
                }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(Description));
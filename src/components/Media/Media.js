import React, { useContext, useEffect, useState, useRef } from "react";
import { useWhatsapplogger } from "../../hooks/api-hooks";
import { UserContext } from "../../store/context/userContext";
import DialogModal from "../Modal";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";
import Fade from "@material-ui/core/Fade";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {Link} from 'prismic-reactjs';
import {
  PRISMIC_MEDIALIB_DOC
} from "../../utils/constants";

const Media = props => {
  // All you need for loggin
  // Whatsapp Logger
  const [log, setLogs] = useWhatsapplogger({});

  const iframeRef = useRef(null);
  const { cmsContents, setModal } = useContext(UserContext);
  useEffect(() => {
    if (cmsContents  && cmsContents.data  && cmsContents.data.hasOwnProperty(PRISMIC_MEDIALIB_DOC)) {
      console.log(cmsContents.data[PRISMIC_MEDIALIB_DOC].edges[0].node.mediaTitle);
    }
  }, [cmsContents])
  useEffect(() => {
    setLogs({
      action: "MEDIA",
      message: `just launched media modal for watching video`
    });
  }, []);
  // load  skeleton and hide iframe
  const [iframeloading, setIframeloading] = useState(true);
  const [iframestyles, setIframestyles] = useState({
    visibility: "hidden",
    position: "absolute"
  });

  const initialState = {
    description: "",
    title: (
      <div style={{ minHeight: "48px" }}>
        <Skeleton width="100%" />
      </div>
    ),
    primaryButton: <ThumbUpIcon />,
    secondaryButton: <ThumbDownIcon />,
    error: false,
    loading: false
  };
  const [modalConfig, setModalConfig] = useState(initialState);
  useEffect(() => {
    if (!iframeloading) {
      setIframestyles({ visibility: "visible", position: "static" });
      setModalConfig({
        ...modalConfig,
        title: "Staying Positive After Hardships"
      });
    }
  }, [iframeloading, modalConfig]);
  
  // useEffect(() => {
  //   if (methods.hasOwnProperty("error")) {
  //     setModalConfig({
  //       ...modalConfig,
  //       description:
  //         "We are experiencing some issues. Please try after sometime.",
  //       secondaryButton: "Ok",
  //       primaryButton: "",
  //       error: true
  //     });
  //   }
  // }, [methods]);

  const handlePrimary = () => {
    setModalConfig({ ...modalConfig, loading: true });

      setLogs(() => {
        setModal({ show: false, name: "" });
        return {
          action: "Likes",
          message: `just liked the media content`
        };
      });
      
  };

  const handleSecondary = () => {
    setLogs({
        action: "Sucks",
        message: `just Disliked the media content`
      });
  };
  return (
    <DialogModal
      {...props}
      error={modalConfig.error}
      title={modalConfig.title}
      description={modalConfig.description}
      primaryButton={
        modalConfig.primaryButton ? modalConfig.primaryButton : null
      }
      handlePrimaryAction={() => handlePrimary()}
      secondaryButton={modalConfig.secondaryButton}
      handleSecondaryAction={() => handleSecondary()}
      loading={modalConfig.loading}
      fullWidth={true}
    >
      <div style={{ minHeight: "155px" }}>
        {iframeloading ? (
          <div>
            <Skeleton variant="rect" width={"100%"} height={145} />
            {/* <Skeleton width="60%" /> */}
          </div>
        ) : null}
        <Fade in={true} style={{ transitionDelay: "1200ms" }}>
          <CardMedia
            component="iframe"
            title="Staying Positive After Hardships"
            src="https://www.youtube.com/embed/RgGh2hlHbc4?enablejsapi=1&origin=https://www.padachone.com"
            ref={iframeRef}
            onLoad={() => setIframeloading(false)}
            onError={() => console.log("ERROR")}
            style={iframestyles}
            allowFullScreen
          />
        </Fade>
      </div>
    </DialogModal>
  );
};

export default Media;

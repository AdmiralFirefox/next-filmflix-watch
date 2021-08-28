import React, { FC, useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import editProfileModalStyles from "../../../styles/Home.module.scss";
import EditProfileModalInput from "../../Inputs/Modal/EditProfileModalInput";
import SubmitEditProfileButton from "../../Buttons/Modal/SubmitEditProfileButton";
import CancelEditProfileButton from "../../Buttons/Modal/CancelEditProfileButton";

// Material UI Snackbar Import
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface EditModalProps {
  editProfileModal: boolean;
  handleCloseEditProfileModal: () => void;
  setProfileTextEdit: React.Dispatch<React.SetStateAction<string>>;
  profile: { name: string; id: number };
  SubmitProfileEdit: (id: number) => void;
  profileTextEdit: string;
  setProfileEdit: React.Dispatch<React.SetStateAction<number | boolean>>;
  profiles: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
}

const EditProfileModal: FC<EditModalProps> = ({
  editProfileModal,
  handleCloseEditProfileModal,
  setProfileTextEdit,
  profile,
  SubmitProfileEdit,
  profileTextEdit,
  setProfileEdit,
  profiles,
}) => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpenAlertError = () => {
    setOpenAlertError(true);
  };

  const handleCloseAlertError = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertError(false);
  };

  useEffect(() => {
    if (profileTextEdit.length >= 15) {
      handleOpenAlertError();
      setAlertMessage("Word limit is 15 characters.");
      setProfileTextEdit("");
    }
    if (profiles.map((profile) => profile.name).includes(profileTextEdit)) {
      handleOpenAlertError();
      setAlertMessage("Name already exist. Please enter a different name.");
      setProfileTextEdit("");
    }
  }, [profileTextEdit, profiles, setProfileTextEdit]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openAlertError}
        autoHideDuration={5000}
        onClose={handleCloseAlertError}
        message={alertMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseAlertError}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Modal
        open={editProfileModal}
        onClose={handleCloseEditProfileModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={
            editProfileModalStyles["edit-profile-modal-wrapper-animation"]
          }
        >
          <div className={editProfileModalStyles["edit-profile-modal-wrapper"]}>
            <div
              className={editProfileModalStyles["edit-profile-modal-content"]}
            >
              <div
                className={editProfileModalStyles["edit-profile-modal-title"]}
              >
                <h1>Who&apos;s Watching?</h1>
              </div>
              <div>
                <EditProfileModalInput
                  setProfileTextEdit={setProfileTextEdit}
                  profile={profile}
                />
              </div>
              <div
                className={
                  editProfileModalStyles["edit-profile-modal-button-wrapper"]
                }
              >
                <SubmitEditProfileButton
                  SubmitProfileEdit={SubmitProfileEdit}
                  profile={profile}
                  profileTextEdit={profileTextEdit}
                />
                <CancelEditProfileButton
                  setProfileEdit={setProfileEdit}
                  setProfileTextEdit={setProfileTextEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModal;

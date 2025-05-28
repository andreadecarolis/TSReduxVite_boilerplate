import { useDispatch } from "react-redux";
import { ModalInfo } from "@/types/common.types";
import { closeModal, openModal } from "@/store/app/appSlice";

export const useModal = () => {
  const dispatch = useDispatch();

  /* #region handlers */
  const showModal = (info: ModalInfo) => {
    dispatch(openModal(info));
  };

  const hideModal = () => {
    dispatch(closeModal());
  };
  /* #endregion */

  return { showModal, hideModal };
};

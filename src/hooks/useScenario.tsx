import { useDispatch } from "react-redux";
import { useModal } from "./useModal";
import { AddScenarioPayloadSchema, Scenario } from "@/store/scenario/types/scenario.types";
import { addScenarioRequest, deleteScenarioRequest } from "@/store/scenario/scenarioSlice";

export const useScenario = () => {
  const dispatch = useDispatch();

  const { showModal } = useModal();

  const handleDelete = (scenario: Scenario, modal: boolean = true) => {
    if (modal) {
      showModal({
        title: "Delete scenario",
        content: `Are you sure you want to delete scenario ${scenario.label}?`,
        onConfirm: () => {
          dispatch(deleteScenarioRequest({ id: scenario.id }));
        },
      });
    } else {
      dispatch(deleteScenarioRequest({ id: scenario.id }));
    }
  };

  const handleDuplicate = (scenario: Scenario) => {
    showModal({
      title: "Duplicate scenario",
      content: `Are you sure you want to duplicate scenario ${scenario.label}?`,
      onConfirm: () => {
        const payload = AddScenarioPayloadSchema.safeParse(scenario);
        if (payload.success) {
          dispatch(addScenarioRequest({ ...payload.data, label: `${payload.data.label} - copy` }));
        }
      },
    });
  };

  return { handleDelete, handleDuplicate };
};

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Card, Grid } from "@mui/material";

import CustomModal from "components/mui/CustomModal";
import CustomBox from "components/mui/CustomBox";

import DefaultFormik from "components/forms/DefaultFormik";
import FormField from "components/forms/FormField";

interface OnSubmitProps {
  observations: string;
}

interface ObservationsModalProps {
  open: boolean;
  observations: string;
  onClose: (
    reason: string,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmit: ({ observations }: OnSubmitProps) => void;
}
const ObservationsModal = ({
  open,
  observations,
  onClose,
  onSubmit
}: ObservationsModalProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    observations
  });

  useEffect(() => {
    setFormData({ observations });
  }, [observations]);

  return (
    <CustomModal
      open={open}
      onClose={(event, reason: string) => {
        onClose?.(reason, event);
      }}>
      <DefaultFormik
        initialValues={formData}
        onSubmit={onSubmit}
        onCancel={() => onClose("", undefined)}
        title={t("common.observations") || ""}>
        <Grid item xs={12}>
          <Card sx={{ overflow: "visible" }}>
            <CustomBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormField
                    type="text"
                    name="observations"
                    multiline
                    minRows={4}
                    label={t("common.observations")}
                  />
                </Grid>
              </Grid>
            </CustomBox>
          </Card>
        </Grid>
      </DefaultFormik>
    </CustomModal>
  );
};

export default ObservationsModal;

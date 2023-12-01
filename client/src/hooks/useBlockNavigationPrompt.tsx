import { useCallback, useContext, useEffect, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDialogContext } from "context/DialogProvider";

const useBlockNavigation = (
  blockConfirmation: () => Promise<boolean>,
  shouldBlock = true
) => {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!shouldBlock) {
      return undefined;
    }

    const { push } = navigator;

    navigator.push = async (...args: Parameters<typeof push>) => {
      const result = await blockConfirmation();

      if (result !== false) {
        push(...args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, blockConfirmation, shouldBlock]);
};

const useBlockNavigationPrompt = () => {
  const { t } = useTranslation();
  const [shouldBlock, setShouldBlock] = useState(false);
  const {
    actions: { showDialog, hideDialog }
  } = useDialogContext();

  const confirm = useCallback(() => {
    if (!shouldBlock) return Promise.resolve(true);

    return new Promise<boolean>(resolve => {
      showDialog({
        open: true,
        title: t("common.thereAreUnsavedChanges"),
        message: t("common.byLeavingThePageYouWillLoseTheChanges"),
        confirmLabel: t("common.confirm") || "",
        cancelLabel: t("common.cancel") || "",
        onConfirm: () => {
          hideDialog();
          resolve(true);
        },
        onCancel: () => {
          hideDialog();
          resolve(false);
        }
      });
    });
  }, [t, showDialog, hideDialog, shouldBlock]);

  useEffect(() => {
    if (shouldBlock) {
      window.onbeforeunload = () => {
        return shouldBlock;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [shouldBlock]);

  useBlockNavigation(confirm, shouldBlock);

  return { setShouldBlock };
};

export default useBlockNavigationPrompt;

import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { $ot } from "~/i18n/$ot";
import { an_unexpected_error_occurred } from "~/plugins/i18n";
import { api } from "~~/service/api";

export function useAxiosError(error: AxiosError | unknown, caseOk: () => void) {
  const err = (error as AxiosError)?.response?.data;

  Swal.fire({
    title: $ot(
      an_unexpected_error_occurred,
      String(api.defaults.params.lang) || "en"
    ),
    text: (err as { message: string }).message,
    icon: "error",
    showCancelButton: true,
  }).then((res) => {
    if (res.dismiss) {
      caseOk();
    }

    if (res.isConfirmed) {
      caseOk();
    }

    if (res.isDismissed) {
      caseOk();
    }

    if (res.isDenied) {
      caseOk();
    }
  });
}

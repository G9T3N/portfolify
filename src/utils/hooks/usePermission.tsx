import { useQuery } from "@tanstack/react-query"; // Ensure this is imported
import { permissionsQueryOptions } from "../queries"; // Fixed typo 'querise'

export type PermissionType =
  | { reason: string; status: "disabled" }
  | { status: "enabled" }
  | { status: "hidden" };

export function useCheckPermissions(targetPage: string, targetPermission: string): PermissionType {
  const { data, error, isLoading } = useQuery(permissionsQueryOptions());
  const clientName = "ydis-dashboard";

  // While loading or on error, hiding is safe, but consider if 'disabled'
  // with a "Loading permissions..." reason yields a better UX so layout doesn't shift.
  if (isLoading || error) {
    return { status: "hidden" };
  }

  const permObj =
    data?.data?.data?.clients?.[clientName]?.pages?.[targetPage]?.permissions?.[targetPermission];

  const hasPermission = permObj?.value === true;
  const disabledReason = permObj?.disabledReason;

  if (!hasPermission) {
    return disabledReason ? { reason: disabledReason, status: "disabled" } : { status: "hidden" };
  }

  return { status: "enabled" };
}

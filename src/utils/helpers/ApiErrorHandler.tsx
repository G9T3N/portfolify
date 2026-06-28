import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import * as Sentry from "@sentry/react-router";
import { isValidElement, useEffect } from "react";
import type { NavigateFunction } from "react-router";

import Empty from "@/assets/icons/empty.webp";
import ErrorIcon from "@/assets/icons/error.webp";

// Unified Shared Types
type ErrorActionProps = {
  title?: string;
  message?: string;
  action?: () => void;
  actionText?: string;
};

const SentryReporter = ({
  children,
  message,
}: {
  children: React.ReactElement;
  message: string;
}) => {
  useEffect(() => {
    Sentry.captureException(new Error(message));
    Sentry.captureMessage(message);
  }, [message]);
  return children;
};

// Reusable Layout Wrapper to avoid duplicating layout strings/dialogs across 404, 403, 500, etc.
const ErrorLayout = ({
  isPage,
  navigate,
  route,
  image,
  alt,
  title,
  subtitle,
  onAction,
  actionText,
}: {
  isPage: boolean;
  navigate?: NavigateFunction;
  route?: string;
  image: string;
  alt: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
}) => {
  const content = (
    <div
      className={`flex flex-col items-center justify-center w-full ${isPage ? "h-full" : "h-70vh overflow-hidden"}`}
    >
      <img className="object-contain" src={image} alt={alt} />
      <h2 className="text-primaryText font-title m-0 mb-1 text-center">{title}</h2>
      <p className="font-subtitle text-secondary-color m-0 text-center">{subtitle}</p>
    </div>
  );

  if (isPage) {
    const handleConfirm = onAction || (() => navigate?.(route ?? ""));
    return (
      <DIDialog
        dialogVisible
        header={t`Error`}
        onHide={() => navigate?.(route ?? "")}
        onPrimaryButtonClick={handleConfirm}
        primaryButtonText={actionText || t`Continue`}
      >
        {content}
      </DIDialog>
    );
  }

  return content;
};

export function BadRequest(navigate: NavigateFunction, route?: string): React.ReactElement {
  return (
    <SentryReporter message="Bad Request (400)">
      <ErrorLayout
        isPage={true}
        navigate={navigate}
        route={route}
        image={ErrorIcon}
        alt="error request"
        title={<Trans>An error occurred while Sending the Request</Trans>}
        subtitle={<Trans>We were unable to load the data. Please try again later</Trans>}
      />
    </SentryReporter>
  );
}

export function NotAllowed(
  navigate: NavigateFunction,
  route: string | undefined,
  isPage: boolean,
): React.ReactElement {
  return (
    <ErrorLayout
      isPage={isPage}
      navigate={navigate}
      route={route}
      image={Empty}
      alt="no data"
      title={<Trans>Access Denied!</Trans>}
      subtitle={
        isPage ? (
          <Trans>You Are Not Allowed To Access This Page!</Trans>
        ) : (
          <Trans>You Are Not Allowed To Access This Content!</Trans>
        )
      }
    />
  );
}

export function NotFound(
  navigate: NavigateFunction,
  route: string | undefined,
  isPage: boolean,
): React.ReactElement {
  return (
    <SentryReporter message="Not Found (404)">
      <ErrorLayout
        isPage={isPage}
        navigate={navigate}
        route={route}
        image={Empty}
        alt="no data"
        title={<Trans>The page is not found</Trans>}
        subtitle={<Trans>Wrong Page Path or URL or Data is Not Found</Trans>}
      />
    </SentryReporter>
  );
}

export function SuccessEmpty(
  hasData: boolean,
  children: React.ReactNode,
  isPage: boolean,
  navigate: NavigateFunction,
  route?: string,
): React.ReactElement {
  if (hasData) {
    return isValidElement(children) ? children : <></>;
  }
  return (
    <ErrorLayout
      isPage={isPage}
      navigate={navigate}
      route={route}
      image={Empty}
      alt="no data"
      title={
        isPage ? (
          <Trans>The page is not found</Trans>
        ) : (
          <Trans>There is no data to display at the moment</Trans>
        )
      }
      subtitle={
        isPage ? (
          <Trans>Wrong Page Path or URL or Data is Not Found</Trans>
        ) : (
          <Trans>data will be displayed when available</Trans>
        )
      }
    />
  );
}

export function ServerErrors(
  navigate: NavigateFunction,
  route: string | undefined,
  isPage: boolean | undefined,
  error?: ErrorActionProps,
): React.ReactElement {
  const errorTitle = error?.title ?? t`An unexpected error occurred`;
  const errorMessage = error?.message ?? t`We were unable to load the data. Please try again later`;

  return (
    <SentryReporter message={errorMessage}>
      <ErrorLayout
        isPage={!!isPage}
        navigate={navigate}
        route={route}
        image={ErrorIcon}
        alt="error request"
        title={errorTitle}
        subtitle={errorMessage}
        onAction={error?.action}
        actionText={error?.actionText}
      />
    </SentryReporter>
  );
}

export function UnAuthorized() {
  Sentry.captureMessage("Unauthorized (401)");
  logout();
  return null;
}
